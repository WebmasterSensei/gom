"use client";

import { CalendarHeart, Sparkles, ChevronDown } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          delay: 0.15,
        });

        tl.fromTo(
          ".hero-badge",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7 }
        )
          .fromTo(
            ".hero-logo",
            { opacity: 0, scale: 0.7, rotate: -8 },
            { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.6)" },
            "-=0.35"
          )
          .fromTo(
            ".hero-title-line",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
            "-=0.5"
          )
          .fromTo(
            ".hero-sub",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.55"
          )
          .fromTo(
            ".hero-cta",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
            "-=0.55"
          )
          .fromTo(
            ".hero-cue",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.4"
          );

        // Gentle parallax on ornaments
        gsap.to(".hero-orb-a", {
          yPercent: 22,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(".hero-orb-b", {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }, root);
      return () => ctx.revert();
    },
    { scope: root }
  );

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-orb-a absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-gold/15 blur-3xl"></div>
        <div className="hero-orb-b absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-burgundy/10 blur-3xl"></div>
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent"></div>

        {/* Subtle arched grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 100%, transparent 58%, rgba(201,162,39,0.10) 59%, rgba(201,162,39,0.10) 59.5%, transparent 60%), radial-gradient(circle at 50% 100%, transparent 66%, rgba(125,46,61,0.08) 67%, rgba(125,46,61,0.08) 67.5%, transparent 68%)",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-28 text-center sm:px-6">
        <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep backdrop-blur">
          <Sparkles size={13} />
          A Ministry of Faith &amp; Fellowship
        </span>

        <div className="hero-logo mx-auto mt-8 w-fit">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold/40 via-transparent to-burgundy/25 blur-md"></div>
            <Image
              src="/images/gomlogo.png"
              alt="God's Oracle Ministries"
              width={120}
              height={120}
              className="relative rounded-full border-2 border-gold/60 bg-white object-cover shadow-xl"
              priority
            />
          </div>
        </div>

        <h1 className="mt-8 font-serif font-semibold leading-[1.05] text-ink">
          <span className="hero-title-line block text-5xl sm:text-7xl">
            God&apos;s Oracle
          </span>
          <span className="hero-title-line block text-3xl italic text-gold-deep sm:text-5xl">
            Ministries
          </span>
        </h1>

        <p className="hero-sub mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-warm sm:text-lg">
          A sanctuary of worship where every soul is welcomed, every heart is
          restored, and the living Word is proclaimed — glorifying God and
          serving our community with love.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#events"
            className="hero-cta group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-deep to-gold px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gold/30 transition hover:scale-105"
          >
            <CalendarHeart size={17} />
            Explore Services
          </a>
          <a
            href="#aboutus"
            className="hero-cta inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/80 px-8 py-3.5 text-sm font-semibold text-ink backdrop-blur transition hover:border-gold hover:text-gold-deep"
          >
            Discover Us
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-cue absolute bottom-8 left-1/2 -translate-x-1/2 text-gold-deep">
        <a href="#verse" aria-label="Scroll down" className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">
            Scroll
          </span>
          <ChevronDown size={18} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}