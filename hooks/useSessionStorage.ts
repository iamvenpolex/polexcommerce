"use client";

import { useState, useEffect } from "react";

export function useSessionStorage<T>(key: string, initialValue: T) {
  // ✅ Lazy initialization reads from sessionStorage directly
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const storedValue = sessionStorage.getItem(key);
      return storedValue ? (JSON.parse(storedValue) as T) : initialValue;
    } catch (error) {
      console.error("Error parsing sessionStorage value:", error);
      return initialValue;
    }
  });

  // ✅ Keep sessionStorage in sync when value changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting sessionStorage value:", error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
