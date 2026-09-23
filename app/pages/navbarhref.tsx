"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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
  { href: "/#contact", label: "Contact" }
];

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#hero");
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    ready: false
  });

  const navRef = useRef<HTMLElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linkRowRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const lastY = useRef(0);
  const reducedMotion = usePrefersReducedMotion();

  // Hide-on-scroll nav + collapsing service-times ribbon
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      if (reducedMotion) {
        if (ribbonRef.current) {
          ribbonRef.current.style.height = y > 80 ? "0px" : "";
          ribbonRef.current.style.opacity = y > 80 ? "0" : "1";
        }
        if (navRef.current) navRef.current.style.transform = "translateY(0)";
        lastY.current = y;
        return;
      }

      gsap.to(ribbonRef.current, {
        height: y > 80 ? 0 : "auto",
        opacity: y > 80 ? 0 : 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true
      });

      if (y > lastY.current && y > 180) {
        gsap.to(navRef.current, {
          yPercent: -100,
          duration: 0.35,
          ease: "power2.out"
        });
      } else {
        gsap.to(navRef.current, {
          yPercent: 0,
          duration: 0.35,
          ease: "power2.out"
        });
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  // Track which section is in view so the nav can point at it
  // Track which section is in view so the nav can point at it
  useEffect(() => {
    const sections = links
      .map((link) => {
        const hash = link.href.split("#")[1];
        return hash ? document.getElementById(hash) : null;
      })
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (!visibleEntries.length) return;

        const mostVisible = visibleEntries.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        )[0];

        if (mostVisible?.target.id) {
          setActiveHref(`#${mostVisible.target.id}`);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Slide the underline beneath whichever link is active
  useEffect(() => {
    const measure = () => {
      const el = linkRefs.current[activeHref];
      const row = linkRowRef.current;
      if (!el || !row) return;
      const elRect = el.getBoundingClientRect();
      const rowRect = row.getBoundingClientRect();
      setIndicator({
        left: elRect.left - rowRect.left,
        width: elRect.width,
        ready: true
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeHref]);

  // Stagger the mobile drawer's links in on open
  useEffect(() => {
    if (!mobileMenuOpen || !menuRef.current || reducedMotion) return;
    const items = menuRef.current.querySelectorAll("[data-menu-item]");
    gsap.fromTo(
      items,
      { opacity: 0, y: -6 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, ease: "power2.out" }
    );
  }, [mobileMenuOpen, reducedMotion]);

  return (
    <div className="fixed left-0 right-0 top-0 z-50">
      {/* Service-times ribbon — collapses once the visitor starts scrolling */}
      <div
        ref={ribbonRef}
        className="overflow-hidden border-b border-white/5 bg-ink/80 text-cream backdrop-blur-xl"
      >
        <p className="mx-auto max-w-7xl px-4 py-1.5 text-center text-xs text-cream/90 sm:px-6 lg:px-8">
          Join us this Sunday at <span className="text-gold">9:00 AM</span> or{" "}
          <span className="text-gold">11:00 AM</span>.
        </p>
      </div>

      <nav
        ref={navRef}
        className={cn(
          "glass-nav transition-shadow duration-300",
          scrolled
            ? "shadow-[0_18px_50px_-20px_rgba(0,0,0,0.7)]"
            : "shadow-none"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              className="group flex shrink-0 items-center gap-2.5"
            >
              <span className="relative block">
                <Image
                  src="/images/gomlogo.png"
                  alt="God's Oracle Ministries logo"
                  width={36}
                  height={36}
                  className="rounded-full border border-gold/50 object-cover transition-transform duration-500 ease-out group-hover:rotate-[8deg]"
                />
                <span className="absolute -inset-1 -z-10 rounded-full bg-gold/30 blur-sm transition-opacity duration-500 group-hover:opacity-70" />
              </span>
              <span className="hidden flex-col sm:flex">
                <span className="font-serif text-lg font-semibold leading-none text-cream">
                  God&apos;s Oracle
                </span>
                <span className="text-[10px] font-medium text-gold">
                  Ministries
                </span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div
              ref={linkRowRef}
              className="relative hidden items-center gap-6 lg:flex"
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  ref={(el) => {
                    linkRefs.current[link.href] = el;
                  }}
                  aria-current={activeHref === link.href ? "page" : undefined}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    activeHref === link.href
                      ? "text-gold"
                      : "text-cream/75 hover:text-gold"
                  )}
                >
                  {link.label}
                </a>
              ))}

              {/* Sliding indicator tracks the active link */}
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -bottom-[9px] h-[2px] rounded-full bg-gold transition-all duration-300 ease-out",
                  indicator.ready ? "opacity-100" : "opacity-0"
                )}
                style={{ left: indicator.left, width: indicator.width }}
              />
            </div>

            <div className="hidden lg:block">
              <a
                href="/donate"
                className="btn-gold px-5 py-2 text-sm shadow-[0_14px_30px_-10px_rgba(184,134,11,0.6)]"
              >
                Donate
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="text-cream transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            ref={menuRef}
            className="glass-nav border-t-0 lg:hidden"
          >
            <div className="space-y-0.5 px-4 pb-5 pt-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-menu-item
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={activeHref === link.href ? "page" : undefined}
                  className={cn(
                    "block rounded-lg border-l-2 py-2.5 pl-3 text-[15px] font-medium transition-colors",
                    activeHref === link.href
                      ? "border-gold bg-white/10 text-gold"
                      : "border-transparent text-cream/75 hover:border-gold/40 hover:bg-white/[0.06] hover:text-gold"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/donate"
                data-menu-item
                onClick={() => setMobileMenuOpen(false)}
                className="btn-gold mt-3 block px-5 py-2.5 text-center text-sm"
              >
                Donate
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
