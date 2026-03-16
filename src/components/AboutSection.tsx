import { siteConfig } from "@/config/site";
import { MapPin, Mail, GraduationCap, Globe } from "lucide-react";
import FunFactsTicker from "@/components/FunFactsTicker";

interface AboutSectionProps {
  funFacts?: string[];
}

export default function AboutSection({ funFacts }: AboutSectionProps) {
  const { about, education, email } = siteConfig;
  const facts = funFacts && funFacts.length > 0 ? funFacts : siteConfig.funFacts;

  return (
    <section id="about" className="py-24 px-4 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-light mb-16 tracking-tight"
          style={{ fontFamily: "var(--font-display), serif", textWrap: "balance" }}
        >
          About
        </h2>

        <div className="grid md:grid-cols-[2fr_1fr] gap-12">
          {/* Bio */}
          <div>
            <p className="text-lg md:text-xl leading-relaxed text-[#a8a29e]">
              {about.summary}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#c2956b] mt-1 shrink-0" aria-hidden="true" />
              <span className="text-sm text-[#a8a29e]">{about.location}</span>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#c2956b] mt-1 shrink-0" aria-hidden="true" />
              <a
                href={`mailto:${email}`}
                className="text-sm text-[#a8a29e] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2956b] rounded"
              >
                {email}
              </a>
            </div>

            <div className="flex items-start gap-3">
              <GraduationCap className="w-4 h-4 text-[#c2956b] mt-1 shrink-0" aria-hidden="true" />
              <div className="text-sm text-[#a8a29e]">
                <p className="font-medium text-white/80">{education.degree}</p>
                <p>{education.school}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="w-4 h-4 text-[#c2956b] mt-1 shrink-0" aria-hidden="true" />
              <div className="flex flex-wrap gap-2">
                {about.languages.map((lang) => (
                  <span key={lang.name} className="tag-pill">
                    {lang.name} — {lang.level}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mt-16">
          <h3
            className="text-2xl md:text-3xl font-light mb-8 tracking-tight text-center"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Fun Facts
          </h3>
          <FunFactsTicker facts={facts} />
        </div>
      </div>
    </section>
  );
}
