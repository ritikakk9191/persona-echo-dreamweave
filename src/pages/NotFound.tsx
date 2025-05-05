
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Moon } from "lucide-react";

const NotFound = () => {
  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-8xl font-bold text-muted-foreground">404</h1>
        <h2 className="mb-6 text-2xl font-semibold">Page Not Found</h2>
        <p className="mb-8 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link to="/">
            <Button>
              Return Home
            </Button>
          </Link>
          <Link to="/persona-forge">
            <Button variant="outline" className="flex items-center">
              <Brain className="mr-2 h-4 w-4 text-primary" />
              PersonaForge
            </Button>
          </Link>
          <Link to="/dream-chain">
            <Button variant="outline" className="flex items-center">
              <Moon className="mr-2 h-4 w-4 text-secondary" />
              DreamChain
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
