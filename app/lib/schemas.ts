import { MemoryPin, MemoryRoute, RouteLibrary } from "../types";

/**
 * Validates a single memory pin structure and data types
 */
export const validateMemoryPin = (pin: unknown): pin is MemoryPin => {
  if (!pin || typeof pin !== "object") return false;
  
  const p = pin as Partial<MemoryPin>;
  
  return (
    typeof p.id === "number" &&
    Number.isInteger(p.id) &&
    typeof p.title === "string" &&
    Array.isArray(p.coordinates) &&
    p.coordinates.length === 2 &&
    typeof p.coordinates[0] === "number" &&
    Number.isFinite(p.coordinates[0]) &&
    p.coordinates[0] >= -180 &&
    p.coordinates[0] <= 180 &&
    typeof p.coordinates[1] === "number" &&
    Number.isFinite(p.coordinates[1]) &&
    p.coordinates[1] >= -90 &&
    p.coordinates[1] <= 90 &&
    typeof p.text === "string" &&
    typeof p.image === "string" &&
    typeof p.locationName === "string" &&
    typeof p.year === "string" &&
    typeof p.audioDuration === "string"
  );
};

/**
 * Validates a complete MemoryRoute object (strict v0.2 check)
 */
export const validateMemoryRoute = (route: unknown): route is MemoryRoute => {
  if (!route || typeof route !== "object") return false;
  
  const r = route as Partial<MemoryRoute>;
  
  return (
    typeof r.id === "string" &&
    typeof r.title === "string" &&
    typeof r.description === "string" &&
    typeof r.era === "string" &&
    typeof r.author === "string" &&
    typeof r.coverImage === "string" &&
    typeof r.createdAt === "string" &&
    typeof r.updatedAt === "string" &&
    Array.isArray(r.pins) &&
    r.pins.every(validateMemoryPin)
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
    const obj = data as Record<string, unknown>;
    if (Array.isArray(obj.pins)) {
      const pinsArray = obj.pins as unknown[];
      const validPins = pinsArray.filter(validateMemoryPin);
      if (validPins.length > 0) {
        return {
          id: (obj.id as string) || `route-${Date.now()}`,
          title: (obj.title as string) || "Migrated Ride",
          description: (obj.description as string) || "Story migrated from legacy format.",
          era: validPins[0]?.year || "1994",
          author: "Family Archivist",
          coverImage: validPins[0]?.image || "/images/battery.png",
          createdAt: (obj.createdAt as string) || new Date().toISOString(),
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
