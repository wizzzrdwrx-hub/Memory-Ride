import { MemoryRoute } from "../types";
import { validateMemoryRoute } from "./schemas";

const STORAGE_KEY = "memory_ride_route";
const LEGACY_STORAGE_KEY = "memory_ride_pins";
const STORAGE_VERSION = 1;

/**
 * Loads route data from localStorage, running migrations and validations
 */
export const loadRoute = (fallback: MemoryRoute): MemoryRoute => {
  if (typeof window === "undefined") return fallback;

  // 1. Try parsing updated route structure
  const storedRoute = localStorage.getItem(STORAGE_KEY);
  if (storedRoute) {
    try {
      const parsed = JSON.parse(storedRoute);
      const validated = validateMemoryRoute(parsed);
      if (validated && validated.version === STORAGE_VERSION) {
        return validated;
      }
    } catch (e) {
      // Degrade gracefully
    }
  }

  // 2. Try migrating legacy array schema from v0.1
  const storedLegacy = localStorage.getItem(LEGACY_STORAGE_KEY);
  if (storedLegacy) {
    try {
      const parsed = JSON.parse(storedLegacy);
      const validated = validateMemoryRoute(parsed);
      if (validated) {
        // Migrate to new storage key and clear legacy key
        saveRoute(validated);
        localStorage.removeItem(LEGACY_STORAGE_KEY);
        return validated;
      }
    } catch (e) {
      // Migration failed
    }
  }

  // 3. Fallback to defaults
  return fallback;
};

/**
 * Saves route data to localStorage securely
 */
export const saveRoute = (route: MemoryRoute): void => {
  if (typeof window === "undefined") return;
  try {
    const data = {
      ...route,
      version: STORAGE_VERSION,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save route to localStorage:", e);
  }
};
export type { MemoryRoute };
