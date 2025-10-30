"use client";
import { useEffect, useState } from "react";
import { BlurFadeText } from "./partials/blurfade";
import { supabase } from "@/lib/supabaseClient";

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState<any[]>([]);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .lt("date", new Date().toISOString())
      .order("date", { ascending: true });
    if (error) console.error("Error fetching users:", error);
    else setEvents(data || []);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToImage = (index: any) => {
    setCurrentIndex(index);
  };

  const currentImage = events[currentIndex];



  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-8"
      id="events"
    >
  
      {events.length <= 0 ? (<>
        <div className="text-center mb-8">
          <h1 className="mb-6 text-center animate-fade-in">
            <BlurFadeText title="Past Events" subtitle="No Past Events" />
          </h1>
        </div>
      </>) : (<>
        <div className="max-w-7xl w-full">
          <div className="text-center mb-8">
            <h1 className="mb-6 text-center animate-fade-in">
              <BlurFadeText title="Past Events" subtitle="Explore our events" />
            </h1>
          </div>
          {/* <div className="bg-white w-full h-64">{JSON.stringify(events)}</div> */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Stacked Images */}
            <div className="relative h-[400px] md:h-[500px] flex items-center justify-center order-2 lg:order-1">
              {events.map((image, index) => {
                const offset = index - currentIndex;
                const absOffset = Math.abs(offset);

                if (absOffset > 2) return null;

                let zIndex = events.length - absOffset;
                let scale = 1 - absOffset * 0.08;
                let translateX = offset * 30;
                let translateY = absOffset * 15;
                let opacity = absOffset === 0 ? 1 : 0.4;
                let rotate = offset * 2;

                return (
                  <div
                    key={image.id}
                    className="absolute w-full max-w-md transition-all duration-700 ease-out cursor-pointer"
                    style={{
                      zIndex,
                      transform: `scale(${scale}) translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
                      opacity
                    }}
                    onClick={
                      offset !== 0
                        ? offset > 0
                          ? nextImage
                          : prevImage
                        : undefined
                    }
                  >
                    <div className="bg-white rounded-4xl overflow-hidden shadow-3xl">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={image.image}
                          alt={image.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-50 bg-slate-800/90 hover:bg-white text-white text-slate-800 rounded-full p-3 shadow-xl transition-all hover:scale-110"
                aria-label="Previous image"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-50 text-white bg-slate-800/90 hover:bg-white text-slate-800 rounded-full p-3 shadow-xl transition-all hover:scale-110"
                aria-label="Next image"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Right Column - Description */}
            <div className="order-1 lg:order-2 space-y-6">
              <div key={currentIndex} className="animate-fadeIn">
                <span className="inline-block px-4 py-2 bg-orange-500/50 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4 border border-purple-400/30">
                  {currentImage?.tag}
                </span>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {currentImage?.title}
                </h2>

                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  <span className="text-sm">Theme: </span>
                  <span className=""> {currentImage?.subtitle}</span>
                </p>

                <div className="space-y-3 text-slate-400">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Location: {currentImage?.address}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-orange-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3m-10 2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
                      />
                    </svg>

                    <span>When: {currentImage?.date}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5L6 9H3v6h3l5 4V5zM19 12a7 7 0 01-7 7"
                      />
                    </svg>

                    <span>Guess Speaker:  {currentImage?.gspeaker}</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <span className="text-slate-400 text-sm font-medium">
                    {currentIndex + 1} / {events.length}
                  </span>
                  <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-900 rounded-full transition-all duration-700"
                      style={{
                        width: `${((currentIndex + 1) / events.length) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Dots Navigation */}
              <div className="flex gap-2 pt-4">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`transition-all duration-300 rounded-full ${index === currentIndex
                      ? "w-10 h-3 bg-orange-700"
                      : "w-3 h-3 bg-slate-600 hover:bg-slate-500"
                      }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style></>)}
    </div>
  );
}
