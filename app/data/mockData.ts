import { MemoryPin, MemoryRoute } from "../types";

export const memoryPins: MemoryPin[] = [
  {
    id: 1,
    title: "Leaving the Battery",
    coordinates: [-79.9261, 32.7714],
    text: "Packing up the station wagon. The AC was already broken.",
    image: "/images/battery.png",
    locationName: "East Bay Street, Charleston",
    year: "1994",
    audioDuration: "1:24",
    media: {
      imageSourceType: "url",
      audioSourceType: "none",
    },
  },
  {
    id: 2,
    title: "Crossing the Connector",
    coordinates: [-79.9501, 32.7665],
    text: "Looking out over the harbor, knowing we had a week of freedom ahead.",
    image: "/images/connector.png",
    locationName: "James Island Expressway",
    year: "1994",
    audioDuration: "2:05",
    media: {
      imageSourceType: "url",
      audioSourceType: "none",
    },
  },
  {
    id: 3,
    title: "Crosby's Seafood",
    coordinates: [-79.9535, 32.7161],
    text: "Dad stopped to get shrimp for the boil. It smelled like salt and pluff mud.",
    image: "/images/crosbys.png",
    locationName: "Folly Road, Crosby's Seafood",
    year: "1994",
    audioDuration: "1:58",
    media: {
      imageSourceType: "url",
      audioSourceType: "none",
    },
    temporalPerspectives: [
      {
        id: "crosbys-1994",
        year: "1994",
        label: "Family road-trip memory",
        title: "Crosby’s Seafood, 1994",
        text: "Dad stopped to get shrimp for the boil. It smelled like salt, ice, diesel, and pluff mud. This was one of those road-trip stops that became part of the beach ritual.",
        image: "/images/crosbys_1994.jpg",
        sourceNote: "Family memory layer with uploaded era image.",
        confidence: "personal",
        hxStrength: 0.72
      },
      {
        id: "crosbys-2016",
        year: "2016",
        label: "Recent memory layer",
        title: "Crosby’s Seafood, 2016",
        text: "The place still anchors the route, but the light, signs, cars, and road rhythm have shifted. The memory is still there, just wearing a newer coat of paint.",
        image: "/images/crosbys_2016.jpg",
        sourceNote: "Uploaded 2016 reference image.",
        confidence: "reference",
        hxStrength: 0.84
      },
      {
        id: "crosbys-2024",
        year: "2024",
        label: "Current-day reference",
        title: "Crosby’s Seafood, 2024",
        text: "The modern view becomes the strongest reference layer: the same stop, same route, same coastal pull toward Folly, but sharpened by current visual evidence.",
        image: "/images/crosbys_2024.jpg",
        sourceNote: "Uploaded 2024 reference image.",
        confidence: "current-reference",
        hxStrength: 0.92
      }
    ]
  },
  {
    id: 4,
    title: "Arrival at Center Street",
    coordinates: [-79.9403, 32.6551],
    text: "We made it. 1 Center Street. You could hear the waves from the driveway.",
    image: "/images/folly_beach.png",
    locationName: "1 Center Street, Folly Beach",
    year: "1994",
    audioDuration: "3:12",
    media: {
      imageSourceType: "url",
      audioSourceType: "none",
    },
  },
];

export const defaultMemoryRoute: MemoryRoute = {
  id: "charleston-folly-1994",
  title: "The Battery to The Beach",
  description: "A nostalgic summer drive from historic East Bay Street to Folly Beach, SC.",
  era: "1994",
  author: "Family Archive",
  coverImage: "/images/battery.png",
  createdAt: "2026-06-02T12:00:00.000Z",
  updatedAt: "2026-06-02T12:00:00.000Z",
  pins: memoryPins,
  media: {
    coverImageSourceType: "url",
  },
};
