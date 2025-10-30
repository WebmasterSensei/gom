"use client"
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function NavBarAuth() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <>
            <nav className="fixed  top-0 left-0 right-0 z-50 backdrop-blur-md shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-700 to-yellow-600 bg-clip-text text-transparent">
                                Dashboard
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">

                            <a
                                href="/auth"
                                className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Home
                            </a>
                            <a
                                href="/pastors"
                                className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Pastors
                            </a>
                            <a
                                href="/events"
                                className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Events
                            </a>
                            <a
                                href="#contactus"
                                className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Contact
                            </a>
                            <a
                                href="/"
                                className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Web
                            </a>
                        </div>

                        {/* CTA Button */}

                        <form className="hidden sm:block" action="/logout" method="post" >
                            <button
                                type="submit"
                                className="px-6 py-2 bg-gradient-to-r from-orange-700 to-yellow-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                Logout
                            </button>
                        </form>


                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
                        <div className="px-4 pt-2 pb-4 space-y-2">

                            <a
                                href="/auth"
                                className="block px-3 py-2 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg"
                            >
                                Home
                            </a>
                            <a
                                href="/pastors"
                                className="block px-3 py-2 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg"
                            >
                                Pastors
                            </a>
                            <a
                                href="/events"
                                className="block px-3 py-2 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg"
                            >
                                Events
                            </a>

                            <form className="w-full" action="/logout" method="post" >
                            <button
                                type="submit"
                                className="px-6 py-2 bg-gradient-to-r from-orange-700 to-yellow-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                Logout
                            </button>
                        </form>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}
