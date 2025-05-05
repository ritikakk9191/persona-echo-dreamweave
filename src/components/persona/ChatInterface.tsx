
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ chatHistory, setChatHistory }) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);
  
  const handleSendMessage = () => {
    if (message.trim() === "") return;
    
    // Add user message
    setChatHistory([...chatHistory, { role: "user", content: message }]);
    setMessage("");
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "Based on your past conversations, I'd likely respond with a thoughtful question to learn more about this topic.",
        "Looking at your writing style, I'd probably respond with a mix of empathy and analytical insight here.",
        "I notice you typically approach topics like this with curiosity. I'd probably ask follow-up questions to understand the context better.",
        "Based on your data, I'd likely acknowledge your point and then offer a slightly different perspective to consider.",
        "Your communication style shows you value concise responses on technical topics like this, so I'd keep it brief but informative.",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setChatHistory(prev => [...prev, { role: "assistant", content: randomResponse }]);
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <div className="flex h-[600px] flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <Avatar className="mr-2 h-8 w-8 bg-primary">
                <AvatarFallback>DT</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <Avatar className="ml-2 h-8 w-8 bg-muted">
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="mb-4 flex justify-start">
            <Avatar className="mr-2 h-8 w-8 bg-primary">
              <AvatarFallback>DT</AvatarFallback>
            </Avatar>
            <div className="flex max-w-[80%] items-center space-x-2 rounded-lg bg-muted px-4 py-3">
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.2s" }}></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef}></div>
      </div>
      
      <Separator />
      
      <div className="flex items-center space-x-2 p-4">
        <Input
          placeholder="Ask your digital twin something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          className="flex-1"
        />
        <Button onClick={handleSendMessage} disabled={isTyping}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
