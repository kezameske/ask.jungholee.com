"use client";

import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import TrackableLink from "@/components/TrackableLink";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-light mb-16 tracking-tight"
          style={{ fontFamily: "var(--font-display), serif", textWrap: "balance" }}
        >
          Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {siteConfig.projects.map((project, i) => {
            const isChatProject = project.url === "https://ask.jungholee.com";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className={`group glass rounded-2xl p-6 md:p-8 h-full flex flex-col transition-colors ${isChatProject ? "border-[#c2956b]/15 hover:border-[#c2956b]/30 bg-[#c2956b]/[0.02]" : "hover:border-[#c2956b]/20"}`}>
                  <div className="mb-4">
                    {isChatProject ? (
                      <>
                        <a
                          href="#chat"
                          className="inline-flex items-center gap-2 text-xl font-semibold text-[#c2956b] hover:text-[#d4ad82] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2956b] rounded"
                        >
                          <MessageSquare className="w-5 h-5" aria-hidden="true" />
                          {project.title}
                        </a>
                        <p className="text-xs text-[#c2956b]/50 mt-1 font-medium tracking-wide">
                          {new URL(project.url).hostname}
                        </p>
                      </>
                    ) : (
                      <>
                        <TrackableLink
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          eventName="project_clicked"
                          eventProps={{ project: project.title }}
                          className="inline-flex items-center gap-2 text-xl font-semibold text-white hover:text-[#c2956b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2956b] rounded"
                        >
                          {project.title}
                          <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-0.5 translate-x-[-2px] group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" aria-hidden="true" />
                        </TrackableLink>
                        <p className="text-xs text-[#78716c] mt-1 font-medium tracking-wide">
                          {new URL(project.url).hostname}
                        </p>
                      </>
                    )}
                  </div>

                  <p className="text-sm text-[#a8a29e] leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="tag-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
