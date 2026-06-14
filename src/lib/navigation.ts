import { useAuth } from "@/contexts/AuthContext";

export type UserRole = "student" | "teacher" | "admin";

export const getBasePathForRole = (role: UserRole | null | undefined): string => {
  switch (role) {
    case "admin":
      return "/admin";
    case "teacher":
      return "/teacher";
    default:
      return "/dashboard";
  }
};

// Demo role helper for dev environment only
const getDemoRole = (): UserRole | null => {
  if (!import.meta.env.DEV) return null;
  try {
    const r = localStorage.getItem("demoRole");
    if (r === "student" || r === "teacher" || r === "admin") return r;
    return null;
  } catch {
    return null;
  }
};

export const useBasePath = (): string => {
  const { profile } = useAuth();
  const role: UserRole | null = profile?.role ?? getDemoRole();
  return getBasePathForRole(role ?? "student");
};
