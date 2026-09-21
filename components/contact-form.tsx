"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "name must be at least 2 characters").max(50, "name must be less than 50 characters"),
  email: z.string().email("please enter a valid email address"),
  subject: z.string().min(5, "subject must be at least 5 characters").max(100, "subject must be less than 100 characters"),
  message: z.string().min(10, "message must be at least 10 characters").max(1000, "message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'failed to send message');
      }
      
      toast({
        title: "message sent successfully!",
        description: "thank you for your message. i'll get back to you soon.",
      });
      
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error('Contact form error:', error);
      
      toast({
        title: "failed to send message",
        description: error instanceof Error ? error.message.toLowerCase() : "something went wrong. please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="relative" aria-label="contact me">
          <Mail className="h-4 w-4" />
          <span className="sr-only">contact me</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lowercase">
        <DialogHeader>
          <DialogTitle>get in touch</DialogTitle>
          <DialogDescription>
            send me a message and i&apos;ll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input placeholder="your name" className="lowercase" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" type="email" className="lowercase" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>subject</FormLabel>
                  <FormControl>
                    <Input placeholder="what's this about?" className="lowercase" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="tell me more about your project or question..."
                      className="min-h-[100px] lowercase"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="lowercase">
                cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="lowercase">
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent" />
                    sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    send message
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}