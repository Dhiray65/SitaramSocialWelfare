import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { insertSubscriberSchema, type InsertSubscriber } from '@shared/schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function NewsletterForm() {
  const { toast } = useToast();
  
  const form = useForm<InsertSubscriber>({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: {
      email: '',
      name: ''
    }
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: InsertSubscriber) => {
      const res = await apiRequest('POST', '/api/subscribe', data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: 'Successfully subscribed!',
        description: 'Thank you for subscribing to our newsletter.',
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: 'Subscription failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  function onSubmit(data: InsertSubscriber) {
    subscribeMutation.mutate(data);
  }

  return (
    <div className="bg-primary/5 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
      <p className="text-muted-foreground mb-6">
        Stay updated with our latest news, events, and initiatives.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full"
            disabled={subscribeMutation.isPending}
          >
            {subscribeMutation.isPending ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
