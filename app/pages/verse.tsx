"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";

interface BibleVerse {
  reference: string;
  text: string;
  translation_name?: string;
}

// List of verses used for the daily rotation.
// The date determines which verse is selected.
const DAILY_VERSES = [
  "John 3:16",
  "Psalm 23:1",
  "Philippians 4:13",
  "Jeremiah 29:11",
  "Proverbs 3:5-6",
  "Romans 8:28",
  "Matthew 11:28",
  "Isaiah 41:10",
  "Psalm 46:1",
  "Joshua 1:9",
  "Romans 12:2",
  "Psalm 119:105",
  "Matthew 6:33",
  "Proverbs 16:3",
  "Psalm 34:8",
  "Isaiah 40:31",
  "Matthew 18:20",
  "Romans 15:13",
  "2 Corinthians 5:17",
  "Galatians 5:22-23",
  "Ephesians 2:8-9",
  "Philippians 4:6-7",
  "Psalm 37:4",
  "Psalm 91:1-2",
  "Matthew 5:16",
  "Colossians 3:23",
  "Hebrews 11:1",
  "James 1:5",
  "1 Peter 5:7",
  "1 John 4:19",
];

export default function DailyVerse() {
  const root = useRef<HTMLElement>(null);

  const [verse, setVerse] = useState<BibleVerse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailyVerse = async () => {
      try {
        // Use the current date.
        const today = new Date();

        const startOfYear = new Date(today.getFullYear(), 0, 0);

        const diff =
          today.getTime() - startOfYear.getTime();

        const oneDay = 1000 * 60 * 60 * 24;

        const dayOfYear = Math.floor(diff / oneDay);

        // Select one verse based on the day.
        const reference =
          DAILY_VERSES[dayOfYear % DAILY_VERSES.length];

        const response = await fetch(
          `https://bible-api.com/${encodeURIComponent(reference)}?translation=web`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Bible verse");
        }

        const data = await response.json();

        setVerse({
          reference: data.reference,
          text: data.text,
          translation_name: data.translation_name,
        });
      } catch (error) {
        console.error("Failed to load daily verse:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyVerse();
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
        },
      });

      tl.fromTo(
        ".verse-over",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        }
      )
        .fromTo(
          ".verse-text",
          { opacity: 0, y: 46 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.25,
          },
          "-=0.35"
        )
        .fromTo(
          ".verse-ref",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.6"
        );

      // Parallax
      gsap.fromTo(
        ".verse-bg",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    },
    {
      scope: root,
    }
  );

  return (
    <section
      id="verse"
      ref={root}
      className="relative  overflow-hidden bg-ink py-24 sm:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/bible.jpg"
          alt="An open Bible by candlelight"
          fill
          className="verse-bg object-cover opacity-25"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="glass-panel px-6 py-12 sm:px-12 sm:py-14">
          <p className="verse-over text-xs font-semibold uppercase tracking-[0.4em] text-gold">
            A Word for Today
          </p>

          <span className="verse-text mt-8 block font-serif text-7xl text-gold/80 text-gold-glow">
            “
          </span>

          <p className="verse-text mt-2 font-serif text-3xl font-medium italic leading-snug text-cream sm:text-4xl">
            {loading
              ? "Loading today's verse..."
              : verse?.text?.trim() ||
                "Unable to load today's verse."}
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />

            <p className="verse-ref text-sm font-semibold uppercase tracking-[0.3em] text-gold sm:text-base">
              {loading ? "..." : verse?.reference}
            </p>

            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
          </div>

          {!loading && verse?.translation_name && (
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-cream/50">
              {verse.translation_name}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}