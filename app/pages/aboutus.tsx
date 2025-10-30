import { BlurFadeText } from "./partials/blurfade";

export default function AboutUs() {
  return (
    <>
      <div className="min-h-screen" id="aboutus">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <h1 className="mb-6 text-center animate-fade-in">
              <BlurFadeText title="About us" subtitle="About GOM?" />
            </h1>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-300 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-500 mb-4">
                Our mission is to share the life-changing message of Jesus Christ and to spread
                God’s Word to all people. We are committed to nurturing faith, inspiring hope,
                and guiding souls toward a deeper relationship with God.
              </p>
              <p className="text-lg text-gray-500">
                Through service, love, and the power of the Gospel, we strive to reach every
                heart with the truth of God’s grace — empowering individuals and communities
                to live out their faith and bring light to the world.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-600 rounded-2xl p-12 text-white shadow-xl">
              <div className="space-y-8">
                <div>
                  <div className="text-5xl font-bold mb-2">10+</div>
                  <div className="text-blue-100">Years of Faithful Ministry</div>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">500K+</div>
                  <div className="text-blue-100">Lives Reached Through the Gospel</div>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">50+</div>
                  <div className="text-blue-100">Communities Sharing God's Word</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Values Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-300 mb-16">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Faith */}
              <div className="text-center p-8 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-600 hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2a9 9 0 100 18 9 9 0 000-18zm0 0v9l3 3"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-200 mb-4">Faith</h3>
                <p className="text-gray-300">
                  We trust in God’s guidance and rely on His Word as the foundation for
                  every action and decision we make.
                </p>
              </div>

              {/* Love */}
              <div className="text-center p-8 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-600 hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 21C12 21 4 13.657 4 8a4 4 0 018 0 4 4 0 018 0c0 5.657-8 13-8 13z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-200 mb-4">Love</h3>
                <p className="text-gray-300">
                  We reflect Christ’s love through compassion, kindness, and service —
                  sharing His grace with everyone we encounter.
                </p>
              </div>

              {/* Service */}
              <div className="text-center p-8 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-600 hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-200 mb-4">Service</h3>
                <p className="text-gray-300">
                  We dedicate our lives to serving others with humility and joy,
                  fulfilling our calling to be the hands and feet of Jesus.
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* CTA Section */}
        <div className="text-white p-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Us in a Powerful Time of Worship ✨
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let’s lift our voices, open our hearts, and experience God’s
              presence together. Every gathering is a new chance to grow in
              faith and purpose. 🙏
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
