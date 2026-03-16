import { siteConfig } from "@/config/site";
import { Download, MessageSquare, ArrowRight, Mail } from "lucide-react";
import Chatbot from "@/components/Chatbot";
import StickyNav from "@/components/StickyNav";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import SectionTracker from "@/components/SectionTracker";
import TrackableLink from "@/components/TrackableLink";
import { getSiteContent } from "@/lib/airtable";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main className="min-h-screen selection:bg-[#c2956b]/30">
      <StickyNav />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden min-h-[60vh] flex items-center">
        {/* Subtle warm glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#c2956b]/[0.03] blur-[150px] rounded-full -z-10" />

        <div className="max-w-5xl mx-auto w-full">
          <p className="text-xs uppercase tracking-[0.3em] text-[#c2956b] font-medium mb-6">
            {content.headline || siteConfig.headline}
          </p>

          <h1
            className="text-4xl md:text-7xl font-light tracking-tight mb-4 leading-[0.95]"
            style={{ fontFamily: "var(--font-display), serif", textWrap: "balance" }}
          >
            {siteConfig.heroHeadline}
          </h1>

          <p className="text-lg md:text-2xl text-[#a8a29e]/80 mb-12"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            {siteConfig.name}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#chat"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#c2956b] hover:bg-[#d4ad82] text-[#0c0a09] font-semibold text-sm transition-colors hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2956b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0a09]"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              Ask my AI Assistant
            </a>
            <TrackableLink
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              eventName="resume_click"
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-[#c2956b]/30 text-white/70 hover:text-white font-medium text-sm transition-colors hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2956b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0a09]"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Resume (PDF)
            </TrackableLink>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* About (now includes Fun Facts) */}
      <SectionTracker id="about">
        <AboutSection funFacts={siteConfig.funFacts} />
      </SectionTracker>

      <div className="section-divider" />

      {/* Experience */}
      <SectionTracker id="experience">
        <ExperienceSection />
      </SectionTracker>

      <div className="section-divider" />

      {/* Projects */}
      <SectionTracker id="projects">
        <ProjectsSection />
      </SectionTracker>

      <div className="section-divider" />

      {/* Chatbot */}
      <SectionTracker id="chat">
        <Chatbot
          askHeadline={content.askHeadline}
          starterChips={siteConfig.starterChips}
        />
      </SectionTracker>

      <div className="section-divider" />

      {/* Skills */}
      <SectionTracker id="skills">
        <SkillsSection />
      </SectionTracker>

      <div className="section-divider" />

      {/* Footer CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2
            className="text-3xl md:text-5xl font-light tracking-tight"
            style={{ fontFamily: "var(--font-display), serif", textWrap: "balance" }}
          >
            {siteConfig.footerCta.headline}
          </h2>
          <p className="text-[#a8a29e] text-lg leading-relaxed">
            {siteConfig.footerCta.subtext}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <TrackableLink
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              eventName="cta_click"
              eventProps={{ target: "linkedin" }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#c2956b] hover:bg-[#d4ad82] text-[#0c0a09] font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2956b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0a09]"
            >
              LinkedIn
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </TrackableLink>
            <TrackableLink
              href={`mailto:${siteConfig.email}`}
              eventName="cta_click"
              eventProps={{ target: "email" }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-[#c2956b]/30 text-white/70 hover:text-white font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2956b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0a09]"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Email Me
            </TrackableLink>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-sm text-[#78716c]">
            © {new Date().getFullYear()} {siteConfig.name}
          </span>

          <div className="flex gap-6">
            <a href={`mailto:${siteConfig.email}`} className="text-sm text-[#78716c] hover:text-[#c2956b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2956b] rounded">
              Email
            </a>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-[#78716c] hover:text-[#c2956b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2956b] rounded">
              LinkedIn
            </a>
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="text-sm text-[#78716c] hover:text-[#c2956b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2956b] rounded">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
