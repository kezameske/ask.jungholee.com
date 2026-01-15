"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, CheckCircle2, Music, Car, Monitor, Briefcase, Zap } from "lucide-react";

interface FunFactsTickerProps {
    facts: string[];
}

export default function FunFactsTicker({ facts }: FunFactsTickerProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % facts.length);
        }, 10000); // 10 seconds

        return () => clearInterval(timer);
    }, [facts.length]);

    // Helper to get icon
    const getIcon = (text: string) => {
        if (text.includes("PC") || text.includes("IT") || text.includes("desktop")) return Monitor;
        if (text.includes("car")) return Car;
        if (text.includes("Music") || text.includes("Recording")) return Music;
        if (text.includes("Product")) return Briefcase;
        if (text.includes("AI") || text.includes("workflow")) return Zap;
        return Rocket;
    };

    const currentFact = facts[index];
    const Icon = getIcon(currentFact);

    return (
        <div className="w-full relative overflow-hidden min-h-[120px] flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute w-full max-w-2xl px-4"
                >
                    <div className="glass p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left hover:border-indigo-500/30 transition-all shadow-xl shadow-indigo-500/5">
                        <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                            <Icon className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                                {currentFact}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
