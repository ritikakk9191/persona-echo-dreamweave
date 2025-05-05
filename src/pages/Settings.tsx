
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

const settingsFormSchema = z.object({
  openaiApiKey: z.string().min(1, "API Key is required"),
  elevenlabsApiKey: z.string().optional(),
  pineconeApiKey: z.string().optional(),
  useVoiceCloning: z.boolean().default(false),
  useDreamImages: z.boolean().default(false),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

const defaultValues: Partial<SettingsFormValues> = {
  openaiApiKey: "",
  elevenlabsApiKey: "",
  pineconeApiKey: "",
  useVoiceCloning: false,
  useDreamImages: false,
};

export default function Settings() {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
  });

  function onSubmit(data: SettingsFormValues) {
    // In a real app, we would securely store these API keys
    localStorage.setItem("settings", JSON.stringify({
      useVoiceCloning: data.useVoiceCloning,
      useDreamImages: data.useDreamImages,
    }));
    
    toast({
      title: "Settings updated",
      description: "Your application settings have been saved.",
    });
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your AI applications</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Add your API keys to enable the full functionality of the applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="openaiApiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OpenAI API Key</FormLabel>
                    <FormControl>
                      <Input placeholder="sk-..." {...field} type="password" />
                    </FormControl>
                    <FormDescription>
                      Required for PersonaForge and DreamChain functionality.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="elevenlabsApiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ElevenLabs API Key (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="..." {...field} type="password" />
                    </FormControl>
                    <FormDescription>
                      Used for voice cloning features.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="pineconeApiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pinecone API Key (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="..." {...field} type="password" />
                    </FormControl>
                    <FormDescription>
                      For improved vector storage and retrieval.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            
            <Separator />
            
            <CardHeader>
              <CardTitle>Feature Settings</CardTitle>
              <CardDescription>
                Enable or disable specific features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="useVoiceCloning"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Voice Cloning</FormLabel>
                      <FormDescription>
                        Allow your digital twin to speak with your voice.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="useDreamImages"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Dream Visualization</FormLabel>
                      <FormDescription>
                        Generate images based on your dream descriptions.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            
            <CardFooter>
              <Button type="submit" className="w-full">Save Settings</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
