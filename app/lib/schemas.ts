/* eslint-disable @typescript-eslint/no-explicit-any */
import { MemoryPin, MemoryRoute, RouteLibrary } from "../types";


/**
 * Validates a single memory pin structure and data types
 */
export const validateMemoryPin = (pin: any): pin is MemoryPin => {
  if (!pin || typeof pin !== "object") return false;
  return (
    typeof pin.id === "number" &&
    typeof pin.title === "string" &&
    Array.isArray(pin.coordinates) &&
    pin.coordinates.length === 2 &&
    typeof pin.coordinates[0] === "number" &&
    typeof pin.coordinates[1] === "number" &&
    typeof pin.text === "string" &&
    typeof pin.image === "string" &&
    typeof pin.locationName === "string" &&
    typeof pin.year === "string" &&
    typeof pin.audioDuration === "string"
  );
};

/**
 * Validates a complete MemoryRoute object (strict v0.2 check)
 */
export const validateMemoryRoute = (route: any): route is MemoryRoute => {
  if (!route || typeof route !== "object") return false;
  return (
    typeof route.id === "string" &&
    typeof route.title === "string" &&
    typeof route.description === "string" &&
    typeof route.era === "string" &&
    typeof route.author === "string" &&
    typeof route.coverImage === "string" &&
    typeof route.createdAt === "string" &&
    typeof route.updatedAt === "string" &&
    Array.isArray(route.pins) &&
    route.pins.every(validateMemoryPin)
  );
};

/**
 * Validates a complete RouteLibrary object (strict v0.2 check)
 */
export const validateRouteLibrary = (library: unknown): library is RouteLibrary => {
  if (!library || typeof library !== "object") return false;

  const candidate = library as Partial<RouteLibrary>;

  if (
    typeof candidate.version !== "number" ||
    typeof candidate.activeRouteId !== "string" ||
    !Array.isArray(candidate.routes) ||
    candidate.routes.length === 0 ||
    !candidate.routes.every(validateMemoryRoute)
  ) {
    return false;
  }

  return candidate.routes.some((route) => route.id === candidate.activeRouteId);
};

/**
 * Normalizes imported or legacy data into a clean, valid MemoryRoute object.
 * Supports legacy flat arrays of pins, v0.1.1 route wrappers, and v0.2 routes.
 */
export const normalizeImportedRoute = (data: unknown): MemoryRoute | null => {
  if (!data) return null;

  // 1. If it's already a strict v0.2 MemoryRoute
  if (validateMemoryRoute(data)) {
    return data;
  }

  // 2. If it is a v0.1.1 MemoryRoute wrapper (with version: 1 and pins)
  if (typeof data === "object") {
    const obj = data as Record<string, any>;
    if (Array.isArray(obj.pins)) {
      const validPins = obj.pins.filter(validateMemoryPin);
      if (validPins.length > 0) {
        return {
          id: obj.id || `route-${Date.now()}`,
          title: obj.title || "Migrated Ride",
          description: obj.description || "Story migrated from legacy format.",
          era: validPins[0]?.year || "1994",
          author: "Family Archivist",
          coverImage: validPins[0]?.image || "/images/battery.png",
          createdAt: obj.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          pins: validPins,
        };
      }
    }
  }

  // 3. If it's a legacy flat array of pins (v0.1)
  if (Array.isArray(data)) {
    const validPins = data.filter(validateMemoryPin);
    if (validPins.length > 0) {
      return {
        id: `route-${Date.now()}`,
        title: "Migrated Ride (Legacy Array)",
        description: "Pins migrated from legacy flat array format.",
        era: validPins[0]?.year || "1994",
        author: "Family Archivist",
        coverImage: validPins[0]?.image || "/images/battery.png",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        pins: validPins,
      };
    }
  }

  return null;
};
