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
    "w-full rounded-xl border border-sand bg-white px-4 py-3 text-sm text-ink placeholder:text-muted-warm/60 outline-none transition focus:border-gold focus:ring-1 focus:ring-gold";

  return (
    <section id="contact" ref={root} className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Reach Out"
          title="We'd Love to Hear From You"
          subtitle="Send us a message — a member of our ministry team will get back to you."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Info */}
          <div className="contact-card space-y-5 lg:col-span-2">
            <div className="rounded-2xl border border-sand bg-white p-6">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-deep to-gold text-white shadow-md">
                  <ChurchIcon size={20} />
                </span>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-ink">
                    God&apos;s Oracle Ministries
                  </h3>
                  <p className="text-xs text-muted-warm">Office &amp; Sanctuary</p>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm">
                <p className="flex items-start gap-3 text-ink-soft">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-gold-deep" />
                  Worship in the heart of our community — reach us for service
                  times and directions.
                </p>
                <a
                  href="mailto:godoracleministries@gmail.com"
                  className="flex items-center gap-3 text-ink-soft transition hover:text-gold-deep"
                >
                  <Mail size={17} className="shrink-0 text-gold-deep" />
                  godoracleministries@gmail.com
                </a>
                <a
                  href="tel:+2348012345678"
                  className="flex items-center gap-3 text-ink-soft transition hover:text-gold-deep"
                >
                  <Phone size={17} className="shrink-0 text-gold-deep" />
                  +234 801 234 5678
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-[#3f3120] to-[#2a2115] p-6 text-cream">
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
            className="contact-card rounded-2xl border border-sand bg-white p-6 shadow-sm sm:p-8 lg:col-span-3"
          >
            {status === "done" && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                <CheckCircle2 size={18} className="shrink-0" />
                Thank you! Your message has been received — we&apos;ll be in touch.
              </div>
            )}
            {status === "error" && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                Sorry, something went wrong. Please try again.
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-ink-soft">
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
                <label className="mb-2 block text-sm font-medium text-ink-soft">
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
                <label className="mb-2 block text-sm font-medium text-ink-soft">
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
                <label className="mb-2 block text-sm font-medium text-ink-soft">
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
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-deep to-gold px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gold/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
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