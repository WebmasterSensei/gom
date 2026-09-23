"use client";

import {
  Users,
  CalendarHeart,
  Church as ChurchIcon,
  MessageSquareHeart,
  TrendingUp,
  ArrowUpRight,
  HeartHandshake,
  BookOpen,
} from "lucide-react";

const stats = [
  {
    name: "Congregation",
    value: "1,248",
    change: "+4.2%",
    icon: Users,
  },
  {
    name: "Services Held",
    value: "36",
    change: "+9.1%",
    icon: CalendarHeart,
  },
  {
    name: "Active Churches",
    value: "7",
    change: "+2.4%",
    icon: ChurchIcon,
  },
  {
    name: "Prayer Requests",
    value: "183",
    change: "+12.8%",
    icon: MessageSquareHeart,
  },
];

const manageLinks = [
  { href: "/events", label: "Manage Events", desc: "Add & review services", icon: CalendarHeart },
  { href: "/pastors", label: "Manage Pastors", desc: "Shepherd profiles", icon: BookOpen },
  { href: "/church", label: "Manage Churches", desc: "Locations & maps", icon: ChurchIcon },
  { href: "/auth", label: "Overview", desc: "Back to dashboard", icon: TrendingUp },
];

const announcements = [
  { title: "Sunday Worship Service", desc: "Join us this Sunday, 10:00 AM at the GOM Sanctuary.", time: "2d ago" },
  { title: "Midweek Bible Study", desc: "Wednesdays at 6:30 PM — the Book of Romans.", time: "4d ago" },
  { title: "Prayer & Fasting", desc: "Corporate prayer every Friday, 6:00 AM.", time: "1w ago" },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen px-4 pb-12 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-3xl font-semibold text-cream sm:text-4xl">
            Dashboard Overview
          </h1>
          <div className="h-px w-16 bg-gradient-to-r from-gold to-transparent"></div>
          <p className="text-sm text-cream/60">
            Welcome back, steward. Here&apos;s what&apos;s happening across the
            ministry.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="glass-panel p-6 transition hover:-translate-y-1 hover:shadow-[0_34px_70px_-24px_rgba(0,0,0,0.65)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <stat.icon size={22} />
                </span>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-200">
                  <ArrowUpRight size={12} />
                  {stat.change}
                </span>
              </div>
              <p className="mt-4 font-serif text-3xl font-semibold text-cream">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-cream/60">{stat.name}</p>
            </div>
          ))}
        </div>

        {/* Manage grid */}
        <h2 className="mt-12 font-serif text-2xl font-semibold text-cream">
          Ministry Management
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {manageLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group glass-panel p-6 transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_34px_70px_-24px_rgba(0,0,0,0.65)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold-deep to-gold text-white shadow-md">
                <link.icon size={22} />
              </span>
              <h3 className="mt-4 font-semibold text-cream">{link.label}</h3>
              <p className="mt-1 text-sm text-cream/60">{link.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold opacity-0 transition group-hover:opacity-100">
                Open <ArrowUpRight size={14} />
              </span>
            </a>
          ))}
        </div>

        {/* Announcements */}
        <div className="mt-12 glass-panel p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <HeartHandshake className="text-gold" size={22} />
            <h2 className="font-serif text-2xl font-semibold text-cream">
              Ministry Notes
            </h2>
          </div>
          <div className="mt-6 divide-y divide-white/10">
            {announcements.map((item) => (
              <div key={item.title} className="flex items-start justify-between gap-4 py-4">
                <div>
                  <h3 className="font-medium text-cream">{item.title}</h3>
                  <p className="mt-1 text-sm text-cream/60">{item.desc}</p>
                </div>
                <span className="shrink-0 text-xs font-medium text-cream/50">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}