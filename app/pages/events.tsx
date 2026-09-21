"use client";

import { CalendarDays, MapPin, Clock } from "lucide-react";
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
  image: string;
}

export default function Events() {
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
          Query.lessThan("date", now),
          Query.orderAsc("date"),
          Query.limit(6),
        ]
      )
      .then((res) => setEvents(res.documents as unknown as EventDoc[]))
      .catch((err) => console.error("Failed to load events:", err))
      .finally(() => setLoading(false));
  }, [databases]);

  useGSAP(
    () => {
      gsap.fromTo(
        ".event-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: root.current,
            start: "top 78%",
          },
        }
      );
    },
    { scope: root }
  );

  const formatDate = (value: string) => {
    const d = new Date(value);
    return {
      day: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
      year: d.getFullYear(),
      full: d.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };
  };

  return (
    <section id="events" ref={root} className="bg-cream-dark/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Lately in the House"
          title="Recent Gatherings"
          subtitle="Moments of worship, teaching, and fellowship from our recent services and programs."
        />

        {loading ? (
          <p className="mt-14 text-center text-sm text-muted-warm">Loading gatherings…</p>
        ) : events.length === 0 ? (
          <p className="mt-14 text-center text-sm text-muted-warm">
            Recent service highlights are being prepared.
          </p>
        ) : (
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const date = formatDate(event.date);
              const img = event.image || null;
              return (
                <article
                  key={event.$id}
                  className="event-card group overflow-hidden rounded-2xl border border-sand bg-white shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    {img ? (
                      <img
                        src={img}
                        alt={event.title || "Event"}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gold/25 to-burgundy/20">
                        <CalendarDays className="text-gold-deep" size={40} />
                      </div>
                    )}
                    <div className="absolute left-4 top-4 flex flex-col items-center rounded-xl bg-white/95 px-3 py-1.5 shadow-md backdrop-blur">
                      <span className="font-serif text-xl font-semibold leading-none text-gold-deep">
                        {date.day}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-soft">
                        {date.month}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-semibold text-ink">
                      {event.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-warm">
                      {event.subtitle || event.tag ? `${event.tag ? `“${event.tag}” ` : ""}${event.subtitle ?? ""}` : "Join us for worship, teaching, and fellowship."}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-sand pt-4 text-xs font-medium text-ink-soft">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={13} className="text-gold-deep" /> {date.time}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={13} className="text-gold-deep" />{" "}
                        {event.address || "GOM Sanctuary"}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}