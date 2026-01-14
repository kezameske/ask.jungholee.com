"use client";

import dynamic from "next/dynamic";

const ChatInterface = dynamic(() => import("./ChatInterface"), {
    ssr: false,
    loading: () => <div className="h-[650px] flex items-center justify-center text-muted-foreground animate-pulse glass rounded-3xl border border-white/10">Loading AI Interface...</div>
});

export default function Chatbot() {
    return (
        <section id="chat" className="py-24 px-4 scroll-mt-20">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        Don't hunt through a PDF. <span className="text-gradient">Just ask.</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        I built this RAG-style AI assistant using <strong>n8n</strong> and <strong>Gemini 3</strong> to provide instant answers about my career, skills, and projects.
                    </p>
                </div>

                <ChatInterface />
            </div>
        </section>
    );
}
