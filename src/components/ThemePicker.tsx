import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { colorThemes, useThemeCustomization } from "@/contexts/ThemeCustomizationContext";
import { cn } from "@/lib/utils";

export const ThemePicker = () => {
  const { currentTheme, setTheme, resetTheme } = useThemeCustomization();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Color Theme</h3>
        <p className="text-sm text-muted-foreground">
          Choose a color theme that matches your style and helps you focus better
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {colorThemes.map((theme) => {
          const isActive = currentTheme.id === theme.id;
          const primaryHsl = theme.colors.primary.split(" ");
          const backgroundColor = `hsl(${primaryHsl[0]} ${primaryHsl[1]} ${primaryHsl[2]})`;

          return (
            <Card
              key={theme.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-lg hover:scale-105",
                isActive && "ring-2 ring-primary ring-offset-2"
              )}
              onClick={() => setTheme(theme.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Color Preview */}
                  <div
                    className="h-20 rounded-lg flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor }}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="bg-white rounded-full p-2">
                          <Check className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                    )}
                    {!isActive && (
                      <div className="text-white text-sm font-medium opacity-80">
                        Preview
                      </div>
                    )}
                  </div>

                  {/* Theme Info */}
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{theme.name}</h4>
                      {isActive && (
                        <Badge variant="default" className="text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {theme.description}
                    </p>
                  </div>

                  {/* Color Swatches */}
                  <div className="flex gap-2">
                    <div
                      className="h-6 w-6 rounded-full border-2 border-border"
                      style={{ backgroundColor }}
                      title="Primary"
                    />
                    <div
                      className="h-6 w-6 rounded-full border-2 border-border"
                      style={{ 
                        backgroundColor: `hsl(${theme.colors.accent})` 
                      }}
                      title="Accent"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex items-center gap-4 pt-4 border-t">
        <Button variant="outline" onClick={resetTheme}>
          Reset to Default
        </Button>
        <p className="text-sm text-muted-foreground">
          Currently using: <span className="font-medium">{currentTheme.name}</span>
        </p>
      </div>
    </div>
  );
};
