import { IDeck } from "./deck";

export interface ICard {
    difficulty: string;
    _id: string;
    question: string;
    answer: string;
    category: string;
    id: string, 
    deck?: IDeck,
}