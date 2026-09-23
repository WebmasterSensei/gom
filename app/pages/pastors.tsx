"use client";

import { Databases, Query } from "appwrite";
import { useAppwrite } from "@appwrite.io/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { appwriteConfig } from "@/lib/appwrite";
import SectionHeading from "./partials/section-heading";

interface PastorDoc {
  $id: string;
  name: string;
  rank: string;
  address: string;
  startdate: string;
  image: string;
}

export default function Pastors() {
  const { client } = useAppwrite();
  const databases = useMemo(() => new Databases(client), [client]);
  const root = useRef<HTMLElement>(null);

  const [pastors, setPastors] = useState<PastorDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    databases
      .listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.pastorsCollectionId,
        [Query.equal("status", ["Active"]), Query.orderAsc("$createdAt")]
      )
      .then((res) => setPastors(res.documents as unknown as PastorDoc[]))
      .catch((err) => console.error("Failed to load pastors:", err))
      .finally(() => setLoading(false));
  }, [databases]);

  useGSAP(
    () => {
      gsap.fromTo(
        ".pastor-card",
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
    <section id="pastors" ref={root} className="bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Godly Leadership"
          title="Our Pastors"
          subtitle="Servants of the Word, shepherding the flock with wisdom, humility, and love."
        />

        {loading ? (
          <p className="mt-14 text-center text-sm text-cream/60">Loading pastors…</p>
        ) : pastors.length === 0 ? (
          <p className="mt-14 text-center text-sm text-cream/60">
            Pastor profiles are being prepared.
          </p>
        ) : (
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pastors.map((pastor) => {
              const img = pastor.image || null;
              return (
                <article
                  key={pastor.$id}
                  className="pastor-card group glass-panel overflow-hidden text-center transition hover:-translate-y-1.5 hover:shadow-[0_36px_80px_-28px_rgba(0,0,0,0.7)]"
                >
                  <div className="relative mx-auto mt-8 h-36 w-36 overflow-hidden rounded-full border-4 border-gold/30 shadow-lg transition group-hover:border-gold/70">
                    {img ? (
                      <img
                        src={img}
                        alt={pastor.name || "Pastor"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gold/25 to-burgundy/20 font-serif text-4xl font-semibold text-gold">
                        {(pastor.name || "?").charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-semibold text-cream">
                      {pastor.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      {pastor.rank || "Minister"}
                    </p>
                    <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
                    <p className="mt-4 text-sm leading-relaxed text-cream/60">
                      {pastor.address || "Serving faithfully in the ministry of God's Oracle."}
                    </p>
                    {pastor.startdate && (
                      <p className="mt-2 text-xs font-medium text-cream/70">
                        Serving since {new Date(pastor.startdate).toLocaleDateString("en-US", { year: "numeric" })}
                      </p>
                    )}
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