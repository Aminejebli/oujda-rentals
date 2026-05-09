"use client";

import { useEffect } from "react";

export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor page load performance
    if (typeof window !== "undefined" && "performance" in window) {
      window.addEventListener("load", () => {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        if (navigation) {
          const metrics = {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            totalTime: navigation.loadEventEnd - navigation.fetchStart,
          };

          // Log performance metrics in development
          if (process.env.NODE_ENV === "development") {
            console.log("Page load metrics:", metrics);
          }

          // Could send to analytics service in production
          // analytics.track('page_load_performance', metrics);
        }
      });

      // Monitor Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];

        if (process.env.NODE_ENV === "development") {
          console.log("LCP:", lastEntry.startTime);
        }
      });

      try {
        observer.observe({ entryTypes: ["largest-contentful-paint"] });
      } catch (e) {
        // LCP not supported in some browsers
      }

      return () => observer.disconnect();
    }
  }, []);

  return null;
}