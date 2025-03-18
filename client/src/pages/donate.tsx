import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { insertDonationSchema, type InsertDonation } from '@shared/schema';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, HandHeart, Users, School } from 'lucide-react';

export default function Donate() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const form = useForm<InsertDonation>({
    resolver: zodResolver(insertDonationSchema),
    defaultValues: {
      amount: 0,
      donorName: '',
      email: '',
      phone: '',
      message: '',
      paymentMethod: ''
    }
  });

  const donationMutation = useMutation({
    mutationFn: async (data: InsertDonation) => {
      const res = await apiRequest('POST', '/api/donations', data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: 'Thank you for your donation!',
        description: 'Your contribution will help make a difference.',
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: 'Error processing donation',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  function onSubmit(data: InsertDonation) {
    donationMutation.mutate(data);
  }

  const impactAreas = [
    {
      icon: Heart,
      title: "Healthcare Support",
      description: "Fund medical camps and healthcare initiatives"
    },
    {
      icon: School,
      title: "Education",
      description: "Support educational programs for underprivileged children"
    },
    {
      icon: Users,
      title: "Community Development",
      description: "Help build stronger, sustainable communities"
    },
    {
      icon: HandHeart,
      title: "Social Welfare",
      description: "Support programs for marginalized groups"
    }
  ];

  const paymentMethods = [
    { value: 'khalti', label: 'Khalti' },
    { value: 'esewa', label: 'eSewa' },
    { value: 'imepay', label: 'IME Pay' },
    { value: 'connectips', label: 'Connect IPS' }
  ];

  const suggestedAmounts = [1000, 2000, 5000, 10000];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('nav.donate')}</h1>
          <p className="text-lg text-muted-foreground">
            Your contribution helps us create lasting impact in our community
          </p>
        </div>

        {/* Impact Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactAreas.map((area, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <area.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{area.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{area.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Donation Form */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Make a Donation</CardTitle>
              <CardDescription>
                Choose an amount and payment method to support our cause
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Suggested Amounts */}
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {suggestedAmounts.map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant={form.getValues('amount') === amount ? 'default' : 'outline'}
                        onClick={() => form.setValue('amount', amount)}
                      >
                        NPR {amount}
                      </Button>
                    ))}
                  </div>

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Amount (NPR)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="donorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Email (Optional)</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {paymentMethods.map((method) => (
                              <SelectItem key={method.value} value={method.value}>
                                {method.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={donationMutation.isPending}
                  >
                    {donationMutation.isPending ? 'Processing...' : 'Donate Now'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
