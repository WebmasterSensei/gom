"use client";

import { CalendarHeart, Clock, MapPin } from "lucide-react";
import { Databases, Query } from "appwrite";
import { useAppwrite } from "@appwrite.io/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { appwriteConfig } from "@/lib/appwrite";
import SectionHeading from "./partials/section-heading";

interface EventDoc {
  $id: string;
  title: string;
  subtitle: string;
  address: string;
  date: string;
  tag: string;
  gspeaker: string;
  starttime: string;
  image: string;
}

export default function UpComingEvents() {
  const { client } = useAppwrite();
  const databases = useMemo(() => new Databases(client), [client]);
  const root = useRef<HTMLElement>(null);

  const [events, setEvents] = useState<EventDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const now = new Date().toISOString();
    databases
      .listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.eventsCollectionId,
        [
          Query.equal("status", ["Active"]),
          Query.greaterThanEqual("date", now),
          Query.orderAsc("date"),
          Query.limit(4),
        ]
      )
      .then((res) => setEvents(res.documents as unknown as EventDoc[]))
      .catch((err) => console.error("Failed to load upcoming events:", err))
      .finally(() => setLoading(false));
  }, [databases]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 75%" },
        defaults: { ease: "power3.out" },
      });
      tl.fromTo(
        ".up-spotlight",
        { opacity: 0, y: 50, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9 }
      );
      tl.fromTo(
        ".up-card",
        { opacity: 0, y: 34 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
        "-=0.5"
      );
    },
    { scope: root }
  );

  const format = (value: string) => {
    const d = new Date(value);
    return {
      day: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
      time: d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      full: d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };
  };

  const next = events[0];
  const rest = events.slice(1, 3);

  return (
    <section id="upcoming" ref={root} className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-gold/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 h-72 w-72 rounded-full bg-burgundy/20 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          className="[&_.sh-title]:text-cream [&_.sh-sub]:text-sand/80"
          overline="Mark Your Calendar"
          title="Upcoming Events"
          subtitle="Join us for our next services, fellowship nights, and ministry programs."
        />

        {loading ? (
          <p className="mt-14 text-center text-sm text-sand/70">Loading upcoming events…</p>
        ) : next ? (
          <>
            {/* Spotlight */}
            <div className="up-spotlight mt-14 grid items-center overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-[#3f3120] to-[#2a2115] shadow-2xl lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                {next.image ? (
                  <img
                    src={next.image}
                    alt={next.title || "Upcoming event"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gold/30 to-burgundy/30">
                    <CalendarHeart className="text-gold" size={56} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent lg:bg-gradient-to-r"></div>
              </div>
              <div className="p-8 sm:p-12">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
                  Next Service
                </span>
                <h3 className="mt-5 font-serif text-3xl font-semibold text-cream sm:text-4xl">
                  {next.title}
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-sand/85">
                  {next.subtitle || (next.tag ? `Theme: ${next.tag}` : "Join us for worship and ministry.")}
                  {next.gspeaker ? ` · Guest Speaker: ${next.gspeaker}` : ""}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-cream/90">
                  <span className="inline-flex items-center gap-2">
                    <Clock size={16} className="text-gold" />{" "}
                    {next.starttime || format(next.date).time}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarHeart size={16} className="text-gold" />
                    {format(next.date).full}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={16} className="text-gold" />{" "}
                    {next.address || "GOM Sanctuary"}
                  </span>
                </div>
              </div>
            </div>

            {/* Remaining */}
            {rest.length > 0 && (
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {rest.map((event) => {
                  const d = format(event.date);
                  return (
                    <article
                      key={event.$id}
                      className="up-card flex items-center gap-5 rounded-2xl border border-gold/15 bg-white/5 p-5 backdrop-blur transition hover:border-gold/40 hover:bg-white/10"
                    >
                      <div className="flex w-20 shrink-0 flex-col items-center rounded-xl bg-gradient-to-b from-gold to-gold-deep py-3 text-white shadow-lg">
                        <span className="font-serif text-3xl font-semibold leading-none">
                          {d.day}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-widest">
                          {d.month}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-serif text-xl font-semibold text-cream">
                          {event.title}
                        </h4>
                        <p className="mt-1 line-clamp-2 text-sm text-sand/70">
                          {event.subtitle || event.tag || "Join us for worship and ministry."}
                        </p>
                        <p className="mt-2 text-xs font-medium text-gold">
                          {d.full} · {event.starttime || d.time}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <p className="mt-14 text-center text-sm text-sand/70">
            No upcoming services scheduled yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}