import NavBar from "./pages/navbar";
import Hero from "./pages/hero";
import AboutUs from "./pages/aboutus";
import Events from "./pages/events";
import Pastors from "./pages/pastors";
import ContactUs from "./pages/contacus";
import Footer from "./pages/footer";
import UpcomingEvents from "./pages/upcommingevents";
import Church from "./pages/church";
import DailyVerse from "./pages/verse";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <NavBar />
      <Hero />
      <DailyVerse/>
      <AboutUs />
      <Events />
      <UpcomingEvents />
      <Pastors />
      <Church />
      <ContactUs />
      <Footer />
    </div>
  );
}