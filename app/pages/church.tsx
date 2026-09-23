"use client";

import { MapPin, Church as ChurchIcon, ExternalLink } from "lucide-react";
import { Databases, Query } from "appwrite";
import { useAppwrite } from "@appwrite.io/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { appwriteConfig } from "@/lib/appwrite";
import SectionHeading from "./partials/section-heading";

interface ChurchDoc {
  $id: string;
  name: string;
  address: string;
  desc: string;
  map: string;
}

export default function Churches() {
  const { client } = useAppwrite();
  const databases = useMemo(() => new Databases(client), [client]);
  const root = useRef<HTMLElement>(null);

  const [churches, setChurches] = useState<ChurchDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    databases
      .listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.churchesCollectionId,
        [Query.equal("status", ["Active"]), Query.orderAsc("$createdAt")]
      )
      .then((res) => setChurches(res.documents as unknown as ChurchDoc[]))
      .catch((err) => console.error("Failed to load churches:", err))
      .finally(() => setLoading(false));
  }, [databases]);

  useGSAP(
    () => {
      gsap.fromTo(
        ".church-card",
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 78%" },
        }
      );
    },
    { scope: root }
  );

  return (
    <section id="churches" ref={root} className="bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Where We Worship"
          title="Our Churches"
          subtitle="Find a God's Oracle church near you, or worship with us at our sanctuaries."
        />

        {loading ? (
          <p className="mt-14 text-center text-sm text-cream/60">Loading churches…</p>
        ) : churches.length === 0 ? (
          <p className="mt-14 text-center text-sm text-cream/60">
            Church locations are being added soon.
          </p>
        ) : (
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {churches.map((church) => (
              <article
                key={church.$id}
                className="church-card glass-panel overflow-hidden transition hover:-translate-y-1.5 hover:shadow-[0_36px_80px_-28px_rgba(0,0,0,0.7)]"
              >
                <div className="flex items-center gap-4 border-b border-white/10 bg-gradient-to-r from-gold/15 to-transparent px-6 py-5">
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-deep to-gold text-white shadow-md">
                    <ChurchIcon size={20} />
                    <span className="absolute -inset-1 -z-10 rounded-full bg-gold/25 blur-sm"></span>
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-cream">
                      {church.name}
                    </h3>
                    <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs font-medium text-cream/60">
                      <MapPin size={12} className="text-gold" />
                      {church.address}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-relaxed text-cream/60">{church.desc}</p>

                  {church.map ? (
                    <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
                      <iframe
                        src={church.map}
                        title={`Map - ${church.name}`}
                        className="h-52 w-full"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  ) : (
                    <div className="mt-5 flex h-32 items-center justify-center rounded-xl border border-dashed border-gold/40 bg-white/[0.05]">
                      <span className="inline-flex items-center gap-2 text-sm text-cream/60">
                        <ExternalLink size={16} /> Map coming soon
                      </span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}