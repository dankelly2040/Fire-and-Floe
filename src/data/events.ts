export type Event = {
  id: string;
  title: string;
  description: string;
  details: string;
  image: number;
  date: string;
};

export const EVENTS: Event[] = [
  {
    id: "oysters",
    title: "Oysters & Chowder",
    description:
      "Sauna session paired with fresh oysters and chowder from the Salish Sea. A community gathering by the water.",
    details:
      "Gather around the fire after your sauna session for fresh-shucked oysters and warm chowder sourced from the Salish Sea. A celebration of local waters, shared with the Fire + Floe community.",
    image: require("@/assets/event-oysters.jpg"),
    date: "Check schedule",
  },
  {
    id: "smores",
    title: "Sauna & S'mores",
    description:
      "Wind down with a sauna session followed by handmade s'mores by the fire. Perfect for families and friends.",
    details:
      "The classic campfire treat meets contrast therapy. After your session, settle in by the fire with handmade s'mores. A relaxed evening that's perfect for families and friends.",
    image: require("@/assets/event-smores.jpeg"),
    date: "Check schedule",
  },
  {
    id: "moonlight",
    title: "Moonlight Sauna",
    description:
      "Experience the sauna under the moon. A serene evening session with views of the night sky over Bainbridge Island.",
    details:
      "An after-dark session under the open sky. Ebb between the heat of the sauna and the cool night air of Puget Sound, with the moon and stars overhead. Our most serene event.",
    image: require("@/assets/event-moonlight.jpg"),
    date: "Check schedule",
  },
];
