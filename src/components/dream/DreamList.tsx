
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Dream {
  id: string;
  date: string;
  title: string;
  content: string;
  symbols: string[];
  emotions: string[];
  analysis: string;
}

interface DreamListProps {
  dreams: Dream[];
  selectedDream: Dream | null;
  setSelectedDream: (dream: Dream) => void;
}

const DreamList: React.FC<DreamListProps> = ({ dreams, selectedDream, setSelectedDream }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  
  const filteredDreams = searchQuery
    ? dreams.filter(
        (dream) =>
          dream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dream.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dream.symbols.some((symbol) =>
            symbol.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : dreams;
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search dreams by title, content, or symbols..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <ScrollArea className="h-[400px] rounded-md border">
        {filteredDreams.length > 0 ? (
          <div className="p-4">
            {filteredDreams.map((dream) => (
              <Card
                key={dream.id}
                className={`mb-3 cursor-pointer p-4 transition-colors hover:bg-muted/50 ${
                  selectedDream?.id === dream.id ? "border-secondary" : ""
                }`}
                onClick={() => setSelectedDream(dream)}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{dream.title}</h3>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {formatDate(dream.date)}
                  </div>
                </div>
                <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
                  {dream.content}
                </p>
                <div className="flex flex-wrap gap-1">
                  {dream.symbols.slice(0, 3).map((symbol, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-secondary/20 px-2 py-0.5 text-xs text-secondary-foreground"
                    >
                      {symbol}
                    </span>
                  ))}
                  {dream.symbols.length > 3 && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      +{dream.symbols.length - 3}
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <p className="mb-2 text-lg font-medium">No dreams found</p>
            <p className="mb-4 text-sm text-muted-foreground">
              {searchQuery
                ? "Try a different search term"
                : "Record your first dream to get started"}
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default DreamList;
