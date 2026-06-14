import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Maximize2, Square, Minimize2 } from "lucide-react";
import { useThemeCustomization, DashboardLayout } from "@/contexts/ThemeCustomizationContext";
import { cn } from "@/lib/utils";

interface LayoutOption {
  id: DashboardLayout;
  name: string;
  description: string;
  icon: React.ReactNode;
  preview: {
    cardSize: string;
    spacing: string;
    fontSize: string;
  };
}

const layoutOptions: LayoutOption[] = [
  {
    id: "compact",
    name: "Compact",
    description: "Maximum content density, smaller cards and spacing",
    icon: <Minimize2 className="h-5 w-5" />,
    preview: {
      cardSize: "h-16",
      spacing: "gap-2",
      fontSize: "text-xs",
    },
  },
  {
    id: "comfortable",
    name: "Comfortable",
    description: "Balanced layout with moderate spacing (Default)",
    icon: <Square className="h-5 w-5" />,
    preview: {
      cardSize: "h-20",
      spacing: "gap-3",
      fontSize: "text-sm",
    },
  },
  {
    id: "spacious",
    name: "Spacious",
    description: "Generous spacing and larger elements for easy viewing",
    icon: <Maximize2 className="h-5 w-5" />,
    preview: {
      cardSize: "h-24",
      spacing: "gap-4",
      fontSize: "text-base",
    },
  },
];

export const LayoutPicker = () => {
  const { dashboardLayout, setDashboardLayout } = useThemeCustomization();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Dashboard Layout</h3>
        <p className="text-sm text-muted-foreground">
          Choose how much content you want to see on your dashboard
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {layoutOptions.map((layout) => {
          const isActive = dashboardLayout === layout.id;

          return (
            <Card
              key={layout.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-lg hover:scale-105",
                isActive && "ring-2 ring-primary ring-offset-2"
              )}
              onClick={() => setDashboardLayout(layout.id)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {layout.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold flex items-center gap-2">
                          {layout.name}
                          {isActive && (
                            <Check className="h-4 w-4 text-green-600" />
                          )}
                        </h4>
                      </div>
                    </div>
                    {isActive && (
                      <Badge variant="default" className="text-xs">
                        Active
                      </Badge>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground">
                    {layout.description}
                  </p>

                  {/* Visual Preview */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Preview:</p>
                    <div className={cn("space-y-2", layout.preview.spacing)}>
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={cn(
                            "bg-primary/10 rounded flex items-center px-3",
                            layout.preview.cardSize
                          )}
                        >
                          <div className={cn("text-muted-foreground", layout.preview.fontSize)}>
                            Sample Card {i}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex items-center gap-4 pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          Currently using:{" "}
          <span className="font-medium capitalize">{dashboardLayout}</span> layout
        </p>
      </div>
    </div>
  );
};
