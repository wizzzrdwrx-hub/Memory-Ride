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
  version: number;
  pins: MemoryPin[];
  title?: string;
  description?: string;
}
