"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Music, Car, Monitor, Briefcase, Zap, ChevronLeft, ChevronRight } from "lucide-react";

interface FunFactsTickerProps {
    facts: string[];
}

export default function FunFactsTicker({ facts }: FunFactsTickerProps) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const goNext = useCallback(() => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % facts.length);
    }, [facts.length]);

    const goPrev = useCallback(() => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + facts.length) % facts.length);
    }, [facts.length]);

    useEffect(() => {
        if (facts.length === 0) return;

        const timer = setInterval(goNext, 10000);
        return () => clearInterval(timer);
    }, [facts.length, goNext]);

    if (facts.length === 0) return null;

    const getIcon = (text: string) => {
        if (text.includes("PC") || text.includes("IT") || text.includes("desktop")) return Monitor;
        if (text.includes("car") || text.includes("Car")) return Car;
        if (text.includes("Music") || text.includes("Recording")) return Music;
        if (text.includes("Product")) return Briefcase;
        if (text.includes("AI") || text.includes("workflow")) return Zap;
        return Rocket;
    };

    const currentFact = facts[index];
    const Icon = getIcon(currentFact);

    return (
        <div className="w-full relative overflow-hidden min-h-[120px] flex items-center justify-center">
            <button
                onClick={goPrev}
                aria-label="Previous fact"
                className="absolute left-0 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.06] text-[#a8a29e] hover:text-white hover:border-[#c2956b]/30 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2956b]"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={index}
                    custom={direction}
                    initial={{ x: direction * 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction * -100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute w-full max-w-2xl px-14"
                >
                    <div className="glass p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 text-center md:text-left hover:border-[#c2956b]/20 transition-[border-color]">
                        <div className="w-12 h-12 rounded-full bg-[#c2956b]/10 flex items-center justify-center shrink-0">
                            <Icon className="w-6 h-6 text-[#c2956b]" aria-hidden="true" />
                        </div>
                        <div>
                            <p className="text-base text-[#a8a29e] font-medium leading-relaxed">
                                {currentFact}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <button
                onClick={goNext}
                aria-label="Next fact"
                className="absolute right-0 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.06] text-[#a8a29e] hover:text-white hover:border-[#c2956b]/30 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c2956b]"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
