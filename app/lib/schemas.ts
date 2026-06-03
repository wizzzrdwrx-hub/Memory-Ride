import { MemoryPin, MemoryRoute } from "../types";

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
 * Validates a route object or legacy pin array, restoring schemas cleanly
 */
export const validateMemoryRoute = (data: unknown): MemoryRoute | null => {
  if (!data) return null;

  // Handle legacy array of pins directly
  if (Array.isArray(data)) {
    const validPins = data.filter(validateMemoryPin);
    if (validPins.length === 0) return null;
    return {
      version: 1,
      pins: validPins,
    };
  }

  // Handle standard MemoryRoute object
  if (typeof data === "object") {
    const obj = data as Record<string, any>;
    if (Array.isArray(obj.pins)) {
      const validPins = obj.pins.filter(validateMemoryPin);
      if (validPins.length === 0) return null;
      return {
        version: typeof obj.version === "number" ? obj.version : 1,
        pins: validPins,
        title: typeof obj.title === "string" ? obj.title : undefined,
        description: typeof obj.description === "string" ? obj.description : undefined,
      };
    }
  }

  return null;
};
export type { MemoryPin, MemoryRoute };
