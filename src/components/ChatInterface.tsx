"use client";

import { useState, useEffect, useRef } from "react";
import { createChat } from "@n8n/chat";
import "@n8n/chat/dist/style.css";
import { siteConfig } from "@/config/site";
import { Bot, Sparkles, MessageSquare, ArrowRight, User } from "lucide-react";

export default function ChatInterface({ starterChips }: { starterChips?: string[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const chatInstance = useRef<any>(null);
    const [name, setName] = useState("");
    const [isStarted, setIsStarted] = useState(false);
    const [inputName, setInputName] = useState("");

    const activeChips = starterChips || siteConfig.starterChips;


    const handleStart = (e: React.FormEvent) => {
        e.preventDefault();
        const finalName = inputName.trim() || "Guest";
        setName(finalName);
        setIsStarted(true);
    };

    const handleChipClick = (question: string) => {
        if (!isStarted) {
            // Auto-start as Guest
            setName("Guest");
            setIsStarted(true);

            // Wait for chat to initialize then fill
            setTimeout(() => {
                fillInput(question);
            }, 1000);
            return;
        }
        fillInput(question);
    };

    const fillInput = (text: string) => {
        // Query more aggressively for the input using multiple known selectors
        const inputField =
            document.querySelector('textarea.n8n-chat-widget-input') as HTMLTextAreaElement ||
            document.querySelector('input.n8n-chat-widget-input') as HTMLInputElement ||
            document.querySelector('.chat-inputs textarea') as HTMLTextAreaElement ||
            document.querySelector('.n8n-chat-widget-input-wrapper textarea') as HTMLTextAreaElement;

        if (inputField) {
            // React/Vue hack: set value and dispatch events
            const prototype = inputField instanceof HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;

            nativeInputValueSetter?.call(inputField, text);
            inputField.dispatchEvent(new Event('input', { bubbles: true }));

            // Focus the input
            inputField.focus();
        }
    };

    useEffect(() => {
        if (!isStarted || !containerRef.current || chatInstance.current) return;

        chatInstance.current = createChat({
            webhookUrl: siteConfig.n8nWebhookUrl,
            target: containerRef.current,
            mode: "fullscreen",
            initialMessages: [
                `Hi ${name !== 'Guest' ? name : 'there'}! I'm ${siteConfig.name.split(' ')[0]}'s official AI assistant.`,
                "I have access to his full resume, technical project notes, and career history.",
                "How can I help you today?"
            ],
            showWelcomeScreen: false,
            metadata: {
                userName: name
            },
            i18n: {
                en: {
                    title: `${siteConfig.name.split(' ')[0]}'s Assistant`,
                    subtitle: "AI Workflow Online",
                    footer: "",
                    getStarted: "Start Chat",
                    inputPlaceholder: "Type your question here...",
                    closeButtonTooltip: "Close",
                }
            },
        });
    }, [isStarted, name]);

    return (
        <div className="grid lg:grid-cols-[1fr_350px] gap-8">
            <div className="glass rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px] md:h-[650px] border border-white/10 relative">
                {/* Header */}
                <div className="p-4 md:p-5 border-b border-white/10 bg-white/5 flex items-center justify-between z-10 backdrop-blur-md">
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
                                Ready to answer
                            </div>
                        </div>
                    </div>
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                </div>

                {/* Chat Container */}
                <div className="flex-1 relative bg-black/20 isolate">
                    {!isStarted ? (
                        <div className="absolute inset-0 flex items-center justify-center p-6 z-20">
                            <div className="w-full max-w-sm space-y-6 text-center">
                                <div className="mx-auto w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                                    <User className="w-8 h-8 text-indigo-400" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">Start Conversation</h3>
                                    <p className="text-muted-foreground text-sm">Enter your name to personalize the chat (Optional).</p>
                                </div>
                                <form onSubmit={handleStart} className="space-y-4">
                                    <input
                                        id="name-input"
                                        type="text"
                                        placeholder="Your Name (Optional)"
                                        value={inputName}
                                        onChange={(e) => setInputName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500/50 focus:bg-white/10 outline-none text-center placeholder:text-muted-foreground/50 transition-all font-medium"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        Start Chat <ArrowRight className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div ref={containerRef} className="absolute inset-0 z-10 n8n-chat-container" />
                    )}
                </div>

                <div className="p-2 md:p-3 bg-white/5 border-t border-white/10 glass">
                    <p className="text-[10px] md:text-[11px] text-center text-muted-foreground font-medium uppercase tracking-wider">
                        Powered by n8n + Gemini 3 + Vector Embeddings
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
                        {activeChips.map((chip, i) => (
                            <button
                                key={i}
                                onClick={() => handleChipClick(chip)}

                                className="text-left w-full text-xs md:text-sm p-3 md:p-3.5 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all text-muted-foreground hover:text-white cursor-pointer leading-snug active:scale-[0.98] whitespace-normal h-auto"
                            >
                                "{chip}"
                            </button>
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

            <style jsx global>{`
                /* Ensure container takes full height */
                .n8n-chat-container {
                  height: 100% !important;
                  width: 100% !important;
                }
                
                .n8n-chat-widget {
                  position: relative !important;
                  height: 100% !important;
                  width: 100% !important;
                  background: transparent !important;
                  border: none !important;
                  box-shadow: none !important;
                  display: flex !important;
                  flex-direction: column !important;
                  overflow: hidden !important;
                }

                .n8n-chat-widget-window {
                  height: 100% !important;
                  width: 100% !important;
                  display: flex !important;
                  flex-direction: column !important;
                  background: transparent !important;
                }

                .n8n-chat-widget-messages {
                    flex: 1 !important;
                    overflow-y: auto !important;
                    padding: 20px !important;
                }

                /* INPUT CONTAINER - Ensure it is visible */
                .n8n-chat-widget-input-container,
                .n8n-chat-widget-input-wrapper {
                   display: flex !important;
                   position: relative !important;
                   padding: 16px !important;
                   background: rgba(15, 23, 42, 0.8) !important;
                   backdrop-filter: blur(10px);
                   border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
                   flex-shrink: 0 !important;
                   min-height: 80px !important;
                   z-index: 50 !important;
                }

                .n8n-chat-widget-input {
                   width: 100% !important;
                   background: rgba(255, 255, 255, 0.05) !important;
                   border: 1px solid rgba(255, 255, 255, 0.1) !important;
                   color: white !important;
                   border-radius: 12px !important;
                   padding: 12px 16px !important;
                   outline: none !important;
                   min-height: 44px !important;
                }
                
                .n8n-chat-widget-input::placeholder {
                    color: rgba(255, 255, 255, 0.4) !important;
                }

                /* Hide the BRANDING/POWERED BY footer */
                .n8n-chat-widget-footer,
                .n8n-chat-widget-branding {
                    display: none !important;
                    height: 0 !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    overflow: hidden !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                }
                
                /* Aggressively hide the specific red 'Powered by n8n' text if it has a different class */
                a[href*="n8n.io"],
                span:contains("Powered by") {
                     display: none !important;
                }

                /* Hide Header */
                .n8n-chat-widget-header { display: none !important; }

                /* Styling Messages */
                .n8n-chat-widget-message-bot {
                    background: rgba(30, 41, 59, 0.9) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    color: rgba(255, 255, 255, 0.9) !important;
                }
                .n8n-chat-widget-message-user {
                    background: #4f46e5 !important;
                    color: white !important;
                }
                
                /* Force background to be transparent so our glass effect shows */
                .n8n-chat-widget-window,
                .n8n-chat-widget-messages {
                    background: transparent !important;
                }

                /* Prevent text cutoff */
                .n8n-chat-widget-message-body,
                .n8n-chat-widget-input {
                    word-break: break-word !important;
                    overflow-wrap: break-word !important;
                    white-space: pre-wrap !important;
                }
            `}</style>
        </div>
    );
}
