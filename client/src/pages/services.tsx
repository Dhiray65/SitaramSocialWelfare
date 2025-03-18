import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      title: "Education Support",
      description: "Providing educational materials, scholarships, and learning support to underprivileged children.",
      image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff"
    },
    {
      title: "Healthcare Initiatives",
      description: "Organizing health camps, providing medical assistance, and promoting health awareness.",
      image: "https://images.unsplash.com/photo-1485811055483-1c09e64d4576"
    },
    {
      title: "Community Development",
      description: "Working on infrastructure development and community empowerment projects.",
      image: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24"
    },
    {
      title: "Skill Development",
      description: "Training programs for youth and women to enhance their employability.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
    },
    {
      title: "Environmental Programs",
      description: "Initiatives for environmental conservation and sustainable practices.",
      image: "https://images.unsplash.com/photo-1513594964634-381b22a9e135"
    },
    {
      title: "Social Welfare",
      description: "Support programs for elderly, disabled, and marginalized communities.",
      image: "https://images.unsplash.com/photo-1599059898816-d08dd9afb4b5"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('nav.services')}</h1>
          <p className="text-lg text-muted-foreground">
            Our comprehensive range of services aimed at community development and social welfare
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
