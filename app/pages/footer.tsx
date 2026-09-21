"use client";

import { Church as ChurchIcon, Facebook, Instagram, Youtube, Heart } from "lucide-react";
import Image from "next/image";

const quickLinks = [
  { href: "#hero", label: "Home" },
  { href: "#aboutus", label: "About" },
  { href: "#events", label: "Recent Gatherings" },
  { href: "#upcoming", label: "Upcoming Services" },
  { href: "#pastors", label: "Our Pastors" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/images/gomlogo.png"
                alt="God's Oracle Ministries"
                width={48}
                height={48}
                className="rounded-full border border-gold/40 object-cover"
              />
              <div>
                <p className="font-serif text-2xl font-semibold leading-none">
                  God&apos;s Oracle
                </p>
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
                  Ministries
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-sand/70">
              A dwelling place for prayer, worship, and the teaching of God&apos;s
              Word — where lives are transformed and a community is built in
              love.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 transition hover:bg-gold hover:text-ink"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 transition hover:bg-gold hover:text-ink"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 transition hover:bg-gold hover:text-ink"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-gold">
              Explore
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-sand/80">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service times */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-gold">
              Service Times
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-sand/80">
              <li>
                <span className="block font-medium text-cream">Sunday Worship</span>
                <span className="text-sand/60">10:00 AM – 12:30 PM</span>
              </li>
              <li>
                <span className="block font-medium text-cream">Bible Study</span>
                <span className="text-sand/60">Wednesdays · 6:30 PM</span>
              </li>
              <li>
                <span className="block font-medium text-cream">Prayer Meeting</span>
                <span className="text-sand/60">Fridays · 6:00 AM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gold/15 pt-8 text-sm text-sand/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} God&apos;s Oracle Ministries. All rights
            reserved.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Built with <Heart size={14} className="text-burgundy" fill="currentColor" /> &
            guided by faith
            <ChurchIcon size={15} className="ml-1 text-gold" />
          </p>
        </div>
      </div>
    </footer>
  );
}