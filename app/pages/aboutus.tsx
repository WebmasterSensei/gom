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
    <section id="aboutus" ref={root} className="overflow-hidden bg-cream py-24 sm:py-32">
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
            <div className="about-img-frame absolute -bottom-5 -left-5 -z-10 h-40 w-40 rounded-2xl border-2 border-gold/40"></div>
            <div className="about-badge absolute -right-4 top-8 rounded-2xl border border-sand bg-white/95 px-5 py-4 text-center shadow-xl backdrop-blur">
              <p className="font-serif text-3xl font-semibold text-gold-deep">Great</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-warm">
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
            <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
              At God&apos;s Oracle Ministries, we gather to lift the name of
              Jesus, to disciple believers, and to reach our community with the
              transforming love of Christ. Our doors are open to everyone —
              the searching, the broken, and the rejoicing.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-warm">
              Through heartfelt worship, teaching from the Word, and service to
              the world around us, we walk hand in hand toward greater faith
              and deeper fellowship.
            </p>

            {/* Pillars */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-sand bg-white p-4">
                <BookOpen className="mt-0.5 shrink-0 text-gold-deep" size={22} />
                <div>
                  <h3 className="font-semibold text-ink">The Word</h3>
                  <p className="text-sm text-muted-warm">
                    Grounded in Scripture, taught without compromise.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-sand bg-white p-4">
                <Users className="mt-0.5 shrink-0 text-gold-deep" size={22} />
                <div>
                  <h3 className="font-semibold text-ink">Fellowship</h3>
                  <p className="text-sm text-muted-warm">
                    A family where no one walks alone.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-deep to-gold px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-gold/30 transition hover:scale-105"
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
              className="rounded-2xl border border-sand bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p
                className="stat-num font-serif text-4xl font-semibold text-gold-deep sm:text-5xl"
                data-target={s.target}
                data-suffix={s.suffix}
              >
                0{s.suffix}
              </p>
              <p className="mt-2 text-sm font-medium text-ink-soft">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}