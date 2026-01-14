"use client";

import dynamic from "next/dynamic";
import { Bot, Sparkles, MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/site";

// Use dynamic import with ssr: false to prevent Vue/n8n-chat from executing on the server
const N8nChat = dynamic(() => import("./N8nChatWrapper"), {
    ssr: false,
    loading: () => <div className="flex-1 flex items-center justify-center text-muted-foreground animate-pulse">Initializing AI Assistant...</div>
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
                        I built this RAG-style AI assistant using <strong>n8n</strong> and <strong>GPT-4</strong> to provide instant answers about my career, skills, and projects.
                    </p>
                </div>

                <div className="grid lg:grid-cols-[1fr_350px] gap-8">
                    <div className="glass rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[650px] border border-white/10 relative">
                        {/* Custom Header to match the premium theme */}
                        <div className="p-5 border-b border-white/10 bg-white/5 flex items-center justify-between z-10 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center shadow-lg shadow-indigo-600/20">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <span className="font-bold text-lg">Jungho's Assistant</span>
                                    <div className="flex items-center gap-1.5 text-xs text-green-500 font-medium">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        Ready to answer any question
                                    </div>
                                </div>
                            </div>
                            <Sparkles className="w-5 h-5 text-indigo-400" />
                        </div>

                        <div className="flex-1 overflow-hidden relative">
                            <N8nChat />
                        </div>

                        <div className="p-3 bg-white/5 border-t border-white/10 glass">
                            <p className="text-[11px] text-center text-muted-foreground font-medium uppercase tracking-wider">
                                Powered by n8n + OpenAI + Vector Embeddings
                            </p>
                        </div>
                    </div>

                    {/* Suggestions Sidebar */}
                    <div className="space-y-6">
                        <div className="glass p-6 rounded-3xl border border-white/10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-indigo-400" />
                                Try asking...
                            </h3>
                            <div className="grid gap-3">
                                {siteConfig.starterChips.map((chip, i) => (
                                    <div
                                        key={i}
                                        className="text-sm p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all text-muted-foreground hover:text-white cursor-help leading-snug"
                                    >
                                        "{chip}"
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass p-6 rounded-3xl border border-indigo-500/20 bg-indigo-500/5">
                            <h4 className="font-bold mb-2 text-indigo-400 uppercase text-xs tracking-widest">Why I built this</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Recruiter time is valuable. This tool allows you to instantly verify my fit for a role without waiting for a screening call.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .n8n-chat-container {
                  --n8n-chat-primary-color: #6366f1;
                  --n8n-chat-background-color: transparent;
                  height: 100%;
                }
                .n8n-chat-widget {
                  height: 100% !important;
                  width: 100% !important;
                  position: static !important;
                  box-shadow: none !important;
                  border: none !important;
                  font-family: inherit !important;
                  background: transparent !important;
                }
                .n8n-chat-widget-window {
                  height: 100% !important;
                  width: 100% !important;
                  max-height: none !important;
                  position: static !important;
                  background: transparent !important;
                }
                .dark .n8n-chat-widget-message-list {
                  background-color: transparent !important;
                  padding-top: 20px !important;
                }
                .dark .n8n-chat-widget-input-container {
                  background-color: rgba(15, 23, 42, 0.8) !important;
                  backdrop-filter: blur(8px);
                  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
                  padding: 16px !important;
                }
                .dark .n8n-chat-widget-input {
                  color: white !important;
                  background: rgba(30, 41, 59, 0.5) !important;
                  border: 1px solid rgba(255, 255, 255, 0.1) !important;
                  border-radius: 12px !important;
                  padding: 12px 16px !important;
                }
                .n8n-chat-widget-header {
                   display: none !important;
                }
                /* Customize message bubbles for n8n-chat */
                .n8n-chat-widget-message {
                    border-radius: 16px !important;
                    font-size: 15px !important;
                    line-height: 1.6 !important;
                }
                .n8n-chat-widget-message-user {
                    background: #4f46e5 !important;
                    border-bottom-right-radius: 4px !important;
                }
                .n8n-chat-widget-message-bot {
                    background: rgba(30, 41, 59, 0.8) !important;
                    border-bottom-left-radius: 4px !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                }
            `}</style>
        </section>
    );
}
