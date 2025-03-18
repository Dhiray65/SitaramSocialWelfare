import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        services: 'Services',
        gallery: 'Gallery',
        contact: 'Contact',
        membership: 'Membership',
        donate: 'Donate'
      },
      home: {
        title: 'Sitaram Social Welfare Organization',
        subtitle: 'Working for Community Development',
        mission: 'Our mission is to empower communities through social welfare initiatives'
      },
      about: {
        title: 'About Us',
        description: 'Sitaram Social Welfare Organization is dedicated to serving the community through various social initiatives'
      },
      contact: {
        address: 'Kabilasi -6, Jamuniya, Sarlahi, Nepal',
        phone: 'Phone',
        email: 'Email'
      }
    }
  },
  ne: {
    translation: {
      nav: {
        home: 'गृहपृष्ठ',
        about: 'हाम्रोबारे',
        services: 'सेवाहरू',
        gallery: 'ग्यालरी',
        contact: 'सम्पर्क',
        membership: 'सदस्यता',
        donate: 'दान'
      },
      home: {
        title: 'सीताराम सामाजिक कल्याण संस्था',
        subtitle: 'समुदाय विकासको लागि कार्यरत',
        mission: 'हाम्रो मिशन सामाजिक कल्याण पहलहरू मार्फत समुदायहरूलाई सशक्तिकरण गर्नु हो'
      },
      about: {
        title: 'हाम्रोबारे',
        description: 'सीताराम सामाजिक कल्याण संस्था विभिन्न सामाजिक पहलहरू मार्फत समुदायको सेवामा समर्पित छ'
      },
      contact: {
        address: 'कबिलासी -६, जमुनिया, सर्लाही, नेपाल',
        phone: 'फोन',
        email: 'इमेल'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
