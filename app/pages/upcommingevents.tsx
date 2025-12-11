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
    <div className="min-h-screen py-20 px-4 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="mb-6 text-center animate-fade-in">
            <BlurFadeText
              title="Upcoming Events"
              subtitle="View Our Upcoming Events"
            />
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Join us in worship, fellowship, and service as we grow together in faith.
          </p>
        </div>

        {/* Event List */}
        <div className="space-y-8">
          {upcommevents.length <= 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-semibold text-gray-200">
                No Upcoming Events
              </h3>
              <p className="text-gray-400 mt-2">
                Stay tuned! New events will be announced soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcommevents.map((event) => (
                <div
                  key={event.id}
                  className="bg-linear-to-br from-slate-950 via-blue-950/50 to-slate-900 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-transform duration-300 hover:scale-[1.03]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-linear-to-br from-orange-700 to-yellow-600 rounded-full text-sm font-semibold text-white border border-slate-600">
                      {event?.tag}
                    </span>
                    <Calendar className="w-5 h-5 text-slate-400" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {event?.title}
                  </h3>
                  <p className="text-slate-300 mb-4 text-sm">
                    Theme: {event?.subtitle}
                  </p>

                  <div className="space-y-2 mb-4 text-sm text-slate-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      {new Date(event?.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>

                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-purple-500" />
                      {event?.starttime &&
                        new Date(`1970-01-01T${event.starttime}`).toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}{" "}
                      to{" "}
                      {event?.endtime &&
                        new Date(`1970-01-01T${event.endtime}`).toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                    </div>

                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-red-500" />
                      {event?.address}
                    </div>

                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-emerald-500" />
                      All Welcome
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-xl">
                    <img
                      className="rounded-xl w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      src={event?.image}
                      alt={event?.title}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

  );
}
