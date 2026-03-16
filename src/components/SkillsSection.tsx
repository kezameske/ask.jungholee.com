import { siteConfig } from "@/config/site";

export default function SkillsSection() {
  const categories = Object.entries(siteConfig.skills);

  return (
    <section id="skills" className="py-24 px-4 scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-light mb-16 tracking-tight"
          style={{ fontFamily: "var(--font-display), serif", textWrap: "balance" }}
        >
          Skills
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#c2956b] mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] text-[#a8a29e] border border-white/[0.06] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
