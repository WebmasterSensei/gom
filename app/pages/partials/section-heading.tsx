"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  overline,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.9 },
        scrollTrigger: {
          trigger: root.current,
          start: "top 82%",
        },
      });

      tl.fromTo(
        ".sh-over",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".sh-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "power2.inOut" },
          "<0.15"
        )
        .fromTo(
          ".sh-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0 },
          "-=0.6"
        )
        .fromTo(
          ".sh-sub",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0 },
          "-=0.5"
        );
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left ml-0",
        className
      )}
    >
      {overline && (
        <p className="sh-over mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
          {overline}
        </p>
      )}
      <h2 className="sh-title font-serif text-4xl font-semibold leading-tight text-cream sm:text-5xl">
        {title}
      </h2>
      <div
        className={cn(
          "sh-rule mt-5 h-px w-24 origin-left bg-gradient-to-r from-gold to-transparent",
          align === "center" && "origin-center mx-auto"
        )}
      ></div>
      {subtitle && (
        <p className="sh-sub mt-4 text-base leading-relaxed text-cream/60 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}