import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Sidebar } from "@/components/Layout/Sidebar";
import { TeacherSidebar } from "@/components/Layout/TeacherSidebar";
import { AdminSidebar } from "@/components/Layout/AdminSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Index = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Determine which sidebar to show based on route
  const getSidebar = () => {
    if (location.pathname.startsWith('/teacher')) {
      return <TeacherSidebar />;
    } else if (location.pathname.startsWith('/admin')) {
      return <AdminSidebar />;
    } else {
      return <Sidebar />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {/* Desktop Sidebar */}
        {getSidebar()}
        
        {/* Mobile Menu Button - Fixed at bottom */}
        <div className="fixed bottom-4 right-4 md:hidden z-40">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="pt-6" onClick={() => setMobileMenuOpen(false)}>
                {getSidebar()}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
