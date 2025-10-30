"use client"
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import NavBar from "./pages/navbar";
import Hero from "./pages/hero";
import { ParticlesComponent } from "./pages/partials/particles";
import AboutUs from "./pages/aboutus";
import Events from "./pages/events";
import Pastors from "./pages/pastors";
import ContactUs from "./pages/contacus";
import Footer from "./pages/footer";
import UpcomingEvents from "./pages/upcommingevents";
import Verses from "./pages/verse";

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-600 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
      {/* Navbar */}
      {/* <ParticlesComponent /> */}
      <NavBar />
     
      {/* Hero Section */}
      <Hero/>
      <Verses />
      <Events/>
      <UpcomingEvents />
      <AboutUs/>
      <Pastors />
      <ContactUs />
      <Footer />
    </div>
  );
}