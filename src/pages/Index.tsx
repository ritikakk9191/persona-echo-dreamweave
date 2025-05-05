
import { ArrowRight, Brain, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight lg:text-6xl">
          <span className="persona-gradient-text">Persona</span>
          <span>Forge</span> + 
          <span className="dream-gradient-text"> Dream</span>
          <span>Chain</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Create your digital twin based on your real data and explore your subconscious through AI-powered dream analysis
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Link to="/persona-forge">
            <Button size="lg" className="bg-persona-gradient">
              Create Your Digital Twin
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/dream-chain">
            <Button size="lg" className="bg-dream-gradient">
              Analyze Your Dreams
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      
      <div className="grid gap-8 md:grid-cols-2">
        <section className="persona-card bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="mb-6 flex items-center">
            <Brain className="mr-3 h-8 w-8 text-persona" />
            <h2 className="text-2xl font-bold">PersonaForge</h2>
          </div>
          <p className="mb-4 text-muted-foreground">
            Upload your data to create a digital twin that behaves like you and simulates responses as you would.
          </p>
          <ul className="mb-6 list-inside space-y-2">
            <li className="flex items-center">
              <span className="mr-2 text-persona">•</span>
              Upload emails, chats, and writing samples
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-persona">•</span>
              Train your digital twin with your real data
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-persona">•</span>
              Chat interface for natural interactions
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-persona">•</span>
              Optional voice cloning capability
            </li>
          </ul>
          <Link to="/persona-forge">
            <Button>
              Start Building
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </section>
        
        <section className="persona-card bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
          <div className="mb-6 flex items-center">
            <Moon className="mr-3 h-8 w-8 text-dream" />
            <h2 className="text-2xl font-bold">DreamChain</h2>
          </div>
          <p className="mb-4 text-muted-foreground">
            Record and analyze your dreams to uncover subconscious patterns, symbols, and emotions.
          </p>
          <ul className="mb-6 list-inside space-y-2">
            <li className="flex items-center">
              <span className="mr-2 text-dream">•</span>
              Write or record your dreams
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-dream">•</span>
              AI-powered dream symbol analysis
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-dream">•</span>
              Track recurring patterns and themes
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-dream">•</span>
              Optional dream-to-image visualization
            </li>
          </ul>
          <Link to="/dream-chain">
            <Button>
              Start Journaling
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Index;
