"use client"
import { Menu, X, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@appwrite.io/react";
import { useRouter } from "next/navigation";

export default function NavBarAuth() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { signOut } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        signOut.signOut({
            onSuccess: () => {
                router.push("/");
                router.refresh();
            },
        });
    };

    const links = [
        { href: "/auth", label: "Dashboard" },
        { href: "/pastors", label: "Pastors" },
        { href: "/events", label: "Events" },
        { href: "/church", label: "Churches" },
        { href: "/", label: "Web" },
    ];

    const linkClass =
        "text-[#4a3f2c] hover:text-[#b8860b] transition-colors";

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#e8dfca] bg-white/85 backdrop-blur-md shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex flex-shrink-0 items-center gap-2">
                            <LayoutDashboard size={20} className="text-[#b8860b]" />
                            <h1 className="text-xl font-serif font-semibold text-[#33281a]">
                                GOM <span className="text-[#b8860b]">Admin</span>
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {links.map((link) => (
                                <a key={link.href} href={link.href} className={linkClass}>
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={handleLogout}
                            className="hidden sm:block px-6 py-2 rounded-full bg-gradient-to-r from-[#b8860b] to-[#c9a227] text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            Logout
                        </button>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-[#4a3f2c] hover:text-[#b8860b]"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-[#e8dfca] bg-white/95">
                        <div className="px-4 pt-2 pb-4 space-y-1">
                            {links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-3 py-2 rounded-lg text-[#4a3f2c] hover:bg-[#f4ecdf]"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="w-full mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#b8860b] to-[#c9a227] text-white font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}