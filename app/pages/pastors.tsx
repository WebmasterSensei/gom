import { BlurFadeText } from "./partials/blurfade";

export default function Pastors() {
  const chairman = [
    {
      name: "Dominggo Castillo",
      role: "Head Chairman",
      subtitle: "October 30, 2019",
      initials: "ER",
      element: "Earth",
      symbol: "土",
    address: "Kalilangan Bukidnon",
      nation: "EARTH KINGDOM",
      gradient: "from-green-700 via-yellow-700 to-green-900",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
      borderColor: "border-green-500",
      glowColor: "shadow-green-500/60"
    }
  ];
  const pastors = [
    {
      name: "Sarah Johnson",
      role: "Water Tribe Master",
      subtitle: "January 30, 2021",
      element: "Water",
      symbol: "水",
      nation: "WATER TRIBE",
      gradient: "from-blue-600 via-cyan-500 to-blue-800",
      borderColor: "border-blue-400",
      glowColor: "shadow-blue-400/60",

    address: "Kalilangan Bukidnon",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
      ringColors: {
        outer: "border-blue-400/40",
        middle: "border-cyan-400/30",
        inner: "border-blue-300/20"
      }
    },
    {
      name: "Michael Chen",
      role: "Fire Nation Master",
      subtitle: "October 20 2021",
      element: "Fire",
      symbol: "火",
      nation: "FIRE NATION",
      gradient: "from-red-600 via-orange-500 to-yellow-600",
      borderColor: "border-orange-400",
      glowColor: "shadow-orange-500/60",

    address: "Kalilangan Bukidnon",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
      ringColors: {
        outer: "border-red-400/40",
        middle: "border-orange-400/30",
        inner: "border-yellow-400/20"
      }
    },
    {
      name: "Emily Rodriguez",
      role: "Earth Kingdom Master",
      subtitle: "October 20, 2019",
      element: "Earth",
      symbol: "土",
      nation: "EARTH KINGDOM",
      gradient: "from-green-700 via-yellow-700 to-green-900",
      borderColor: "border-green-500",
      glowColor: "shadow-green-500/60",

    address: "Macaas, Tubigon Bohol",
     image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
      ringColors: {
        outer: "border-green-500/40",
        middle: "border-yellow-500/30",
        inner: "border-green-400/20"
      }
    }
  ];
  return (
    <>
      {/* Team Section */}
      <div className="min-h-screen py-20" id="pastors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title Section */}
          <div className="text-center mb-20">
            <h1 className="mb-6 text-center animate-fade-in">
              <BlurFadeText title="Leaderships" subtitle="Meet our pastors" />
            </h1>

            <div className="flex justify-center items-center gap-4 mt-6">
              <span className="text-blue-400 text-xl">📖</span>
              <span className="text-green-600 text-xl">✝️</span>
              <span className="text-orange-500 text-xl">🙏</span>
              <span className="text-gray-400 text-xl">🕊️</span>
            </div>
          </div>

          {/* Avatar/Featured Leader */}
          <div className="flex justify-center mb-20">
            <div>
              {chairman.map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-8 inline-block">
                    {/* Outer rotating circles */}
                    <div className="absolute inset-0 w-48 h-48 mx-auto">
                      <div className="absolute inset-0 rounded-full border-4 border-green-500/40 group-hover:rotate-[360deg] transition-transform duration-[4000ms] ease-linear"></div>
                      <div className="absolute inset-3 rounded-full border-2 border-yellow-500/30 group-hover:-rotate-[360deg] transition-transform duration-[3000ms] ease-linear"></div>
                      <div className="absolute inset-6 rounded-full border border-green-400/20 group-hover:rotate-[360deg] transition-transform duration-[5000ms] ease-linear"></div>
                    </div>

                    {/* Avatar circle */}
                    <div
                      style={{
                        backgroundImage: `url(${member.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                      }}
                      className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center mx-auto 
    group-hover:scale-110 transition-all duration-700 border-4 
    ${member.borderColor} group-hover:shadow-2xl ${member.glowColor}`}
                    >
                      {/* Overlay gradient layers */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_50%)]"></div>

                      {/* Symbol & Nation Text */}
                      <div className="relative z-10 text-center">
                       
                      </div>
                    </div>
                  </div>

                  <h3
                    className="text-3xl font-bold text-amber-100 mb-2"
                    style={{ fontFamily: "serif" }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-green-400 font-bold text-lg mb-1 tracking-wide">
                    {member.role}
                  </p>
                 
                    <p className="text-gray-500 text-sm tracking-wider">
                     {member.address}
                  </p>
                   <p className="text-gray-500 text-[12px] tracking-wider">
                    Since: {member.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-3 gap-16">
            {pastors.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6 inline-block">
                  {/* Rotating ornamental circles */}
                  <div className="absolute inset-0 w-40 h-40 mx-auto">
                    <div
                      className={`absolute inset-0 rounded-full border-4 ${member.ringColors.outer} group-hover:rotate-180 transition-transform duration-[4000ms] ease-linear`}
                    ></div>
                    <div
                      className={`absolute inset-3 rounded-full border-2 ${member.ringColors.middle} group-hover:-rotate-180 transition-transform duration-[3000ms] ease-linear`}
                    ></div>
                    <div
                      className={`absolute inset-6 rounded-full border ${member.ringColors.inner} group-hover:rotate-180 transition-transform duration-[5000ms] ease-linear`}
                    ></div>
                  </div>

                  {/* Avatar circle */}
                  <div
                    style={{
                      backgroundImage: `url(${member.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat"
                    }}
                    className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center mx-auto 
    group-hover:scale-110 transition-all duration-700 border-4 
    ${member.borderColor} group-hover:shadow-2xl ${member.glowColor}`}
                  >
                    {/* Overlay gradient layers */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_50%)]"></div>

                    {/* Symbol & Nation Text */}
                   
                  </div>
                </div>

                <h3
                  className="text-2xl font-bold text-amber-100 mb-2"
                  style={{ fontFamily: "serif" }}
                >
                  {member.name}
                </h3>
                <p
                  className={`font-bold text-base mb-1 tracking-wide ${
                    member.element === "Water"
                      ? "text-blue-400"
                      : member.element === "Fire"
                      ? "text-orange-400"
                      : "text-green-400"
                  }`}
                >
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm tracking-wider">
                   {member.address}
                </p>
                 <p className="text-gray-500 text-[12px] tracking-wider">
                    Since: {member.subtitle}
                  </p>
              </div>
            ))}
          </div>

          {/* Bottom decoration */}
          <div className="flex justify-center mt-20">
            <div className="flex items-center gap-3">
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-amber-500/50"></div>
              <div className="text-amber-500/50 text-sm tracking-widest">
                ◆ ◆ ◆
              </div>
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-amber-500/50"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
