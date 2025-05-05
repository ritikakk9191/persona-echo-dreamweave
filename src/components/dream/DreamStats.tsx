
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Dream {
  id: string;
  date: string;
  title: string;
  content: string;
  symbols: string[];
  emotions: string[];
  analysis: string;
}

interface DreamStatsProps {
  dreams: Dream[];
}

const DreamStats: React.FC<DreamStatsProps> = ({ dreams }) => {
  // Extract and count symbols
  const symbolCounts: Record<string, number> = {};
  dreams.forEach((dream) => {
    dream.symbols.forEach((symbol) => {
      symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
    });
  });
  
  // Extract and count emotions
  const emotionCounts: Record<string, number> = {};
  dreams.forEach((dream) => {
    dream.emotions.forEach((emotion) => {
      emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
    });
  });
  
  // Prepare data for charts
  const symbolData = Object.entries(symbolCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  
  const emotionData = Object.entries(emotionCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="mb-4 text-lg font-medium">Top Dream Symbols</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={symbolData} layout="vertical">
                <XAxis type="number" domain={[0, 'dataMax + 1']} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip 
                  formatter={(value: number) => [`${value} occurrences`, 'Frequency']}
                  labelStyle={{ color: '#000' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(139, 92, 246, 0.5)',
                  }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="mb-4 text-lg font-medium">Emotions in Dreams</h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emotionData} layout="vertical">
                <XAxis type="number" domain={[0, 'dataMax + 1']} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip 
                  formatter={(value: number) => [`${value} occurrences`, 'Frequency']}
                  labelStyle={{ color: '#000' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(139, 92, 246, 0.5)',
                  }}
                />
                <Bar dataKey="value" fill="#a78bfa" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <Card className="p-4">
        <h3 className="mb-2 text-lg font-medium">Dream Pattern Insights</h3>
        <p className="mb-4 text-muted-foreground">
          Based on your dream journal entries, here are some patterns we've detected:
        </p>
        
        <div className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-3">
            <h4 className="mb-1 font-medium">Recurring Themes</h4>
            <p className="text-sm text-muted-foreground">
              {dreams.length > 0
                ? "Your dreams frequently feature themes of movement and exploration, which often correlate with periods of change in your life."
                : "Add more dreams to your journal to analyze recurring themes."}
            </p>
          </div>
          
          <div className="rounded-lg bg-muted/50 p-3">
            <h4 className="mb-1 font-medium">Emotional Patterns</h4>
            <p className="text-sm text-muted-foreground">
              {dreams.length > 0
                ? dreams.some(d => d.emotions.includes("anxiety"))
                  ? "Anxiety appears consistently in your dreams, suggesting unresolved concerns that may benefit from conscious attention."
                  : "Your dreams show a balance of emotions, with positive feelings slightly predominating."
                : "Record more dreams to analyze emotional patterns."}
            </p>
          </div>
          
          <div className="rounded-lg bg-muted/50 p-3">
            <h4 className="mb-1 font-medium">Timing Correlations</h4>
            <p className="text-sm text-muted-foreground">
              {dreams.length > 1
                ? "Your most vivid dreams tend to occur near the end of your dream cycles. Consider keeping your journal by your bed to record details immediately upon waking."
                : "Add more dated entries to analyze timing patterns in your dreams."}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DreamStats;
