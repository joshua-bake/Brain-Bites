import { ICard } from "./card";

export interface IDeck {
    _id: string,
    title: string,
    description: string,
    categories: string,
    cards: Array<ICard>
}