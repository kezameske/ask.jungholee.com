"use client";

import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-4 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-light mb-16 tracking-tight"
          style={{ fontFamily: "var(--font-display), serif", textWrap: "balance" }}
        >
          Experience
        </h2>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#c2956b]/30 via-[#c2956b]/10 to-transparent" />

          <div className="space-y-12">
            {siteConfig.experience.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-8 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#c2956b]/60 border-2 border-[#0c0a09]" />

                <div className="glass rounded-2xl p-6 md:p-8 hover:border-[#c2956b]/20 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-1">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {role.title}
                      </h3>
                      <p className="text-[#c2956b] text-sm font-medium">
                        {role.company}
                      </p>
                    </div>
                    <span className="text-xs text-[#78716c] font-medium whitespace-nowrap">
                      {role.period}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {role.highlights.map((item, j) => (
                      <li
                        key={j}
                        className="text-sm text-[#a8a29e] leading-relaxed flex gap-2"
                      >
                        <span className="text-[#c2956b]/40 mt-1.5 shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
