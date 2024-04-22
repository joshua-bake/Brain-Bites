export interface ICard {
    _id: string;
    question: string;
    answer: string;
    category: string;
    deck: {
        _id: string;
        title: string;
        // Add any other properties of the deck here
    };
}