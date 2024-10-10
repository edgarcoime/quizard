export const collections = [
  { Name: "Software Engineering", collectionId: 1 },
  { Name: "Calculus", collectionId: 2 },
  { Name: "Operating Systems", collectionId: 3 },
  { Name: "Network security", collectionId: 4 },
];

export const cards = [
  {
    Id: 1,
    collectionName: "Software Engineering",
    cards: [
      {
        question: "What is coupling?",
        answer: "When one class is too dependent on another class",
      },
      {
        question: "What is a class diagram?",
        answer: "Diagram that shows the relationships between classes",
      },
      {
        question: "Why is a sequence diagram unique?",
        answer: "Show the time flow of a program",
      },
    ],
  },
  {
    Id: 2,
    collectionName: "Calculus",
    cards: [
      {
        question: "What does a derivative represent?",
        answer: "The slope of the original graph",
      },
    ],
  },
  {
    Id: 3,
    collectionName: "Operating Systems",
    cards: [
      {
        question: "What does SMP stand for?",
        answer: "Symmetric multi processing",
      },
    ],
  },
  {
    Id: 4,
    collectionName: "Network Security",
    cards: [
      {
        question: "What does a firewall do?",
        answer: "It helps block and monitor incoming and outgoing traffic",
      },
    ],
  },
];
