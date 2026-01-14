import { siteConfig } from "@/config/site";
import { Download, MessageSquare } from "lucide-react";
import Chatbot from "@/components/Chatbot";
import FunFactsTicker from "@/components/FunFactsTicker";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Hi, I'm <span className="text-gradient">{siteConfig.name}</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-8 max-w-3xl mx-auto leading-relaxed">
            {siteConfig.headline}
          </p>

          <p className="text-lg md:text-xl text-muted-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            {siteConfig.pitch}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#chat"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/20"
            >
              <MessageSquare className="w-5 h-5" />
              Ask my AI Assistant
            </a>
            <a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass hover:bg-white/10 font-semibold transition-all hover:scale-105 active:scale-95 border border-white/10"
            >
              <Download className="w-5 h-5" />
              Resume (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* Fun Facts Ticker */}
      <FunFactsTicker facts={siteConfig.funFacts} />

      {/* Chatbot Section */}
      <Chatbot />

      {/* Footer */}
      <footer className="py-20 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">{siteConfig.name}</h3>

          </div>

          <div className="flex gap-6">
            <a href={`mailto:${siteConfig.email}`} className="text-muted-foreground hover:text-white transition-colors">Email</a>
            <a href={siteConfig.links.linkedin} target="_blank" className="text-muted-foreground hover:text-white transition-colors">LinkedIn</a>
            <a href={siteConfig.links.github} target="_blank" className="text-muted-foreground hover:text-white transition-colors">GitHub</a>
          </div>


        </div>
      </footer>
    </main>
  );
}
