
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Mail, MessageSquare, Mic, Upload, X } from "lucide-react";
import { useState } from "react";

type FileType = "email" | "chat" | "writing" | "voice";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: FileType;
}

const DataUploadSection = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  
  const handleFileUpload = (type: FileType) => {
    // In a real application, this would handle actual file uploads
    // For this demo, we'll simulate adding files
    
    const fileNames: Record<FileType, string[]> = {
      email: ["gmail_export.mbox", "outlook_archive.pst"],
      chat: ["whatsapp_history.txt", "slack_export.json"],
      writing: ["blog_posts.txt", "essays.pdf"],
      voice: ["voice_sample_1.mp3", "voice_sample_2.wav"]
    };
    
    const randomIndex = Math.floor(Math.random() * fileNames[type].length);
    const newFile: UploadedFile = {
      id: `file-${Date.now()}`,
      name: fileNames[type][randomIndex],
      size: `${Math.floor(Math.random() * 10) + 1} MB`,
      type
    };
    
    setFiles([...files, newFile]);
  };
  
  const removeFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };
  
  const getFileIcon = (type: FileType) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "chat":
        return <MessageSquare className="h-4 w-4" />;
      case "writing":
        return <FileText className="h-4 w-4" />;
      case "voice":
        return <Mic className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 transition-all hover:bg-muted/50"
              onClick={() => handleFileUpload("email")}>
          <Mail className="mb-2 h-8 w-8 text-primary" />
          <p className="mb-1 font-medium">Email Data</p>
          <p className="text-sm text-muted-foreground">
            Upload .mbox or .eml files
          </p>
        </Card>
        
        <Card className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 transition-all hover:bg-muted/50"
              onClick={() => handleFileUpload("chat")}>
          <MessageSquare className="mb-2 h-8 w-8 text-primary" />
          <p className="mb-1 font-medium">Chat History</p>
          <p className="text-sm text-muted-foreground">
            Upload WhatsApp, Slack exports
          </p>
        </Card>
        
        <Card className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 transition-all hover:bg-muted/50"
              onClick={() => handleFileUpload("writing")}>
          <FileText className="mb-2 h-8 w-8 text-primary" />
          <p className="mb-1 font-medium">Writing Samples</p>
          <p className="text-sm text-muted-foreground">
            Upload .txt, .pdf, or .doc files
          </p>
        </Card>
        
        <Card className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 transition-all hover:bg-muted/50"
              onClick={() => handleFileUpload("voice")}>
          <Mic className="mb-2 h-8 w-8 text-primary" />
          <p className="mb-1 font-medium">Voice Samples</p>
          <p className="text-sm text-muted-foreground">
            Upload .mp3 or .wav files
          </p>
        </Card>
      </div>
      
      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 font-medium">Uploaded Files</h3>
          <div className="space-y-2 rounded-lg border bg-muted/30 p-4">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between rounded-lg bg-background p-2">
                <div className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeFile(file.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            <div className="mt-4 flex justify-center">
              <Button variant="outline" size="sm" className="flex items-center">
                <Upload className="mr-2 h-3 w-3" />
                Upload More Files
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataUploadSection;
