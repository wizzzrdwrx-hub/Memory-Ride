import { MemoryPin, MemoryRoute, RouteLibrary } from "../types";

/**
 * Safely returns a usable string or a fallback.
 */
const safeString = (value: unknown, fallback: string): string => {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
};

/**
 * Validates a single memory pin structure and data types.
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
 * Validates a complete MemoryRoute object.
 */
export const validateMemoryRoute = (route: unknown): route is MemoryRoute => {
  if (!route || typeof route !== "object") return false;

  const r = route as Partial<MemoryRoute>;

  return (
    typeof r.id === "string" &&
    r.id.trim().length > 0 &&
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
 * Validates a complete RouteLibrary object.
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
 *
 * Supports:
 * - strict v0.2 MemoryRoute objects
 * - v0.1.1 route wrappers with pins
 * - legacy v0.1 flat MemoryPin arrays
 */
export const normalizeImportedRoute = (data: unknown): MemoryRoute | null => {
  if (!data) return null;

  // 1. Already a valid v0.2 MemoryRoute
  if (validateMemoryRoute(data)) {
    return data;
  }

  // 2. Legacy object wrapper with pins
  if (typeof data === "object") {
    const obj = data as Record<string, unknown>;

    if (Array.isArray(obj.pins)) {
      const validPins = obj.pins.filter(validateMemoryPin);

      if (validPins.length > 0) {
        const now = new Date().toISOString();

        return {
          id: safeString(obj.id, `route-${Date.now()}`),
          title: safeString(obj.title, "Migrated Ride"),
          description: safeString(obj.description, "Story migrated from legacy format."),
          era: validPins[0]?.year || "1994",
          author: safeString(obj.author, "Family Archivist"),
          coverImage: safeString(obj.coverImage, validPins[0]?.image || "/images/battery.png"),
          createdAt: safeString(obj.createdAt, now),
          updatedAt: now,
          pins: validPins,
        };
      }
    }
  }

  // 3. Legacy flat pin array
  if (Array.isArray(data)) {
    const validPins = data.filter(validateMemoryPin);

    if (validPins.length > 0) {
      const now = new Date().toISOString();

      return {
        id: `route-${Date.now()}`,
        title: "Migrated Ride (Legacy Array)",
        description: "Pins migrated from legacy flat array format.",
        era: validPins[0]?.year || "1994",
        author: "Family Archivist",
        coverImage: validPins[0]?.image || "/images/battery.png",
        createdAt: now,
        updatedAt: now,
        pins: validPins,
      };
    }
  }

  return null;
};
