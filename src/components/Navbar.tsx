
import { Link, useLocation } from "react-router-dom";
import { Code2, Moon, Settings, Sun, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (prefersDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">AI-Project</span>
          </Link>
          
          <nav className="hidden space-x-6 md:flex">
            <Link 
              to="/persona-forge"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/persona-forge" 
                  ? "text-primary" 
                  : "text-muted-foreground"
              }`}
            >
              PersonaForge
            </Link>
            <Link 
              to="/dream-chain"
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                location.pathname === "/dream-chain" 
                  ? "text-secondary" 
                  : "text-muted-foreground"
              }`}
            >
              DreamChain
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          
          <Link to="/settings">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Settings"
              className={location.pathname === "/settings" ? "bg-muted" : ""}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
