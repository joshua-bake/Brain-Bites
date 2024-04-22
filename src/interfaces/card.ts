import { IDeck } from "./deck";

export interface ICard {
    _id: string;
    question: string;
    answer: string;
    category: string;
    id: string, 
    deck?: IDeck,
}