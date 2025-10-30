import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Innovative Solutions",
      description:
        "Transform your business with cutting-edge technology and seamless integration.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop"
    },
    {
      title: "Global Reach",
      description:
        "Connect with millions of users worldwide on our reliable platform.",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=600&fit=crop"
    },
    {
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with 99.9% uptime guaranteed for your peace of mind.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  return (
    <>
      <div
        className="relative h-screen pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden"
        id="hero"
      >
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/268134/pexels-photo-268134.jpeg"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-9/80 dark:from-black/80 dark:via-black/80 dark:to-black/85"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2  dark:bg-blue-950 px-4 py-2 rounded-full mb-8">
              {/* <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                New features available now
              </span> */}
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white dark:text-white mb-6">
              God's Oracle
              <span className="block bg-gradient-to-r from-orange-700 via-yellow-700 to-purple-800 bg-clip-text text-transparent">
                Ministries
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-gray-300 dark:text-zinc-400 mb-10 max-w-3xl mx-auto">
              Encourages believers to be confident because the Lord is their
              helper
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a href="#events">
                <button className="group flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-700 to-yellow-600 text-white rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <span className="font-semibold">Events</span>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </a>
              <a href="#aboutus">
                <button className="px-8 py-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border-2 border-zinc-200 dark:border-zinc-800 rounded-full hover:border-blue-600 dark:hover:border-blue-400 transition-all duration-300">
                  About Us
                </button>
              </a>
            </div>

            {/* Stats */}
            <div className="mx-auto pt-8  border-zinc-200 dark:border-zinc-800"></div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-1/3 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </>
  );
}
