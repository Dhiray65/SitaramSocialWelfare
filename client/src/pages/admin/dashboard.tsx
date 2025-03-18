import { useState } from 'react';
import { useLocation, Route, Switch } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  Heart,
  Mail,
  LogOut,
  Mail as MailIcon,
  ChevronRight,
  CheckCircle,
  XCircle,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';

function AdminNav() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await apiRequest('POST', '/api/admin/logout');
      toast({
        title: 'Logged out successfully',
      });
      setLocation('/admin/login');
    } catch (error) {
      toast({
        title: 'Logout failed',
        variant: 'destructive',
      });
    }
  };

  const navItems = [
    { href: '/admin/dashboard', label: 'Members', icon: Users },
    { href: '/admin/dashboard/donations', label: 'Donations', icon: Heart },
    { href: '/admin/dashboard/contacts', label: 'Contacts', icon: Mail },
    { href: '/admin/dashboard/subscribers', label: 'Newsletter', icon: MailIcon },
    { href: '/admin/dashboard/events', label: 'Events', icon: Calendar },
  ];

  return (
    <div className="flex flex-col h-full p-4 bg-card border-r">
      <div className="space-y-4">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setLocation(item.href)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </div>
      <Button
        variant="ghost"
        className="mt-auto text-red-500 hover:text-red-600 hover:bg-red-50"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}

function MembersTable() {
  const { data: members = [] } = useQuery({
    queryKey: ['/api/admin/members'],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>Manage organization members</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Membership Type</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.fullName}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>{member.membershipType}</TableCell>
                <TableCell>{new Date(member.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function DonationsTable() {
  const { data: donations = [] } = useQuery({
    queryKey: ['/api/admin/donations'],
  });

  const { toast } = useToast();

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest('PATCH', `/api/donations/${id}/status`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/donations'] });
      toast({
        title: 'Status updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to update status',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donations</CardTitle>
        <CardDescription>Manage donation records</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Donor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell>{donation.donorName}</TableCell>
                <TableCell>NPR {donation.amount}</TableCell>
                <TableCell>{donation.paymentMethod}</TableCell>
                <TableCell>{donation.paymentStatus}</TableCell>
                <TableCell>{new Date(donation.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatusMutation.mutate({ id: donation.id, status: 'completed' })}
                      disabled={donation.paymentStatus === 'completed'}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatusMutation.mutate({ id: donation.id, status: 'failed' })}
                      disabled={donation.paymentStatus === 'failed'}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ContactsTable() {
  const { data: contacts = [] } = useQuery({
    queryKey: ['/api/admin/contacts'],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Messages</CardTitle>
        <CardDescription>View and manage contact form submissions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.subject}</TableCell>
                <TableCell>{contact.message}</TableCell>
                <TableCell>{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function SubscribersTable() {
  const { data: subscribers = [] } = useQuery({
    queryKey: ['/api/admin/subscribers'],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Newsletter Subscribers</CardTitle>
        <CardDescription>View and manage newsletter subscribers</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subscribed Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell>{subscriber.name || '-'}</TableCell>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>{new Date(subscriber.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function EventsTable() {
  const { data: events = [] } = useQuery({
    queryKey: ['/api/events'],
  });

  const { toast } = useToast();

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest('PATCH', `/api/events/${id}/status`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({
        title: 'Status updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to update status',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  const [, setLocation] = useLocation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Events</CardTitle>
        <CardDescription>Manage organization events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button onClick={() => setLocation('/admin/dashboard/events/new')}>
            Add New Event
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{format(new Date(event.date), 'PPP')}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.status}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {['upcoming', 'ongoing', 'completed'].map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={event.status === status ? 'default' : 'outline'}
                        onClick={() => updateStatusMutation.mutate({ id: event.id, status })}
                        disabled={event.status === status}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 border-r">
        <AdminNav />
      </aside>
      <main className="flex-1 p-8">
        <Switch>
          <Route path="/admin/dashboard" component={MembersTable} />
          <Route path="/admin/dashboard/donations" component={DonationsTable} />
          <Route path="/admin/dashboard/contacts" component={ContactsTable} />
          <Route path="/admin/dashboard/subscribers" component={SubscribersTable} />
          <Route path="/admin/dashboard/events" component={EventsTable} />
        </Switch>
      </main>
    </div>
  );
}