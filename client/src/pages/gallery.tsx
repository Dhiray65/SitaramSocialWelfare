import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Gallery() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      url: "https://images.unsplash.com/photo-1455849318743-b2233052fcff",
      title: "Education Support Program",
      description: "Distribution of educational materials to students"
    },
    {
      url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca",
      title: "Community Service",
      description: "Volunteers working together for community development"
    },
    {
      url: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      title: "Healthcare Camp",
      description: "Free medical checkup camp for the community"
    },
    {
      url: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24",
      title: "Social Welfare Activities",
      description: "Supporting local initiatives"
    },
    {
      url: "https://images.unsplash.com/photo-1474649107449-ea4f014b7e9f",
      title: "Team Meetings",
      description: "Planning and coordination meetings"
    },
    {
      url: "https://images.unsplash.com/photo-1615856210162-9ae33390b1a2",
      title: "Community Engagement",
      description: "Engaging with local community members"
    },
    {
      url: "https://images.unsplash.com/photo-1542315099045-93937d70c67a",
      title: "Volunteer Work",
      description: "Dedicated volunteers making a difference"
    },
    {
      url: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
      title: "Team Building",
      description: "Building strong teams for better impact"
    },
    {
      url: "https://images.unsplash.com/photo-1616895727759-dd84a2690433",
      title: "Community Support",
      description: "Supporting those in need"
    }
  ];

  const selectedImageData = images.find(img => img.url === selectedImage);

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('nav.gallery')}</h1>
          <p className="text-lg text-muted-foreground">
            A visual journey through our initiatives and impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={index}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            {selectedImageData && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedImageData.title}</DialogTitle>
                  <DialogDescription>{selectedImageData.description}</DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <img
                    src={selectedImageData.url}
                    alt={selectedImageData.title}
                    className="w-full rounded-lg"
                  />
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
