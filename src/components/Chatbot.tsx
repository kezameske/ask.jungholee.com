"use client";

import dynamic from "next/dynamic";
import { siteConfig } from "@/config/site";

const ChatInterface = dynamic(() => import("./ChatInterface"), {
    ssr: false,
    loading: () => <div className="h-[650px] flex items-center justify-center text-[#78716c] animate-pulse glass rounded-2xl border border-[#c2956b]/8">Loading AI Interface...</div>
});

interface ChatbotProps {
    askHeadline?: string;
    starterChips?: string[];
}

export default function Chatbot({ askHeadline, starterChips }: ChatbotProps) {
    return (
        <section id="chat" className="py-24 px-4 scroll-mt-16">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2
                        className="text-3xl md:text-5xl font-light mb-6 tracking-tight"
                        style={{ fontFamily: "var(--font-display), serif", textWrap: "balance" }}
                    >
                        Don&apos;t read a PDF. <span className="text-gradient">Just ask.</span>
                    </h2>
                    <p className="text-lg text-[#a8a29e] max-w-2xl mx-auto leading-relaxed">
                        {askHeadline || siteConfig.askHeadline}
                    </p>
                </div>

                <ChatInterface starterChips={starterChips} />
            </div>
        </section>
    );
}
