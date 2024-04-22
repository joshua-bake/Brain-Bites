import { ICard } from "./card";

export interface IDeck {
    id: string | number; // Ensure that id is of type string or number
    _id: string;
    title: string;
    description: string;
    category: string;
    cards: ICard[]; // Use the ICard interface for the cards property
}
