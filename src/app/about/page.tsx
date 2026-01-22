import { Metadata } from 'next';
import { getPage } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'About - Design Pulp',
  description: 'Learn about Design Pulp and Balance Design in Atlanta, GA. Meet the team behind the interior design blog.',
};

export default async function AboutPage() {
  const page = await getPage('about');

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-12">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-light mb-4">About</h1>
        <div className="separator max-w-[100px] mx-auto" />
      </div>

      {/* Page Content */}
      <div className="max-w-3xl mx-auto">
        {page ? (
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />
        ) : (
          <div className="space-y-8">
            {/* Fallback content if WordPress page is not available */}
            <div className="text-center">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Equal parts eye candy and meaty content, <strong>Design Pulp</strong> is run by
                Stephanie Andrews, Jennifer Carter and Melody Richardson of Balance Design in Atlanta, GA.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Design Pulp aims to share photos, musings, and people that delight and inspire
                in the world of design and beyond. We are here to catch your eye and shake up
                your standards!
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Consider us your friend who will push you a little and love you a lot.
              </p>
            </div>

            {/* Team Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-light text-center mb-8">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Team Member 1 */}
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full" />
                  <h3 className="font-medium text-lg">Stephanie Andrews</h3>
                  <p className="text-gray-600 text-sm">Co-Founder</p>
                </div>

                {/* Team Member 2 */}
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full" />
                  <h3 className="font-medium text-lg">Jennifer Carter</h3>
                  <p className="text-gray-600 text-sm">Co-Founder</p>
                </div>

                {/* Team Member 3 */}
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full" />
                  <h3 className="font-medium text-lg">Melody Richardson</h3>
                  <p className="text-gray-600 text-sm">Co-Founder</p>
                </div>
              </div>
            </div>

            {/* Balance Design Link */}
            <div className="text-center mt-12 p-8 bg-gray-50">
              <h3 className="text-xl font-light mb-4">Looking for Interior Design Services?</h3>
              <p className="text-gray-600 mb-6">
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
        )}
      </div>
    </div>
  );
}
