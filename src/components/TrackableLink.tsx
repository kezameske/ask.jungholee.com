"use client";

import { trackEvent } from "@/lib/analytics";

type EventName = Parameters<typeof trackEvent>[0];

interface TrackableLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  eventName: EventName;
  eventProps?: Record<string, string | number | boolean>;
}

export default function TrackableLink({
  eventName,
  eventProps,
  onClick,
  children,
  ...rest
}: TrackableLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent(eventName, eventProps);
    onClick?.(e);
  };

  return (
    <a onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
