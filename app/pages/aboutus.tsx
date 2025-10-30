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
                We're dedicated to creating technology that empowers individuals
                and organizations to achieve their full potential. Our
                innovative approach combines cutting-edge technology with
                human-centered design.
              </p>
              <p className="text-lg text-gray-500">
                Every day, we work to bridge the gap between complex technology
                and everyday users, making powerful tools accessible to
                everyone.
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-600 rounded-2xl p-12 text-white shadow-xl">
              <div className="space-y-8">
                <div>
                  <div className="text-5xl font-bold mb-2">10+</div>
                  <div className="text-blue-100">Years of Excellence</div>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">500K+</div>
                  <div className="text-blue-100">Happy Customers</div>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">50+</div>
                  <div className="text-blue-100">Countries Worldwide</div>
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
            <div className="grid md:grid-cols-3 gap-8 ">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-200 mb-4">
                  Innovation
                </h3>
                <p className="text-gray-300">
                  We constantly push boundaries and explore new possibilities to
                  deliver cutting-edge solutions.
                </p>
              </div>

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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-200 mb-4">
                  Collaboration
                </h3>
                <p className="text-gray-300">
                  We believe in the power of teamwork and building strong
                  partnerships with our clients.
                </p>
              </div>

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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-200 mb-4">
                  Integrity
                </h3>
                <p className="text-gray-300">
                  We uphold the highest standards of honesty and transparency in
                  everything we do.
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
