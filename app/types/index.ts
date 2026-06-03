export type ImageSourceType = "url" | "local-preview" | "future-upload";
export type AudioSourceType = "none" | "future-recording" | "future-upload";

export interface MemoryPinMedia {
  imageUrl?: string;
  imageSourceType?: ImageSourceType;
  imageAlt?: string;
  audioLabel?: string;
  audioDuration?: string;
  audioSourceType?: AudioSourceType;
}

export interface MemoryRouteMedia {
  coverImageUrl?: string;
  coverImageSourceType?: ImageSourceType;
  coverImageAlt?: string;
}

export interface TemporalPerspective {
  id: string;
  year: string;
  label: string;
  title: string;
  text: string;
  image: string;
  sourceNote?: string;
  confidence?: string;
  hxStrength?: number;
}

export interface MemoryPin {
  id: number;
  title: string;
  coordinates: [number, number]; // [longitude, latitude]
  text: string;
  image: string;
  locationName: string;
  year: string;
  audioDuration: string;
  media?: MemoryPinMedia;
  temporalPerspectives?: TemporalPerspective[];
}

export interface MemoryRoute {
  id: string; // Unique route identifier
  title: string;
  description: string;
  era: string; // e.g., "1994"
  author: string;
  coverImage: string; // URL path or base64 preview
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  pins: MemoryPin[];
  media?: MemoryRouteMedia;
}

export interface RouteLibrary {
  version: number;
  activeRouteId: string;
  routes: MemoryRoute[];
}
