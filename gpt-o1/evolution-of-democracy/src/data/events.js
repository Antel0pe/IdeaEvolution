// src/data/events.js

export const events = [
  {
    id: 0,
    date: -508,
    title: "Birth of Athenian Democracy",
    text: "In 508 BCE, Cleisthenes introduced political reforms in Athens, laying the foundation for the first known democracy. Citizens could participate directly in decision-making.",
    image: "https://example.com/athens-democracy.jpg",
    video: "https://www.youtube.com/embed/your-video-id",
    links: [
      { label: "Learn More about Cleisthenes", url: "https://en.wikipedia.org/wiki/Cleisthenes" },
      { label: "History of Athenian Democracy", url: "https://www.history.com/topics/ancient-history/cleisthenes" },
    ],
    locations: [
      {
        position: [37.9838, 23.7275],
        label: "Athens, Greece",
      },
    ],
    relatedEvents: [1],
    theme: "Political Reforms",
  },
  {
    id: 1,
    date: 1215,
    title: "Signing of the Magna Carta",
    text: "The Magna Carta was signed in 1215, limiting the powers of the English monarchy and establishing legal rights for nobles, influencing future democratic documents.",
    image: "https://example.com/magna-carta.jpg",
    video: "",
    links: [
      { label: "Magna Carta Explained", url: "https://en.wikipedia.org/wiki/Magna_Carta" },
      { label: "Historical Significance", url: "https://www.history.com/topics/magna-carta" },
    ],
    locations: [
      {
        position: [51.4394, -0.5592],
        label: "Runnymede, England",
      },
    ],
    relatedEvents: [0, 2],
    theme: "Legal Reforms",
  },
  // ... Continue adding themes to other events
];
