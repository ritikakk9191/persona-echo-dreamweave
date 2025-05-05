
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Book, Image, MessageSquare, Moon, Plus, Sparkles } from "lucide-react";
import DreamEntryForm from "@/components/dream/DreamEntryForm";
import DreamList from "@/components/dream/DreamList";
import DreamAnalysis from "@/components/dream/DreamAnalysis";
import DreamStats from "@/components/dream/DreamStats";

// Mock dream data for demonstration
const initialDreams = [
  {
    id: "1",
    date: "2025-05-04",
    title: "Flying Over Mountains",
    content: "I was flying over beautiful mountains with snow-capped peaks. I felt free and powerful, soaring through clouds and looking down at forests and lakes below.",
    symbols: ["flying", "mountains", "clouds", "freedom"],
    emotions: ["joy", "freedom", "wonder"],
    analysis: "This dream represents a desire for freedom and overcoming obstacles. The mountains symbolize challenges you've been facing, while flying represents your aspiration to rise above them."
  },
  {
    id: "2",
    date: "2025-05-02",
    title: "Lost in a Maze",
    content: "I was trapped in an endless maze with high walls. Every time I thought I found the exit, it led to another section of the maze. I felt increasingly anxious as time passed.",
    symbols: ["maze", "being lost", "walls", "searching"],
    emotions: ["anxiety", "confusion", "frustration"],
    analysis: "This dream suggests you're feeling stuck in a complex situation. The maze represents confusion about a decision or path forward in your life."
  }
];

const DreamChain = () => {
  const [activeTab, setActiveTab] = useState("journal");
  const [dreams, setDreams] = useState(initialDreams);
  const [selectedDream, setSelectedDream] = useState<typeof initialDreams[0] | null>(null);
  
  const addNewDream = (dream: Omit<typeof initialDreams[0], "id">) => {
    const newDream = {
      ...dream,
      id: `dream-${Date.now()}`,
    };
    setDreams([newDream, ...dreams]);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">
          <span className="dream-gradient-text">DreamChain</span>
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Record and analyze your dreams to understand your subconscious
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mx-auto max-w-4xl">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="journal">
            <Book className="mr-2 h-4 w-4" />
            Dream Journal
          </TabsTrigger>
          <TabsTrigger value="new">
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </TabsTrigger>
          <TabsTrigger value="analysis" disabled={!selectedDream}>
            <Sparkles className="mr-2 h-4 w-4" />
            Analysis
          </TabsTrigger>
          <TabsTrigger value="stats">
            <BarChart3 className="mr-2 h-4 w-4" />
            Patterns
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="journal" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Dream Journal</CardTitle>
              <CardDescription>
                Your recorded dreams and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DreamList 
                dreams={dreams} 
                selectedDream={selectedDream} 
                setSelectedDream={(dream) => {
                  setSelectedDream(dream);
                  if (dream) setActiveTab("analysis");
                }} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="new" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>New Dream Entry</CardTitle>
              <CardDescription>
                Record a new dream for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DreamEntryForm 
                onSubmit={(dreamData) => {
                  addNewDream({
                    ...dreamData,
                    date: new Date().toISOString().split("T")[0],
                    symbols: ["analyzing", "processing"],
                    emotions: ["analyzing", "processing"],
                    analysis: "Dream analysis is being processed..."
                  });
                  setActiveTab("journal");
                }} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis" className="mt-4">
          {selectedDream ? (
            <DreamAnalysis dream={selectedDream} />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-12">
                <Moon className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-lg font-medium">Select a dream to see analysis</p>
                <Button onClick={() => setActiveTab("journal")} className="mt-4">
                  Go to Journal
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="stats" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Dream Patterns & Statistics</CardTitle>
              <CardDescription>
                Insights from your dream journal over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DreamStats dreams={dreams} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Want to visualize your dreams?
        </p>
        <Button variant="outline" className="mt-2">
          <Image className="mr-2 h-4 w-4" />
          Generate Dream Image
        </Button>
      </div>
    </div>
  );
};

export default DreamChain;
