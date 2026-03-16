import { track } from "@vercel/analytics";

type EventName =
  | "chat_started"
  | "resume_click"
  | "project_clicked"
  | "section_viewed"
  | "chip_clicked"
  | "cta_click";

export function trackEvent(name: EventName, props?: Record<string, string | number | boolean>) {
  track(name, props);
}
