/* ───────────────────────────────────────────────────────
 *  REELTRACE — Demo film catalogue
 *  All data here is illustrative sample data.
 *  Images are Unsplash (free licence) placeholders.
 * ─────────────────────────────────────────────────────── */

import { Film } from "./types";

export interface DemoFilm extends Film {
  /** Searchable clues (dialogue fragments, character names, scene descriptions) */
  clues: string[];
  /** Representative dialogue or description */
  line: string;
  /** Scene description */
  moment: string;
  /** Demo timecode display */
  time: string;
  /** Short archival tag */
  tag: string;
  /** Art URL (Unsplash placeholder) */
  art: string;
}

export const demoFilms: DemoFilm[] = [
  {
    id: "dark-knight",
    title: "The Dark Knight",
    year: 2008,
    kind: "movie",
    genres: ["Action", "Thriller", "Crime"],
    overview:
      "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological and physical tests.",
    clues: [
      "why so serious",
      "joker",
      "interrogation room",
      "dark knight",
      "batman",
      "gotham",
    ],
    line: '"Why so serious?"',
    moment: "The interrogation room",
    time: "00:47:12",
    tag: "A CITY ON EDGE",
    art: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "matrix",
    title: "The Matrix",
    year: 1999,
    kind: "movie",
    genres: ["Sci-Fi", "Action"],
    overview:
      "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    clues: [
      "there is no spoon",
      "spoon",
      "red pill",
      "the matrix",
      "neo",
      "morpheus",
    ],
    line: '"There is no spoon."',
    moment: "The spoon scene",
    time: "00:54:08",
    tag: "REALITY IS FLEXIBLE",
    art: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "terminator",
    title: "The Terminator",
    year: 1984,
    kind: "movie",
    genres: ["Action", "Sci-Fi"],
    overview:
      "A human soldier is sent from the future to protect a woman from a nearly indestructible cyborg assassin.",
    clues: [
      "i'll be back",
      "ill be back",
      "terminator",
      "cyberdyne",
      "skynet",
    ],
    line: '"I\'ll be back."',
    moment: "The police station",
    time: "00:51:31",
    tag: "FUTURE / UNKNOWN",
    art: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "casablanca",
    title: "Casablanca",
    year: 1942,
    kind: "movie",
    genres: ["Drama", "Romance"],
    overview:
      "A cynical American expatriate struggles to decide whether he should help his former lover and her husband escape occupied Casablanca.",
    clues: [
      "here's looking at you",
      "looking at you",
      "airport ending",
      "casablanca",
      "play it sam",
    ],
    line: '"Here\'s looking at you, kid."',
    moment: "The airport ending",
    time: "01:37:20",
    tag: "A GOODBYE IN FOG",
    art: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "star-wars",
    title: "Star Wars: A New Hope",
    year: 1977,
    kind: "movie",
    genres: ["Sci-Fi", "Action", "Adventure"],
    overview:
      "Luke Skywalker joins forces with a Jedi Knight to save the galaxy from the Empire's ultimate weapon.",
    clues: [
      "may the force",
      "force be with you",
      "star wars",
      "the force",
      "luke",
      "darth vader",
    ],
    line: '"May the Force be with you."',
    moment: "Leaving the rebel base",
    time: "01:53:42",
    tag: "A GALAXY FAR AWAY",
    art: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "arrival",
    title: "Arrival",
    year: 2016,
    kind: "movie",
    genres: ["Sci-Fi", "Drama"],
    overview:
      "A linguist works to decipher the language of alien visitors while time itself begins to unravel.",
    clues: [
      "language",
      "aliens",
      "time loop",
      "arrival",
      "heptapod",
      "linguistics",
    ],
    line: "A message that changes the meaning of time.",
    moment: "The first contact sequence",
    time: "00:32:46",
    tag: "TIME MOVES DIFFERENTLY",
    art: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "knives-out",
    title: "Knives Out",
    year: 2019,
    kind: "movie",
    genres: ["Mystery", "Comedy", "Thriller"],
    overview:
      "A detective investigates the death of a wealthy author and the web of lies spun by his eccentric family.",
    clues: [
      "detective",
      "murder mystery",
      "knives out",
      "family mansion",
      "whodunit",
    ],
    line: "Everyone has a story. Not all of them add up.",
    moment: "The family interview",
    time: "00:28:14",
    tag: "EVERYONE IS A SUSPECT",
    art: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "pursuit",
    title: "The Pursuit of Happyness",
    year: 2006,
    kind: "movie",
    genres: ["Drama"],
    overview:
      "A struggling salesman takes custody of his son as he is poised to begin a life-changing professional career.",
    clues: [
      "happyness",
      "basketball",
      "pursuit",
      "father and son",
      "homeless",
    ],
    line: "A father leaves a lesson about protecting your dream.",
    moment: "The basketball court",
    time: "00:42:05",
    tag: "KEEP YOUR DREAM",
    art: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "grand-budapest",
    title: "The Grand Budapest Hotel",
    year: 2014,
    kind: "movie",
    genres: ["Comedy", "Drama", "Adventure"],
    overview:
      "A writer encounters the owner of an aging high-class hotel who tells the story of his early years as a lobby boy.",
    clues: [
      "grand budapest",
      "concierge",
      "pink hotel",
      "pastries",
      "lobby boy",
      "wes anderson",
    ],
    line: "A meticulously kept secret at an old hotel.",
    moment: "The lobby at dusk",
    time: "00:18:33",
    tag: "A VERY PARTICULAR HOTEL",
    art: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "mad-max",
    title: "Mad Max: Fury Road",
    year: 2015,
    kind: "movie",
    genres: ["Action", "Sci-Fi", "Adventure"],
    overview:
      "In a post-apocalyptic wasteland, two survivors team up to flee a tyrannical warlord across the desert.",
    clues: [
      "fury road",
      "desert chase",
      "mad max",
      "witness me",
      "war rig",
      "furiosa",
    ],
    line: "A chase across the desert with no time to breathe.",
    moment: "The sandstorm chase",
    time: "00:46:02",
    tag: "FULL THROTTLE",
    art: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "get-out",
    title: "Get Out",
    year: 2017,
    kind: "movie",
    genres: ["Thriller", "Mystery"],
    overview:
      "A young African-American visits his girlfriend's parents for the weekend and discovers a disturbing secret.",
    clues: [
      "get out",
      "sunken place",
      "hypnosis",
      "teacup",
      "armitage",
    ],
    line: "A familiar room begins to feel completely wrong.",
    moment: "The sunken place",
    time: "00:36:40",
    tag: "SOMETHING IS OFF",
    art: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "interstellar",
    title: "Interstellar",
    year: 2014,
    kind: "movie",
    genres: ["Sci-Fi", "Drama", "Adventure"],
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to find a habitable planet to save humanity.",
    clues: [
      "interstellar",
      "space",
      "bookshelf",
      "love transcends",
      "cooper",
      "murph",
      "black hole",
    ],
    line: "A message crosses an impossible distance.",
    moment: "The bookshelf sequence",
    time: "02:16:18",
    tag: "LOVE ACROSS DISTANCE",
    art: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=500&q=80",
  },
];

/** All unique genres present in the demo catalogue */
export const demoGenres: string[] = Array.from(
  new Set(demoFilms.flatMap((f) => f.genres))
).sort();
