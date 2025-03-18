import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About Section */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-6">{t('about.title')}</h1>
          <p className="text-lg text-muted-foreground mb-8">
            {t('about.description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1504805572947-34fad45aed93" 
                alt="Organization" 
                className="rounded-lg w-full h-[400px] object-cover"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Our Vision</h2>
              <p className="text-muted-foreground">
                To create a society where every individual has access to basic necessities, 
                quality education, and healthcare facilities. We envision a community where 
                social welfare and development go hand in hand.
              </p>
              <h2 className="text-2xl font-semibold">Our Values</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Transparency in all our operations</li>
                <li>Commitment to community development</li>
                <li>Inclusive approach to social welfare</li>
                <li>Sustainable development practices</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1615856210162-9ae33390b1a2"
                alt="Team member"
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Leadership</h3>
              <p className="text-muted-foreground">
                Our leadership team brings years of experience in social welfare and 
                community development.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1599059813005-11265ba4b4ce"
                alt="Volunteers"
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Volunteers</h3>
              <p className="text-muted-foreground">
                Dedicated volunteers who work tirelessly to make our initiatives successful.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1474649107449-ea4f014b7e9f"
                alt="Community Partners"
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Community Partners</h3>
              <p className="text-muted-foreground">
                Strong partnerships with local organizations and community leaders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
