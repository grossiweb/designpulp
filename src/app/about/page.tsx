import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About - Design Pulp',
  description: 'A love letter to the art of living well by encouraging a life of balance, simplicity, travel and life-long learning.',
};

export default function AboutPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-4 py-12">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left Column - Image */}
        <div className="relative">
          <div className="relative w-full aspect-[3/4] md:aspect-auto md:h-full min-h-[400px]">
            <Image
              src="https://designpulp.net/wp-content/uploads/2025/07/CB7167CB-71D6-4AEA-9E91-DD8479887B47.jpg"
              alt="About Design Pulp"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="flex flex-col justify-center">
          <div className="space-y-6">
            <p>
              Welcome to <strong>Design Pulp</strong>—a love letter to the art of living well by encouraging a life of balance, simplicity, travel and life-long learning.
            </p>

            <p>
              I'm Stephanie Andrews, and after 25 years at Balance Design, I've learned that creativity thrives when nurtured by new experiences. Whether it's a spontaneous road trip, a quiet afternoon with a good book, or discovering an artist who speaks to my soul, these moments shape how I see the world—and how I design within it.
            </p>

            <p>
              Here, I explore how design enriches our everyday home life. I share art that moves me, books that challenge me, people who inspire me, and the places I've been lucky enough to wander. It's a space to celebrate beauty in all its forms and to remind ourselves that a well-lived life is one filled with curiosity and intention.
            </p>

            <p>
              Think of me as a friend, sharing journeys of creativity, travel, art and the little moments that make life meaningful.
            </p>

            <p>
              I'm so glad you're here.
            </p>

            <p className="mt-4">
              <em>Stephanie</em>
            </p>
          </div>
        </div>
      </div>

      {/* Balance Design Link */}
      <div className="mt-16 p-8 bg-gray-50 text-center">
        <h3 className="text-xl font-light mb-4">Looking for Interior Design Services?</h3>
        <p className="mb-6">
          Visit our interior design firm, Balance Design, for full-service design in Atlanta, GA.
        </p>
        <a
          href="http://www.balancedesignatlanta.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-block"
        >
          Visit Balance Design
        </a>
      </div>
    </div>
  );
}
