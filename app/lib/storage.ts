import { RouteLibrary } from "../types";
import { validateRouteLibrary, normalizeImportedRoute } from "./schemas";

const STORAGE_KEY = "memory_ride_library";
const LEGACY_ROUTE_KEY = "memory_ride_route";
const LEGACY_PINS_KEY = "memory_ride_pins";
const STORAGE_VERSION = 2; // Version 2 maps to RouteLibrary schema

/**
 * Loads the route library from localStorage, performing migrations and validations
 */
export const loadLibrary = (fallback: RouteLibrary): RouteLibrary => {
  if (typeof window === "undefined") return fallback;

  // 1. Try loading existing v0.2 Route Library
  const storedLibrary = localStorage.getItem(STORAGE_KEY);
  if (storedLibrary) {
    try {
      const parsed = JSON.parse(storedLibrary);
      if (validateRouteLibrary(parsed) && parsed.version === STORAGE_VERSION) {
        return parsed;
      }
    } catch {
      // Fall through to removal
    }
    localStorage.removeItem(STORAGE_KEY);
  }

  // 2. Try migrating v0.1.1 route file structure
  const storedRoute = localStorage.getItem(LEGACY_ROUTE_KEY);
  if (storedRoute) {
    try {
      const parsed = JSON.parse(storedRoute);
      const normalizedRoute = normalizeImportedRoute(parsed);
      if (normalizedRoute) {
        const migratedLibrary: RouteLibrary = {
          version: STORAGE_VERSION,
          activeRouteId: normalizedRoute.id,
          routes: [normalizedRoute],
        };
        // Save new library and clean up old keys
        saveLibrary(migratedLibrary);
        localStorage.removeItem(LEGACY_ROUTE_KEY);
        localStorage.removeItem(LEGACY_PINS_KEY);
        return migratedLibrary;
      }
    } catch {
      // Cascade to legacy pins
    }
  }

  // 3. Try migrating v0.1 legacy pins array
  const storedPins = localStorage.getItem(LEGACY_PINS_KEY);
  if (storedPins) {
    try {
      const parsed = JSON.parse(storedPins);
      const normalizedRoute = normalizeImportedRoute(parsed);
      if (normalizedRoute) {
        const migratedLibrary: RouteLibrary = {
          version: STORAGE_VERSION,
          activeRouteId: normalizedRoute.id,
          routes: [normalizedRoute],
        };
        saveLibrary(migratedLibrary);
        localStorage.removeItem(LEGACY_ROUTE_KEY);
        localStorage.removeItem(LEGACY_PINS_KEY);
        return migratedLibrary;
      }
    } catch {
      // Migration failed
    }
  }

  // 4. Return default fallback library
  saveLibrary(fallback);
  return fallback;
};

/**
 * Saves the route library to localStorage securely
 */
export const saveLibrary = (library: RouteLibrary): void => {
  if (typeof window === "undefined") return;
  try {
    const data = {
      ...library,
      version: STORAGE_VERSION,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save RouteLibrary to localStorage:", e);
  }
};
