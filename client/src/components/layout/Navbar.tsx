import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [location] = useLocation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ne' : 'en');
  };

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/services', label: t('nav.services') },
    { href: '/gallery', label: t('nav.gallery') },
    { href: '/contact', label: t('nav.contact') },
    { href: '/membership', label: t('nav.membership') },
    { href: '/donate', label: t('nav.donate') },
    { href: '/events', label: t('nav.events') }
  ];

  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <img 
                  src="/logo.png" 
                  alt="Sitaram Social Welfare Organization Logo" 
                  className="h-12 w-auto"
                />
                <span className="ml-3 text-lg font-bold hidden sm:block">SSWO</span>
              </a>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location === item.href 
                      ? 'bg-primary-foreground text-primary' 
                      : 'hover:bg-primary-foreground/10'
                  }`}>
                    {item.label}
                  </a>
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Button
              variant="outline"
              onClick={toggleLanguage}
              className="ml-4"
            >
              {i18n.language === 'en' ? 'नेपाली' : 'English'}
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-primary-foreground/10 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location === item.href 
                    ? 'bg-primary-foreground text-primary' 
                    : 'hover:bg-primary-foreground/10'
                }`}>
                  {item.label}
                </a>
              </Link>
            ))}
            <Button
              variant="outline"
              onClick={toggleLanguage}
              className="w-full mt-4"
            >
              {i18n.language === 'en' ? 'नेपाली' : 'English'}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}