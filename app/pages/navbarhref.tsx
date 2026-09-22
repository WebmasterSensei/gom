"use client";

import { Menu, X, Church } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#hero", label: "Home" },
  { href: "/#verse", label: "Verse" },
  { href: "/#aboutus", label: "About" },
  { href: "/#events", label: "Events" },
  { href: "/#upcoming", label: "Upcoming" },
  { href: "/#pastors", label: "Pastors" },
  { href: "/#churches", label: "Churches" },
  { href: "/#contact", label: "Contact" },
];

export default function NavBarLink() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      if (y > lastY.current && y > 180) {
        gsap.to(navRef.current, { yPercent: -100, duration: 0.35, ease: "power2.out" });
      } else {
        gsap.to(navRef.current, { yPercent: 0, duration: 0.35, ease: "power2.out" });
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b border-sand bg-cream/90 backdrop-blur-md transition-shadow duration-300",
        scrolled ? "shadow-[0_10px_40px_-15px_rgba(99,70,20,0.25)]" : "shadow-none"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex shrink-0 items-center gap-2.5">
            <span className="relative">
              <Image
                src="/images/gomlogo.png"
                alt="God's Oracle Ministries logo"
                width={36}
                height={36}
                className="rounded-full border border-[#d8c48a] object-cover"
              />
              <span className="absolute -inset-1 -z-10 rounded-full bg-gold/20 blur-sm"></span>
            </span>
            <span className="hidden flex-col sm:flex">
              <span className="font-serif text-lg font-semibold leading-none text-ink">
                God&apos;s Oracle
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold-deep">
                Ministries
              </span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-gold-deep"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/donate"
              className="rounded-full bg-gradient-to-r from-gold-deep to-gold px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:scale-105"
            >
              Donate
            </a>
            {/* <a
              href="#contact"
              className="rounded-full border border-sand bg-white px-5 py-2 text-sm font-semibold text-ink transition hover:border-gold hover:text-gold-deep"
            >
              Get in touch
            </a> */}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-ink hover:text-gold-deep"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-sand bg-cream/95 lg:hidden">
          <div className="space-y-1 px-4 pb-5 pt-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-[15px] font-medium text-ink-soft transition hover:bg-cream-dark"
              >
                <Church size={16} className="text-gold-deep" />
                {link.label}
              </a>
            ))}
            <a
              href="#donate"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 block rounded-full bg-gradient-to-r from-gold-deep to-gold px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Donate
            </a>
            {/* <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 block rounded-full border border-sand bg-white px-5 py-2.5 text-center text-sm font-semibold text-ink"
            >
              Get in touch
            </a> */}
          </div>
        </div>
      )}
    </nav>
  );
}