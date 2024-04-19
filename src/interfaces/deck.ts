import { ICard } from "./card";

export interface IDeck {
    id: string | number | readonly string[] | undefined;
    _id: string,
    title: string,
    description: string,
    category: string,
    cards: Array<ICard>
}