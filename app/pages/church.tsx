"use client";
import { useEffect, useState } from "react";
import { BlurFadeText } from "./partials/blurfade";
import { supabase } from "@/lib/supabaseClient";

export default function Church() {
  const [churches, setChurches] = useState<any[]>([]);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from("churches").select("*");
    if (error) console.error("Error fetching users:", error);
    else setChurches(data || []);
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  //   const churches = [
  //     {
  //       name: "God’s Oracle Main Church",
  //       address: "Cebu City, Philippines",
  //       desc: "Our main sanctuary and headquarters where it all began.",
  //       map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.450106369651!2d123.89314327576964!3d10.309348589826014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99954a5a5028d%3A0x94ec5ad3f9cda4f!2sCebu%20City%20Philippines!5e0!3m2!1sen!2sph!4v1693418570294!5m2!1sen!2sph"
  //     },
  //     {
  //       name: "God’s Oracle North Branch",
  //       address: "Mandaue City, Philippines",
  //       desc: "A growing community focused on youth and family ministries.",
  //       map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.756904416304!2d123.94069687576935!3d10.291716789838447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a999e79f5c2a19%3A0x94d49234b4b0e9d2!2sMandaue%20City!5e0!3m2!1sen!2sph!4v1693418770294!5m2!1sen!2sph"
  //     },
  //     {
  //       name: "God’s Oracle South Church",
  //       address: "Talisay City, Philippines",
  //       desc: "Bringing light and hope to the southern communities.",
  //       map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.801183699517!2d123.85064927576924!3d10.28931168983979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9993fa7aa8e3d%3A0xb06b8cb621c36d2d!2sTalisay%20City!5e0!3m2!1sen!2sph!4v1693418970294!5m2!1sen!2sph"
  //     }
  //   ];

  return (
    <div
      className="min-h-screen pb-20 md:py-20 md:lg-20 px-4 sm:px-6 lg:px-8  text-white"
      id="churches"
    >
      {/* Title */}
      <h1 className="mb-6 text-center animate-fade-in">
        <BlurFadeText
          title="Our Churches"
          subtitle="Discover our branches and their mission across the region"
        />
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {churches.map((church, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-600 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 text-amber-200">
              {church.name}
            </h2>
            <p className="text-gray-400 mb-3">{church.address}</p>
            <p className="text-gray-300 text-sm mb-4">{church.desc}</p>
            <iframe
              src={church.map}
              width="100%"
              height="200"
              allowFullScreen
              loading="lazy"
              className="rounded-xl border-none shadow-inner"
              title={`Map of ${church.name}`}
            />
          </div>
        ))}
      </div>

      {/* Decorative Line */}
      <div className="flex justify-center mt-20">
        <div className="flex items-center gap-3">
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-amber-500/50"></div>
          <div className="text-amber-500/50 text-sm tracking-widest">
            ✝️ ✝️ ✝️
          </div>
          <div className="w-24 h-px bg-gradient-to-l from-transparent to-amber-500/50"></div>
        </div>
      </div>
    </div>
  );
}
