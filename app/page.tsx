import NavBar from "./pages/navbar";
import Hero from "./pages/hero";
import AboutUs from "./pages/aboutus";
import Events from "./pages/events";
import Pastors from "./pages/pastors";
import ContactUs from "./pages/contacus";
import Footer from "./pages/footer";
import UpcomingEvents from "./pages/upcommingevents";
import Verses from "./pages/verse";
import Church from "./pages/church";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <NavBar />

      <Hero />
      <Verses />
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