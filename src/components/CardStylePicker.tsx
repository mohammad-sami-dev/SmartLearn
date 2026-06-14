import { useThemeCustomization, CardStyle } from "@/contexts/ThemeCustomizationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

export const CardStylePicker = () => {
  const { cardStyle, setCardStyle } = useThemeCustomization();
  const options: { id: CardStyle; name: string; desc: string; className: string }[] = [
    { id: "elevated", name: "Elevated", desc: "Subtle shadow and border", className: "shadow-sm hover:shadow-md border" },
    { id: "outlined", name: "Outlined", desc: "Clear border, no shadow", className: "border border-accent/30" },
    { id: "minimal", name: "Minimal", desc: "No border or shadow", className: "border-0 bg-transparent" },
  ];

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-medium">Card Style</h3>
        <p className="text-xs text-muted-foreground">Choose how dashboard cards should look</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {options.map(opt => {
          const active = cardStyle === opt.id;
          return (
            <Card key={opt.id} className={cn("cursor-pointer transition-all", active ? "ring-2 ring-primary" : "", opt.className)} onClick={() => setCardStyle(opt.id)}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{opt.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground mb-3">{opt.desc}</div>
                <div className="rounded-md p-3 bg-accent/10">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Preview Title</div>
                      <div className="text-lg font-bold">42</div>
                      <div className="text-[11px] text-muted-foreground">+12% this week</div>
                    </div>
                    <div className="rounded-md p-2 bg-primary/10 text-primary">
                      <BarChart3 className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-muted-foreground">Primary</span>
                    <span className="h-3 w-3 rounded-sm border" style={{ backgroundColor: "hsl(var(--primary))" }} />
                    <span className="h-3 w-3 rounded-sm border" style={{ backgroundColor: "hsl(var(--primary-foreground))" }} />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-muted-foreground">Accent</span>
                    <span className="h-3 w-3 rounded-sm border" style={{ backgroundColor: "hsl(var(--accent))" }} />
                    <span className="h-3 w-3 rounded-sm border" style={{ backgroundColor: "hsl(var(--accent-foreground))" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="flex gap-2">
        {options.map(opt => (
          <Button key={opt.id} variant={cardStyle === opt.id ? "default" : "outline"} size="sm" onClick={() => setCardStyle(opt.id)}>
            {opt.name}
          </Button>
        ))}
      </div>
    </div>
  );
};