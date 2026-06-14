import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

type UserRole = "student" | "teacher" | "admin";

interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
  department?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
       
       if (session?.user) {
         await ensureProfile(session.user);
         await fetchProfile(session.user.id);
       }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await ensureProfile(session.user);
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setProfile(data as Profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const ensureProfile = async (
    authUser: User,
    defaults?: { role?: UserRole; full_name?: string; avatar_url?: string; department?: string; bio?: string }
  ): Promise<Profile> => {
    const derivedName =
      defaults?.full_name ||
      (authUser.user_metadata?.full_name as string | undefined) ||
      (authUser.user_metadata?.name as string | undefined) ||
      (authUser.email ? authUser.email.split("@")[0] : "User");

    const derivedRole = (defaults?.role || (authUser.user_metadata?.role as UserRole | undefined) || "student") as UserRole;
    const derivedAvatar = (defaults?.avatar_url || (authUser.user_metadata?.avatar_url as string | undefined)) ?? null;

    const upsertPayload = {
      id: authUser.id,
      full_name: derivedName,
      role: derivedRole,
      avatar_url: derivedAvatar,
    } as const;

    const { data, error } = await supabase
      .from("profiles")
      .upsert(upsertPayload, { onConflict: "id" })
      .select("*")
      .single();

    if (error) throw error;
    setProfile(data as Profile);
    return data as Profile;
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const ensured = await ensureProfile(data.user);
      await fetchProfile(data.user.id);

      setTimeout(() => {
        switch (ensured.role) {
          case "admin":
            navigate("/admin");
            break;
          case "teacher":
            navigate("/teacher");
            break;
          default:
            navigate("/dashboard");
        }
      }, 500);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (error) throw error;

    if (data.user) {
      await ensureProfile(data.user, { role, full_name: fullName });
      await fetchProfile(data.user.id);

      setTimeout(() => {
        switch (role) {
          case "admin":
            navigate("/admin");
            break;
          case "teacher":
            navigate("/teacher");
            break;
          default:
            navigate("/dashboard");
        }
      }, 500);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    setUser(null);
    setProfile(null);
    navigate("/login");
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error("No user logged in");

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);

    if (error) throw error;

    await fetchProfile(user.id);
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
