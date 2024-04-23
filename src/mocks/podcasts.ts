import { IPodcast } from "../types/podcast";

import mano from "../assets/images/mano-a-mano.jpg";
import flow from "../assets/images/flow.jpg";

export const PODCAST_FOR_YOU: IPodcast[] = [
    {
        id: "1",
        name: "MANO A MANO",
        image: mano,
    },
    {
        id: "2",
        name: "FLOW PODCAST",
        image: flow,
    },
    {
        id: "3",
        name: "JOE ROGAN STUDIO",
        image: mano,
    }
]

export const PODCAST_RECENTLY_LISTENED: IPodcast[] = [
    {
        id: "4",
        name: "FLOW GAMES",
        image: flow,
    },
    {
        id: "5",
        name: "INTELIGÊNCIA LTDA",
        image: mano,
    },
]

export const PODCAST_MOST_LISTENED: IPodcast[] = [
    {
        id: "6",
        name: "CIÊNCIA SEM FIM",
        image: flow,
    },
    {
        id: "7",
        name: "CIÊNCIA SEM FIM",
        image: mano,
    },
]