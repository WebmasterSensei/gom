"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";

export default function DailyVerse() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
        },
      });

      tl.fromTo(
        ".verse-over",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".verse-text",
          { opacity: 0, y: 46 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.25 },
          "-=0.35"
        )
        .fromTo(
          ".verse-ref",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        );

      // Parallax on imagery
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
    { scope: root }
  );

  return (
    <section
      id="verse"
      ref={root}
      className="relative overflow-hidden bg-ink py-24 sm:py-32"
    >
      {/* Background imagery */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/bible.jpg"
          alt="An open Bible by candlelight"
          fill
          className="verse-bg object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink"></div>
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="verse-over text-xs font-semibold uppercase tracking-[0.4em] text-gold">
          A Word for Today
        </p>

        <span className="verse-text mt-8 block font-serif text-7xl text-gold/80">
          “
        </span>

        <p className="verse-text mt-2 font-serif text-3xl font-medium italic leading-snug text-cream sm:text-4xl">
          For where two or three are gathered together in my name, there am I in
          the midst of them.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60"></div>
          <p className="verse-ref text-sm font-semibold uppercase tracking-[0.3em] text-gold sm:text-base">
            Matthew 18:20
          </p>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60"></div>
        </div>
      </div>
    </section>
  );
}