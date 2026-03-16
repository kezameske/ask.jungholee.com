"use client";

import { useState, useEffect, useRef } from "react";
import { createChat } from "@n8n/chat";
import "@n8n/chat/dist/style.css";
import { siteConfig } from "@/config/site";
import { Bot, Sparkles, MessageSquare, ArrowRight, User } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function ChatInterface({ starterChips }: { starterChips?: string[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const chatInstance = useRef<any>(null);
    const [name, setName] = useState("");
    const [isStarted, setIsStarted] = useState(false);
    const [inputName, setInputName] = useState("");

    const activeChips = (starterChips && starterChips.length > 0) ? starterChips : siteConfig.starterChips;


    const handleStart = (e: React.FormEvent) => {
        e.preventDefault();
        const finalName = inputName.trim() || "Guest";
        setName(finalName);
        setIsStarted(true);
        trackEvent("chat_started", { name: finalName });
    };

    const handleChipClick = (question: string) => {
        trackEvent("chip_clicked", { question });
        if (!isStarted) {
            setName("Guest");
            setIsStarted(true);
            trackEvent("chat_started", { name: "Guest" });

            setTimeout(() => {
                fillInput(question);
            }, 1000);
            return;
        }
        fillInput(question);
    };

    const fillInput = (text: string) => {
        const inputField =
            document.querySelector('.chat-inputs textarea') as HTMLTextAreaElement ||
            document.querySelector('.chat-textarea') as HTMLTextAreaElement ||
            document.querySelector('textarea.chat-textarea') as HTMLTextAreaElement ||
            document.querySelector('.n8n-chat-container textarea') as HTMLTextAreaElement;

        if (inputField) {
            const prototype = inputField instanceof HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;

            nativeInputValueSetter?.call(inputField, text);
            inputField.dispatchEvent(new Event('input', { bubbles: true }));

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
            <div className="glass rounded-2xl overflow-hidden flex flex-col h-[65vh] md:h-[70vh] min-h-[500px] max-h-[800px] relative">
                {/* Header */}
                <div className="p-4 md:p-5 border-b border-[#c2956b]/8 bg-white/[0.02] flex items-center justify-between z-10 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center">
                            <Bot className="w-6 h-6 text-[#0c0a09]" aria-hidden="true" />
                        </div>
                        <div>
                            <span className="font-bold text-lg text-white">Jungho&apos;s Assistant</span>
                            <div className="flex items-center gap-1.5 text-xs text-green-500 font-medium">
                                <span className="relative flex h-2 w-2" aria-hidden="true">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Ready to answer
                            </div>
                        </div>
                    </div>
                    <Sparkles className="w-5 h-5 text-[#c2956b]" aria-hidden="true" />
                </div>

                {/* Chat Container */}
                <div className="flex-1 relative bg-black/20 isolate">
                    {!isStarted ? (
                        <div className="absolute inset-0 flex items-center justify-center p-6 z-20">
                            <div className="w-full max-w-sm space-y-6 text-center">
                                <div className="mx-auto w-16 h-16 rounded-full bg-[#c2956b]/10 flex items-center justify-center mb-4">
                                    <User className="w-8 h-8 text-[#c2956b]" aria-hidden="true" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-white">Start Conversation</h3>
                                    <p className="text-[#78716c] text-sm">Enter your name to personalize the chat (Optional).</p>
                                </div>
                                <form onSubmit={handleStart} className="space-y-4">
                                    <input
                                        id="name-input"
                                        type="text"
                                        placeholder="Your Name (Optional)"
                                        aria-label="Your name"
                                        value={inputName}
                                        onChange={(e) => setInputName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2956b] focus-visible:border-[#c2956b]/50 focus-visible:bg-white/[0.06] text-center placeholder:text-[#78716c] transition-colors font-medium text-white"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-3 rounded-xl bg-[#c2956b] hover:bg-[#d4ad82] text-[#0c0a09] font-semibold transition-colors hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2956b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0a09]"
                                    >
                                        Start Chat <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div ref={containerRef} className="absolute inset-0 z-10 n8n-chat-container" />
                    )}
                </div>

                <div className="p-2 md:p-3 bg-white/[0.02] border-t border-[#c2956b]/8">
                    <p className="text-[11px] md:text-xs text-center text-[#78716c] font-medium uppercase tracking-wider">
                        Powered by n8n + Gemini 3 + Vector Embeddings + Claude Code
                    </p>
                </div>
            </div>

            {/* Suggestions Sidebar */}
            <div className="space-y-6">
                <div className="glass p-6 rounded-2xl">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                        <MessageSquare className="w-5 h-5 text-[#c2956b]" aria-hidden="true" />
                        Try asking{"\u2026"}
                    </h3>
                    <div className="grid gap-3">
                        {activeChips.map((chip, i) => (
                            <button
                                key={i}
                                onClick={() => handleChipClick(chip)}
                                className="text-left w-full text-xs md:text-sm p-3 md:p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#c2956b]/30 hover:bg-[#c2956b]/5 transition-colors text-[#a8a29e] hover:text-white cursor-pointer leading-snug active:scale-[0.98] whitespace-normal h-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2956b]"
                            >
                                &ldquo;{chip}&rdquo;
                            </button>
                        ))}
                    </div>
                </div>

                <div className="glass p-6 rounded-2xl border-[#c2956b]/10 bg-[#c2956b]/[0.03]">
                    <h4 className="font-bold mb-2 text-[#c2956b] uppercase text-xs tracking-widest">Why I built this</h4>
                    <p className="text-sm text-[#a8a29e] leading-relaxed">
                        Recruiter time is valuable. This tool allows you to instantly verify my fit for a role without waiting for a screening call.
                    </p>
                </div>
            </div>

            <style jsx global>{`
                /* === CSS Variable Overrides (n8n/chat theming API) === */
                .n8n-chat-container {
                  height: 100% !important;
                  width: 100% !important;

                  --chat--color--primary: #c2956b;
                  --chat--color--primary-shade-50: #a87a52;
                  --chat--color--secondary: #c2956b;
                  --chat--color-secondary-shade-50: #a87a52;
                  --chat--color-white: #1c1917;
                  --chat--color-light: #0c0a09;
                  --chat--color-light-shade-50: #171412;
                  --chat--color-light-shade-100: #292524;
                  --chat--color-dark: #e7e5e4;
                  --chat--color-medium: #44403c;
                  --chat--color-disabled: #44403c;
                  --chat--color-typing: #a8a29e;

                  --chat--message--bot--background: rgba(28, 25, 23, 0.9);
                  --chat--message--bot--color: rgba(231, 229, 228, 0.85);
                  --chat--message--user--background: #c2956b;
                  --chat--message--user--color: #0c0a09;
                  --chat--message--border-radius: 0.75rem;

                  --chat--input--background: rgba(255, 255, 255, 0.04);
                  --chat--textarea--height: 44px;

                  --chat--button--background: #c2956b;
                  --chat--button--color: #0c0a09;
                  --chat--input--send--button--background: transparent;
                  --chat--input--send--button--color: #c2956b;

                  --chat--header--background: transparent;
                  --chat--header--color: #e7e5e4;

                  --chat--font-family: var(--font-outfit), system-ui, sans-serif;
                  --chat--window--width: 100%;
                  --chat--window--height: 100%;
                }

                /* === Layout / Container === */
                .chat-layout {
                  height: 100% !important;
                  width: 100% !important;
                  display: flex !important;
                  flex-direction: column !important;
                  background: transparent !important;
                }

                /* === Messages Area === */
                .chat-body {
                  flex: 1 !important;
                  overflow-y: auto !important;
                  overscroll-behavior: contain !important;
                  padding: 20px !important;
                  background: transparent !important;
                }

                /* === Input Area === */
                .chat-inputs {
                  display: flex !important;
                  position: relative !important;
                  padding: 16px !important;
                  background: rgba(12, 10, 9, 0.8) !important;
                  backdrop-filter: blur(10px);
                  border-top: 1px solid rgba(194, 149, 107, 0.08) !important;
                  flex-shrink: 0 !important;
                  z-index: 50 !important;
                }

                .chat-inputs-controls {
                  display: flex !important;
                  width: 100% !important;
                  align-items: flex-end !important;
                  gap: 8px !important;
                }

                .chat-textarea {
                  width: 100% !important;
                  color: white !important;
                  background: rgba(255, 255, 255, 0.04) !important;
                  border: 1px solid rgba(255, 255, 255, 0.08) !important;
                  border-radius: 12px !important;
                  padding: 12px 16px !important;
                  outline: none !important;
                  min-height: 44px !important;
                  font-family: var(--font-outfit), system-ui, sans-serif !important;
                }

                .chat-textarea::placeholder {
                  color: rgba(255, 255, 255, 0.3) !important;
                }

                .chat-textarea:focus {
                  border-color: rgba(194, 149, 107, 0.3) !important;
                  background: rgba(255, 255, 255, 0.06) !important;
                }

                /* === Hide header, footer, branding === */
                .chat-header {
                  display: none !important;
                }

                .chat-footer,
                a[href*="n8n.io"] {
                  display: none !important;
                  height: 0 !important;
                  padding: 0 !important;
                  margin: 0 !important;
                  overflow: hidden !important;
                  opacity: 0 !important;
                  pointer-events: none !important;
                }

                /* === Message styling (fallback on top of CSS vars) === */
                .chat-message-bot .chat-message-body {
                  border: 1px solid rgba(194, 149, 107, 0.08) !important;
                }

                .chat-message-body {
                  word-break: break-word !important;
                  overflow-wrap: break-word !important;
                  white-space: pre-wrap !important;
                }
            `}</style>
        </div>
    );
}
