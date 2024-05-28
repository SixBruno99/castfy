import { IEpisodes } from "../types/episode";

import mano from "../assets/images/mano-a-mano.jpg";
import flow from "../assets/images/flow.jpg";

export const FAVORITES: IEpisodes[] = [
  {
    id: "1",
    title: "MANO A MANO",
    image: {
      url: mano,
    },
  },
];

export const PODCAST_FOR_YOU: IEpisodes[] = [
  {
    id: "1",
    title: "MANO A MANO",
    image: {
      url: mano,
    },
  },
  {
    id: "2",
    title: "FLOW PODCAST",
    image: {
      url: flow,
    },
  },
  {
    id: "3",
    title: "JOE ROGAN STUDIO",
    image: {
      url: mano,
    },
  },
];

export const PODCAST_RECENTLY_LISTENED: IEpisodes[] = [
  {
    id: "4",
    title: "FLOW GAMES",
    image: { url: flow },
  },
  {
    id: "5",
    title: "INTELIGÊNCIA LTDA",
    image: { url: mano },
  },
];

export const PODCAST_MOST_LISTENED: IEpisodes[] = [
  {
    id: "6",
    title: "CIÊNCIA SEM FIM",
    image: { url: flow },
  },
  {
    id: "7",
    title: "CIÊNCIA SEM FIM",
    image: { url: mano },
  },
];
