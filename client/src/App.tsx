import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Gallery from "@/pages/gallery";
import Contact from "@/pages/contact";
import Membership from "@/pages/membership";
import Donate from "@/pages/donate";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";

// Import i18n configuration
import "./lib/i18n";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Switch>
        {/* Admin routes */}
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/dashboard/*" component={AdminDashboard} />

        {/* Public routes */}
        <Route path="*">
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/services" component={Services} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/contact" component={Contact} />
                <Route path="/membership" component={Membership} />
                <Route path="/donate" component={Donate} />
                <Route component={NotFound} />
              </Switch>
            </main>
            <Footer />
          </div>
        </Route>
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;