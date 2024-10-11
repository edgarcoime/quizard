const adjectives = [
  "adventurous",
  "affectionate",
  "agreeable",
  "ambitious",
  "amusing",
  "awesome",
  "brave",
  "brilliant",
  "calm",
  "charming",
  "cheerful",
  "clever",
  "compassionate",
  "confident",
  "considerate",
  "courageous",
  "creative",
  "dazzling",
  "delightful",
  "diligent",
  "dynamic",
  "eager",
  "efficient",
  "elegant",
  "energetic",
  "enthusiastic",
  "excellent",
  "extraordinary",
  "faithful",
  "fantastic",
  "fearless",
  "friendly",
  "funny",
  "generous",
  "gentle",
  "glorious",
  "graceful",
  "happy",
  "helpful",
  "honest",
  "hopeful",
  "imaginative",
  "incredible",
  "inspired",
  "joyful",
  "kind",
  "lovable",
  "luminous",
  "motivated",
  "optimistic",
  "passionate",
];

const animalNouns = [
  "dolphin",
  "eagle",
  "lion",
  "tiger",
  "butterfly",
  "unicorn",
  "elephant",
  "panda",
  "penguin",
  "cheetah",
  "giraffe",
  "kangaroo",
  "peacock",
  "swan",
  "falcon",
  "wolf",
  "fox",
  "whale",
  "koala",
  "leopard",
  "panther",
  "owl",
  "hawk",
  "otter",
  "raven",
  "zebra",
  "jaguar",
  "lizard",
  "seal",
  "gazelle",
  "rabbit",
  "orca",
  "sparrow",
  "flamingo",
  "parrot",
  "hippo",
  "bison",
  "beaver",
  "puma",
  "lynx",
  "gecko",
  "stallion",
  "hummingbird",
  "phoenix",
  "armadillo",
  "badger",
  "meerkat",
  "walrus",
  "mongoose",
  "tapir",
  "ibis",
];

function getRandomElement(array: string[]): string {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomUsername() {
  const adjective = getRandomElement(adjectives);
  const animal = getRandomElement(animalNouns);
  const number = getRandomNumber(1, 1000);
  return `${adjective}${animal}${number}`;
}