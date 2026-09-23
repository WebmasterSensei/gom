"use client";

import { HeartHandshake, BookOpen, Users } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import SectionHeading from "./partials/section-heading";

const stats = [
  { target: 5, suffix: "+", label: "Years of Ministry" },
  { target: 1200, suffix: "+", label: "Souls Reached" },
  { target: 15, suffix: "+", label: "Weekly Studies" },
  { target: 30, suffix: "+", label: "Service Programs" },
];

export default function AboutUs() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });

      tl.fromTo(
        ".about-img",
        { opacity: 0, x: -60, rotate: -3 },
        { opacity: 1, x: 0, rotate: 0, duration: 1.1 }
      )
        .fromTo(
          ".about-img-frame",
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.9, ease: "power2.inOut" },
          "-=0.9"
        )
        .fromTo(
          ".about-body",
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          ".about-badge",
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)" },
          "-=0.4"
        );

      // Animated counters
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.target);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + (el.dataset.suffix || "");
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="aboutus" ref={root} className="overflow-hidden bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/bible.jpg"
                alt="Gathered around the Word of God"
                width={800}
                height={1000}
                className="about-img h-[420px] w-full object-cover sm:h-[520px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent"></div>
            </div>
            <div className="about-img-frame absolute -bottom-5 -left-5 -z-10 h-40 w-40 rounded-2xl border-2 border-gold/40 bg-white/[0.04] backdrop-blur-md"></div>
            <div className="about-badge glass-chip absolute -right-4 top-8 rounded-2xl px-5 py-4 text-center shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)]">
              <p className="font-serif text-3xl font-semibold text-gold">Great</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/60">
                Commission · Matt 28:19
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="about-body">
            <SectionHeading
              align="left"
              overline="About the Ministry"
              title="A House of Prayer for All Nations"
              className="mx-0 max-w-none"
            />
            <p className="mt-6 text-base leading-relaxed text-cream/85 sm:text-lg">
              At God&apos;s Oracle Ministries, we gather to lift the name of
              Jesus, to disciple believers, and to reach our community with the
              transforming love of Christ. Our doors are open to everyone —
              the searching, the broken, and the rejoicing.
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream/60">
              Through heartfelt worship, teaching from the Word, and service to
              the world around us, we walk hand in hand toward greater faith
              and deeper fellowship.
            </p>

            {/* Pillars */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="glass flex items-start gap-3 p-4">
                <BookOpen className="mt-0.5 shrink-0 text-gold" size={22} />
                <div>
                  <h3 className="font-semibold text-cream">The Word</h3>
                  <p className="text-sm text-cream/60">
                    Grounded in Scripture, taught without compromise.
                  </p>
                </div>
              </div>
              <div className="glass flex items-start gap-3 p-4">
                <Users className="mt-0.5 shrink-0 text-gold" size={22} />
                <div>
                  <h3 className="font-semibold text-cream">Fellowship</h3>
                  <p className="text-sm text-cream/60">
                    A family where no one walks alone.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="btn-gold inline-flex px-6 py-3 text-sm shadow-[0_18px_36px_-14px_rgba(184,134,11,0.7)]"
              >
                <HeartHandshake size={17} />
                Join Our Family
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass-panel p-6 text-center transition hover:-translate-y-1 hover:shadow-[0_34px_70px_-24px_rgba(0,0,0,0.65)]"
            >
              <p
                className="stat-num font-serif text-4xl font-semibold text-gold sm:text-5xl"
                data-target={s.target}
                data-suffix={s.suffix}
              >
                0{s.suffix}
              </p>
              <p className="mt-2 text-sm font-medium text-cream/75">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}