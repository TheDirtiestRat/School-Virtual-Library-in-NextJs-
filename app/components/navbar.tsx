"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const navItems = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Library", href: "/library" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="bg-blue-700 p-4 rounded-xl">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-white text-2xl font-bold">
                    ACLC Virtual Library
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-5">
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href} className="text-white hover:text-gray-300">
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button (Hamburger) */}
                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
                        {/* Icon for hamburger or close */}
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-2">
                    <div className="flex flex-col space-y-2">
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href} className="block text-white px-4 py-2 hover:bg-gray-700">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}