import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Cross,
  Heart,
  BookOpen
} from "lucide-react";
import { BlurFadeText } from "./partials/blurfade";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UpcomingEvents() {
  const [upcommevents, setEvents] = useState<any[]>([]);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .gt("date", new Date().toISOString())
      .order("date", { ascending: true });

    if (error) console.error("Error fetching users:", error);
    else setEvents(data || []);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen  py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="mb-6 text-center animate-fade-in">
            <BlurFadeText
              title="Upcomming Events"
              subtitle="View Our upcomming events"
            />
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Join us in worship, fellowship, and service as we grow together in
            faith
          </p>
        </div>

        {/* Timeline Style Events */}
        <div className="relative">
          {/* Vertical line */}
          {/* <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-purple-200 to-blue-200"></div> */}

          <div className="space-y-12">
            {upcommevents.length <= 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-3">📅</div>
                <h3 className="text-xl font-semibold text-gray-200">
                  No Upcoming Events
                </h3>
                <p className="text-gray-400 mt-2">
                  Stay tuned! New events will be announced soon.
                </p>
              </div>
            ) : (
              <div>
                {upcommevents.map((event, index) => (
                  <div
                    key={event.id}
                    className={`relative flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                  >
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                    {/* Empty space for alternating layout */}
                    <div className="hidden md:block flex-1"></div>

                    {/* Event Card */}
                    <div
                      className={`flex-1 bg-linear-to-br from-slate-950 via-slate-800 to-slate-950  rounded-4xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="px-3 py-1 bg-linear-to-br from-orange-800 to-yellow-800 rounded-full text-sm font-semibold text-white border border-slate-200">
                          {event?.tag}
                        </span>
                        <Calendar className="w-5 h-5 text-slate-500" />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-2">
                        {event?.title}
                      </h3>

                      <p className="text-slate-300 mb-4 text-sm">
                        Theme: {event?.subtitle}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-slate-300">
                          <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                          <span className="text-sm font-medium">
                            {new Date(event?.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center text-slate-300">
                          <Clock className="w-4 h-4 mr-2 text-purple-600" />
                          <span className="text-sm">
                            {event?.starttime
                              ? new Date(`1970-01-01T${event.starttime}`).toLocaleTimeString([], {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              })
                              : ""} to  {event?.endtime
                                ? new Date(`1970-01-01T${event.endtime}`).toLocaleTimeString([], {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                })
                                : ""}
                          </span>
                        </div>
                        <div className="flex items-center text-slate-300">
                          <MapPin className="w-4 h-4 mr-2 text-red-600" />
                          <span className="text-sm">{event?.address}</span>
                        </div>
                        <div className="flex items-center text-slate-300">
                          <Users className="w-4 h-4 mr-2 text-emerald-600" />
                          <span className="text-sm">All Welcome</span>
                        </div>
                      </div>

                      <div>
                        <img
                          className="rounded-2xl h-44 w-full"
                          src={event?.image}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
