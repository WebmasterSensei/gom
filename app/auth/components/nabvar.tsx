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
        // { href: "/", label: "Web" },
    ];

    const linkClass =
        "text-cream/75 hover:text-gold transition-colors";

    return (
        <>
            <nav className="glass-nav fixed top-0 left-0 right-0 z-50 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.6)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex flex-shrink-0 items-center gap-2">
                            <LayoutDashboard size={20} className="text-gold" />
                            <h1 className="text-xl font-serif font-semibold text-cream">
                                GOM <span className="text-gold">Admin</span>
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
                            className="btn-gold hidden sm:block px-6 py-2 text-sm shadow-[0_14px_30px_-10px_rgba(184,134,11,0.6)]"
                        >
                            Logout
                        </button>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-cream hover:text-gold"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="glass-nav md:hidden border-t border-white/10">
                        <div className="px-4 pt-2 pb-4 space-y-1">
                            {links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-3 py-2 rounded-lg text-cream/75 hover:text-gold hover:bg-white/[0.06]"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="btn-gold w-full mt-2 px-6 py-2 text-sm"
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