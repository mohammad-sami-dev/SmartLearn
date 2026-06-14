import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ColorTheme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    primaryForeground: string;
    accent: string;
    accentForeground: string;
  };
}

export const colorThemes: ColorTheme[] = [
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    description: "Professional and trustworthy",
    colors: {
      primary: "217 91% 60%",
      primaryForeground: "0 0% 100%",
      accent: "217 91% 60%",
      accentForeground: "0 0% 100%",
    },
  },
  {
    id: "forest-green",
    name: "Forest Green",
    description: "Calm and nature-inspired",
    colors: {
      primary: "142 76% 36%",
      primaryForeground: "0 0% 100%",
      accent: "142 76% 36%",
      accentForeground: "0 0% 100%",
    },
  },
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    description: "Energetic and warm",
    colors: {
      primary: "24 95% 53%",
      primaryForeground: "0 0% 100%",
      accent: "24 95% 53%",
      accentForeground: "0 0% 100%",
    },
  },
  {
    id: "royal-purple",
    name: "Royal Purple",
    description: "Creative and bold",
    colors: {
      primary: "271 91% 65%",
      primaryForeground: "0 0% 100%",
      accent: "271 91% 65%",
      accentForeground: "0 0% 100%",
    },
  },
  {
    id: "cherry-red",
    name: "Cherry Red",
    description: "Passionate and energetic",
    colors: {
      primary: "0 84% 60%",
      primaryForeground: "0 0% 100%",
      accent: "0 84% 60%",
      accentForeground: "0 0% 100%",
    },
  },
  {
    id: "sakura-pink",
    name: "Sakura Pink",
    description: "Soft and friendly",
    colors: {
      primary: "330 81% 60%",
      primaryForeground: "0 0% 100%",
      accent: "330 81% 60%",
      accentForeground: "0 0% 100%",
    },
  },
  {
    id: "cyber-teal",
    name: "Cyber Teal",
    description: "Modern tech vibes",
    colors: {
      primary: "189 94% 43%",
      primaryForeground: "0 0% 100%",
      accent: "189 94% 43%",
      accentForeground: "0 0% 100%",
    },
  },
  {
    id: "amber-gold",
    name: "Amber Gold",
    description: "Warm and inviting",
    colors: {
      primary: "45 93% 47%",
      primaryForeground: "0 0% 100%",
      accent: "45 93% 47%",
      accentForeground: "0 0% 100%",
    },
  },
];

export type DashboardLayout = "compact" | "comfortable" | "spacious";
export type CardStyle = "elevated" | "outlined" | "minimal";

interface ThemeCustomizationContextType {
  currentTheme: ColorTheme;
  setTheme: (themeId: string) => void;
  resetTheme: () => void;
  dashboardLayout: DashboardLayout;
  setDashboardLayout: (layout: DashboardLayout) => void;
  cardStyle: CardStyle;
  setCardStyle: (style: CardStyle) => void;
}

const ThemeCustomizationContext = createContext<ThemeCustomizationContextType | undefined>(
  undefined
);

export const useThemeCustomization = () => {
  const context = useContext(ThemeCustomizationContext);
  if (!context) {
    throw new Error(
      "useThemeCustomization must be used within ThemeCustomizationProvider"
    );
  }
  return context;
};

interface ThemeCustomizationProviderProps {
  children: ReactNode;
}

export const ThemeCustomizationProvider = ({
  children,
}: ThemeCustomizationProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(() => {
    const savedThemeId = localStorage.getItem("smartlearn-theme");
    return (
      colorThemes.find((theme) => theme.id === savedThemeId) || colorThemes[0]
    );
  });

  const [dashboardLayout, setDashboardLayoutState] = useState<DashboardLayout>(() => {
    const savedLayout = localStorage.getItem("smartlearn-layout");
    return (savedLayout as DashboardLayout) || "comfortable";
  });

  const [cardStyle, setCardStyleState] = useState<CardStyle>(() => {
    const saved = localStorage.getItem("smartlearn-card-style");
    return (saved as CardStyle) || "elevated";
  });

  useEffect(() => {
    // Apply theme colors to CSS variables
    const root = document.documentElement;
    root.style.setProperty("--primary", currentTheme.colors.primary);
    root.style.setProperty(
      "--primary-foreground",
      currentTheme.colors.primaryForeground
    );
    root.style.setProperty("--accent", currentTheme.colors.accent);
    root.style.setProperty(
      "--accent-foreground",
      currentTheme.colors.accentForeground
    );

    // Save to localStorage
    localStorage.setItem("smartlearn-theme", currentTheme.id);
  }, [currentTheme]);

  const setTheme = (themeId: string) => {
    const theme = colorThemes.find((t) => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  const resetTheme = () => {
    setCurrentTheme(colorThemes[0]);
    localStorage.removeItem("smartlearn-theme");
  };

  const setDashboardLayout = (layout: DashboardLayout) => {
    setDashboardLayoutState(layout);
    localStorage.setItem("smartlearn-layout", layout);
  };

  const setCardStyle = (style: CardStyle) => {
    setCardStyleState(style);
    localStorage.setItem("smartlearn-card-style", style);
  };

  return (
    <ThemeCustomizationContext.Provider
      value={{ 
        currentTheme, 
        setTheme, 
        resetTheme,
        dashboardLayout,
        setDashboardLayout,
        cardStyle,
        setCardStyle
      }}
    >
      {children}
    </ThemeCustomizationContext.Provider>
  );
};
