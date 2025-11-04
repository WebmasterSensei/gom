"use client"
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-700 to-yellow-600 bg-clip-text text-transparent">
               <img src="/images/gomlogo.png" className="h-15" alt="" />
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              
              <a
                href="#hero"
                className="text-white dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </a>
              <a
                href="#aboutus"
                className="text-white dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </a>
              <a
                href="#pastors"
                className="text-white dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Pastors
              </a>
               <a
                href="#events"
                className="text-white dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Events
              </a>
               <a
                href="#contactus"
                className="text-white dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="px-6 py-2 bg-gradient-to-r from-orange-700 to-yellow-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-zinc-200 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
            <div className="px-4 pt-2 pb-4 space-y-2 text-center">
                <a
                href="#hero"
                className="block px-3 py-2 text-white dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg"
              >
                Home
              </a>
             
              <a
                href="#aboutus"
                className="block px-3 py-2 text-white dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg"
              >
                About
              </a>

               <a
                href="#events"
                className="block px-3 py-2 text-white dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg"
              >
                Events
              </a>

               <a
                href="#pastors"
                className="block px-3 py-2 text-white dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg"
              >
                Pastors
              </a>
             
             
              <a
                href="#contactus"
                className="block px-3 py-2 text-white dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg"
              >
                Contact
              </a>
              <button className="w-full mt-2 px-6 py-2 bg-gradient-to-r from-orange-700 to-yellow-600 text-white rounded-full hover:shadow-lg transition-all">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
