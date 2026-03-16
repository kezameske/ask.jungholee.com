"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

interface SectionTrackerProps {
  id: string;
  children: React.ReactNode;
}

export default function SectionTracker({ id, children }: SectionTrackerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasFired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFired.current) {
          hasFired.current = true;
          trackEvent("section_viewed", { section: id });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id]);

  return <div ref={ref}>{children}</div>;
}
