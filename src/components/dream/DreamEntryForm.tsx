
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Send } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Dream title must be at least 2 characters.",
  }),
  content: z.string().min(10, {
    message: "Dream description must be at least 10 characters.",
  }),
});

interface DreamEntryFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const DreamEntryForm: React.FC<DreamEntryFormProps> = ({ onSubmit }) => {
  const [isRecording, setIsRecording] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    form.reset();
  };
  
  const simulateVoiceRecording = () => {
    setIsRecording(true);
    
    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      
      // Simulate transcription
      form.setValue("title", "Dream About Water");
      form.setValue("content", "I was swimming in a clear blue ocean, and could see coral reefs below. There were colorful fish swimming around me, and I could breathe underwater. I felt peaceful and free.");
    }, 3000);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dream Title</FormLabel>
              <FormControl>
                <Input placeholder="Give your dream a short title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dream Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your dream in detail... What happened? How did you feel? What details do you remember?"
                  className="min-h-[150px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex items-center justify-between pt-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={simulateVoiceRecording}
            disabled={isRecording}
          >
            {isRecording ? (
              <>
                <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-red-500"></span>
                Recording...
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" />
                Record Dream
              </>
            )}
          </Button>
          
          <Button type="submit">
            <Send className="mr-2 h-4 w-4" />
            Submit Dream
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DreamEntryForm;
