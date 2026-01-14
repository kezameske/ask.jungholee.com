"use client";

import { useEffect, useRef } from "react";
import { createChat } from "@n8n/chat";
import "@n8n/chat/dist/style.css";
import { siteConfig } from "@/config/site";

export default function N8nChatWrapper() {
    const containerRef = useRef<HTMLDivElement>(null);
    const chatInitialized = useRef(false);

    useEffect(() => {
        if (chatInitialized.current || !containerRef.current) return;

        createChat({
            webhookUrl: siteConfig.n8nWebhookUrl,
            target: containerRef.current,
            mode: "fullscreen",
            initialMessages: [
                `Hi! I'm ${siteConfig.name.split(' ')[0]}'s official AI assistant.`,
                "I have access to his full resume, technical project notes, and career history.",
                "How can I help you today? You can ask about his experience in Product Management, IT operations, or his automation projects."
            ],
            showWelcomeScreen: true,
            metadata: {},
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

        chatInitialized.current = true;
    }, []);

    return <div ref={containerRef} className="flex-1 n8n-chat-container" />;
}
