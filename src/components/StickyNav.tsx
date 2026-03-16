"use client";

import { useState, useEffect } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Chat", href: "#chat" },
  { label: "Skills", href: "#skills" },
];

export default function StickyNav() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled
          ? "bg-[#0c0a09]/80 backdrop-blur-xl border-b border-[#c2956b]/8"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <a
          href="#"
          className="text-sm font-semibold tracking-wide text-white/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2956b] rounded"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          JL
        </a>

        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2956b] ${
                activeSection === item.href.slice(1)
                  ? "text-[#c2956b] bg-[#c2956b]/10"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
