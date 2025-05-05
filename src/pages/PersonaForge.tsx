
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Brain, FileText, Mail, MessageSquare, Upload, User2, Voicemail } from "lucide-react";
import DataUploadSection from "@/components/persona/DataUploadSection";
import ChatInterface from "@/components/persona/ChatInterface";
import { toast } from "@/components/ui/use-toast";

const PersonaForge = () => {
  const [isPersonaCreated, setIsPersonaCreated] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [chatHistory, setChatHistory] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  
  // Mock function to simulate persona creation
  const createPersona = () => {
    toast({
      title: "Digital Twin Created",
      description: "Your digital twin is ready to chat with you!",
    });
    setIsPersonaCreated(true);
    setActiveTab("chat");
    // Simulate initial message
    setChatHistory([
      { role: "assistant", content: "Hello! I'm your digital twin. Ask me anything or see how I would respond to different situations." }
    ]);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">
          <span className="persona-gradient-text">PersonaForge</span>
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Create a digital twin that responds like you from your data
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mx-auto max-w-4xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload" disabled={activeTab === "chat" && !isPersonaCreated}>
            <Upload className="mr-2 h-4 w-4" />
            Data Upload
          </TabsTrigger>
          <TabsTrigger value="chat" disabled={!isPersonaCreated}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="settings">
            <User2 className="mr-2 h-4 w-4" />
            Persona Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Data</CardTitle>
              <CardDescription>
                Add personal data to create a more accurate digital twin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataUploadSection />
              
              <div className="mt-6 text-center">
                <Button 
                  size="lg" 
                  className="bg-persona-gradient" 
                  onClick={createPersona}
                >
                  <Brain className="mr-2 h-5 w-5" />
                  Create My Digital Twin
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="chat" className="mt-4">
          {isPersonaCreated ? (
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 bg-primary">
                    <AvatarFallback>DT</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <CardTitle>Your Digital Twin</CardTitle>
                    <CardDescription>Chat with your AI persona</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ChatInterface chatHistory={chatHistory} setChatHistory={setChatHistory} />
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
              <Brain className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-2 text-xl font-medium">No Digital Twin Yet</p>
              <p className="mb-4 text-center text-muted-foreground">
                Upload your data and create your digital twin first
              </p>
              <Button onClick={() => setActiveTab("upload")}>
                Go to Data Upload
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Persona Settings</CardTitle>
              <CardDescription>
                Configure how your digital twin behaves
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <div className="mb-3 flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Writing Style</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your twin will mimic your writing style, formal level, and sentence structure.
                    </p>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="mb-3 flex items-center">
                      <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Response Length</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your twin will try to match your typical response length in conversations.
                    </p>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="mb-3 flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Email Style</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Email responses will follow your formatting, greeting and closing styles.
                    </p>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="mb-3 flex items-center">
                      <Voicemail className="mr-2 h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Voice Clone</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Optional: Add voice samples to enable audio responses in your voice.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button className="bg-persona-gradient" disabled={!isPersonaCreated}>
                    Update Persona Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonaForge;
