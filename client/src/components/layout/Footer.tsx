import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SiFacebook, SiInstagram, SiYoutube } from 'react-icons/si';

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    { 
      icon: SiFacebook, 
      href: 'https://www.facebook.com/SSWO.2096',
      label: 'Facebook'
    },
    { 
      icon: SiInstagram, 
      href: 'https://www.facebook.com/SSWO.2096',
      label: 'Instagram'
    },
    { 
      icon: SiYoutube, 
      href: 'https://www.youtube.com/@SSWO.2096',
      label: 'YouTube'
    }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('home.title')}</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{t('contact.address')}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+977 9803017655, 9709030974, 9869898828</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:sitaramsocialwelfare@gmail.com">
                  sitaramsocialwelfare@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-4 mt-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-foreground/80 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('nav.services')}</h3>
            <ul className="space-y-2">
              <li>Community Development</li>
              <li>Education Support</li>
              <li>Healthcare Initiatives</li>
              <li>Social Welfare Programs</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about">{t('nav.about')}</a></li>
              <li><a href="/contact">{t('nav.contact')}</a></li>
              <li><a href="/membership">{t('nav.membership')}</a></li>
              <li><a href="/donate">{t('nav.donate')}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/10">
          <p className="text-center">
            © {new Date().getFullYear()} {t('home.title')}. All rights reserved. | <a href="https://sitaramsocialwelfare.org.np" className="hover:underline">sitaramsocialwelfare.org.np</a>
          </p>
        </div>
      </div>
    </footer>
  );
}