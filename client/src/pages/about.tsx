import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  const objectives = [
    "To assist the helpless, disabled, elderly, and vulnerable individuals in society.",
    "To conduct awareness campaigns related to health, education, and public awareness.",
    "To carry out special programs for underprivileged children and women.",
    "To collaborate and coordinate with various national and international organizations for conducting programs.",
    "To run upliftment programs for women, children, elderly, single women, Dalits, and Muslims.",
    "To conduct various awareness programs for the overall development of the general public.",
    "To help preserve and promote various traditional arts and cultures through the organization.",
    "To carry out activities related to education, health, sports, agriculture, and social transformation."
  ];

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
              <h2 className="text-2xl font-semibold">Who We Are</h2>
              <p className="text-muted-foreground">
                Sitaram Social Welfare Organization (सीताराम सामाजिक कल्याण संस्था) is a non-profit, 
                public welfare social organization dedicated to uplifting communities and promoting 
                social development.
              </p>
            </div>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Objectives</h2>
          <div className="grid grid-cols-1 gap-4">
            {objectives.map((objective, index) => (
              <div key={index} className="bg-card p-4 rounded-lg">
                <p className="text-muted-foreground">
                  <span className="inline-block w-6 h-6 bg-primary text-primary-foreground rounded-full text-center mr-3">
                    {index + 1}
                  </span>
                  {objective}
                </p>
              </div>
            ))}
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