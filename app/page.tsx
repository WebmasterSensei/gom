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
import Church from "./pages/church";
import Head from "next/head";

export default function Home() {

  return (
    <>
      <Head>
        <title>Gods Oracle Ministries</title>
        <meta
          name="description"
          content="Gods Oracle Ministries Official Website, Feel Free to Explore and Connect with Us"
        />
        <meta
          name="keywords"
          content="goms, Gods Oracle Ministries, GOM Sytem, Goms, GOMS, godsoracle"
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
        {/* Navbar */}
        {/* <ParticlesComponent /> */}
        <NavBar />

        {/* Hero Section */}
        <Hero />
        <Verses />
        <Events />
        <UpcomingEvents />
        <AboutUs />
        <Pastors />
        {/* <ContactUs /> */}
        <Church />
        <Footer />
      </div>
    </>
  );
}