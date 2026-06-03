export interface MemoryPin {
  id: number;
  title: string;
  coordinates: [number, number]; // [longitude, latitude]
  text: string;
  image: string;
  locationName: string;
  year: string;
  audioDuration: string;
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
}

export interface RouteLibrary {
  version: number;
  activeRouteId: string;
  routes: MemoryRoute[];
}
