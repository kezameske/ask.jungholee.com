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
        <div className="w-full bg-white/5 border-y border-white/5 overflow-hidden backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex items-center gap-3 absolute w-full justify-center px-4"
                    >
                        <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-indigo-400" />
                        </div>
                        <p className="text-sm md:text-base text-muted-foreground font-medium truncate max-w-[80vw]">
                            {currentFact}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Progress bar for the timer */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-indigo-500/30 w-full">
                    <motion.div
                        key={index} // Reset animation on index change
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 10, ease: "linear" }}
                        className="h-full bg-indigo-500"
                    />
                </div>
            </div>
        </div>
    );
}
