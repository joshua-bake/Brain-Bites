import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../config';

const FlashcardStudy = () => {
    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [viewedCards, setViewedCards] = useState([]);

    useEffect(() => {
        // Fetch flashcards data from the backend API
        axios.get(`${baseUrl}/cards`)
            .then(response => {
                setCards(response.data);
            })
            .catch(error => {
                console.error('Error fetching flashcards:', error);
            });
    }, []);

    console.log('the cards are .... ', cards)

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNextCard = (difficulty) => {
        // Add current card to viewedCards array
        setViewedCards([...viewedCards, cards[currentIndex]]);

        // Move to the next card
        const nextIndex = (currentIndex + 1) % cards.length;
        setCurrentIndex(nextIndex);
        setIsFlipped(false); // Reset flip state
    };

    return (
        <div className="flashcard-study card">
            {cards.length > 0 ? (
                <div className="flashcard">
                    <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
                        <div>
                            <div className="flashcard-front card-content">
                                <h2>Front</h2>
                                <p>{cards[currentIndex].question}</p>
                            </div>
                            <div className="flashcard-back card-content">
                                <h2>Back</h2>
                                <p>{cards[currentIndex].answer}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No flashcards available.</p>
            )}
            <div className="controls card-footer">
                <button onClick={() => handleNextCard('easy')} className='mx-4'>Easy</button>
                <button onClick={() => handleNextCard('medium')} className='mx-4'>Medium</button>
                <button onClick={() => handleNextCard('hard')} className='mx-4'>Hard</button>
                <button onClick={() => handleNextCard('challenging')} className='mx-4'>Challenging</button>
            </div>
        </div>
    );
};

export default FlashcardStudy;
