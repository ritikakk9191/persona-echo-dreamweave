
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Brain, Calendar, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Dream {
  id: string;
  date: string;
  title: string;
  content: string;
  symbols: string[];
  emotions: string[];
  analysis: string;
}

interface DreamAnalysisProps {
  dream: Dream;
}

const DreamAnalysis: React.FC<DreamAnalysisProps> = ({ dream }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{dream.title}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              {formatDate(dream.date)}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line text-muted-foreground">
            {dream.content}
          </p>
        </CardContent>
      </Card>
      
      <Card className="border bg-secondary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-secondary" />
            <CardTitle>Dream Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-6">{dream.analysis}</p>
          
          <div className="mb-6">
            <h3 className="mb-2 flex items-center font-medium">
              <Brain className="mr-2 h-4 w-4 text-secondary" />
              Symbols Detected
            </h3>
            <div className="flex flex-wrap gap-2">
              {dream.symbols.map((symbol, index) => (
                <Badge key={index} variant="secondary">
                  {symbol}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="mb-2 flex items-center font-medium">
              <MessageSquare className="mr-2 h-4 w-4 text-secondary" />
              Emotions Present
            </h3>
            <div className="flex flex-wrap gap-2">
              {dream.emotions.map((emotion, index) => (
                <Badge key={index} variant="outline" className="bg-secondary/10">
                  {emotion}
                </Badge>
              ))}
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="rounded-lg bg-secondary/10 p-4">
            <h3 className="mb-2 font-medium">Jungian Interpretation</h3>
            <p className="text-sm">
              {dream.title.includes("Flying")
                ? "Flying dreams often represent a sense of freedom, transcending limitations, or rising above challenges in your waking life."
                : dream.title.includes("Maze")
                ? "Maze dreams typically symbolize confusion, complex decisions, or feeling trapped in a situation without a clear path forward."
                : "The symbols in this dream suggest unconscious processing of recent events or emotions. Consider how these elements relate to your current life circumstances."}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        <Button className="bg-dream-gradient">
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Deeper Analysis
        </Button>
      </div>
    </div>
  );
};

export default DreamAnalysis;
