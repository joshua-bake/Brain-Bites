import { ICard } from "./card";

export interface IDeck {
    _id: string,
    title: string,
    description: string,
    category: string,
    cards: Array<ICard>
}