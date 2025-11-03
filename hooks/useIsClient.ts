"use client";
import { useEffect, useState } from "react";

export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Defer setState to the next microtask to avoid ESLint warning
    const timer = requestAnimationFrame(() => setIsClient(true));

    return () => cancelAnimationFrame(timer);
  }, []);

  return isClient;
}
