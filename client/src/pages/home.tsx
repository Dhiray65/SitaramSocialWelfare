import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              {t('home.subtitle')}
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/donate">
                <Button size="lg">
                  {t('nav.donate')}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/membership">
                <Button variant="outline" size="lg">
                  {t('nav.membership')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{t('home.mission')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card">
              <img src="https://images.unsplash.com/photo-1455849318743-b2233052fcff" alt="Education" className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">Education Support</h3>
              <p className="text-muted-foreground">Providing educational resources and support to underprivileged children.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card">
              <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca" alt="Healthcare" className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">Healthcare Initiatives</h3>
              <p className="text-muted-foreground">Organizing health camps and providing medical assistance to communities.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card">
              <img src="https://images.unsplash.com/photo-1496449903678-68ddcb189a24" alt="Community" className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Development</h3>
              <p className="text-muted-foreground">Working towards sustainable development of local communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Make a Difference Today</h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Join us in our mission to create positive change in our community.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/contact">
                <Button variant="outline">Get Involved</Button>
              </Link>
              <Link href="/donate">
                <Button>Support Our Cause</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
