import { supabase } from "@/lib/supabaseClient";
import { BlurFadeText } from "./partials/blurfade";
import { useEffect, useState } from "react";

export default function Pastors() {
  const [pastors, setPastors] = useState<any[]>([]);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from("pastors").select("*");
    console.log(data);
    if (error) console.error("Error fetching users:", error);
    else setPastors(data || []);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
         

          {/* Team Grid */}
          <div className="grid md:grid-cols-3 gap-16">
            {pastors.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6 inline-block">
        
                  <div
                    style={{
                      backgroundImage: `url(${member?.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat"
                    }}
                    className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center mx-auto 
    group-hover:scale-110 transition-all duration-700 border-4 
    ${member?.borderColor} group-hover:shadow-2xl ${member?.glowColor}`}
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
                  {member?.name}
                </h3>
                <p
                  className={`font-bold text-base mb-1 tracking-wide text-white`}
                >
                  {member?.rank}
                </p>
                <p className="text-gray-500 text-sm tracking-wider">
                  {member?.address}
                </p>
                <p className="text-gray-500 text-[12px] tracking-wider">
                  Since: {member?.startdate}
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
