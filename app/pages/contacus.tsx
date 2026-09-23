"use client";

import { Mail, Phone, MapPin, Send, Church as ChurchIcon, CheckCircle2 } from "lucide-react";
import { Databases } from "appwrite";
import { useAppwrite } from "@appwrite.io/react";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ID } from "appwrite";
import { appwriteConfig } from "@/lib/appwrite";
import SectionHeading from "./partials/section-heading";

export default function ContactUs() {
  const { client } = useAppwrite();
  const databases = new Databases(client);
  const root = useRef<HTMLElement>(null);

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: root.current, start: "top 78%" },
        }
      );
    },
    { scope: root }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.contactCollectionId,
        ID.unique(),
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          createdAt: new Date().toISOString(),
        }
      );
      setStatus("done");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: unknown) {
      console.error("Failed to send message:", err);
      setStatus("error");
    }
  };

  const inputClass =
    "input-glass";

  return (
    <section id="contact" ref={root} className="bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Reach Out"
          title="We'd Love to Hear From You"
          subtitle="Send us a message — a member of our ministry team will get back to you."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Info */}
          <div className="contact-card space-y-5 lg:col-span-2">
            <div className="glass-panel p-6">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-deep to-gold text-white shadow-md">
                  <ChurchIcon size={20} />
                </span>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-cream">
                    God&apos;s Oracle Ministries
                  </h3>
                  <p className="text-xs text-cream/60">Office &amp; Sanctuary</p>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm">
                <p className="flex items-start gap-3 text-cream/80">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-gold" />
                  Worship in the heart of our community — reach us for service
                  times and directions.
                </p>
                <a
                  href="mailto:godoracleministries@gmail.com"
                  className="flex items-center gap-3 text-cream/80 transition hover:text-gold"
                >
                  <Mail size={17} className="shrink-0 text-gold" />
                  godoracleministries@gmail.com
                </a>
                <a
                  href="tel:+2348012345678"
                  className="flex items-center gap-3 text-cream/80 transition hover:text-gold"
                >
                  <Phone size={17} className="shrink-0 text-gold" />
                  +234 801 234 5678
                </a>
              </div>
            </div>

            <div className="glass-panel border-gold/30 p-6 text-cream">
              <p className="font-serif text-2xl font-medium italic leading-snug">
                “Come to me, all you who are weary and burdened, and I will give
                you rest.”
              </p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-gold">
                Matthew 11:28
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="contact-card glass-panel p-6 sm:p-8 lg:col-span-3"
          >
            {status === "done" && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-300/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                <CheckCircle2 size={18} className="shrink-0" />
                Thank you! Your message has been received — we&apos;ll be in touch.
              </div>
            )}
            {status === "error" && (
              <div className="mb-6 rounded-xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                Sorry, something went wrong. Please try again.
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-cream/85">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-cream/85">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-cream/85">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+234 ..."
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-cream/85">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we pray for you or help you?"
                  className={inputClass}
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-gold mt-6 w-full px-8 py-3.5 text-sm shadow-[0_20px_40px_-14px_rgba(184,134,11,0.7)] disabled:cursor-not-allowed"
            >
              <Send size={16} />
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}