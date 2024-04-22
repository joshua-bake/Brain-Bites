import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../config';
import { ICard } from '../interfaces/card';
import { useNavigate } from 'react-router-dom';
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'


//! fix flashcard need animation to flip, need front and back separate style to a flashcard

const FlashcardStudy = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState<ICard[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [viewedCards, setViewedCards] = useState<ICard[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [open, setOpen] = useState(true)

    const cancelButtonRef = useRef(null)

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const deckId = searchParams.get('deckId');

        if (deckId) {
            fetchCards(deckId);
        }
    }, []);

    const fetchCards = async (deckId: string) => {
        try {
            const response = await axios.get(`${baseUrl}/cards/deck/${deckId}`);
            setCards(response.data);
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNextCard = (difficulty: string) => {
        if (cards.length === 0) return;
        const currentCard = cards[currentIndex];
        currentCard.difficulty = difficulty; // Assign difficulty to the current card
        setViewedCards([...viewedCards, currentCard]);
        const nextIndex = (currentIndex + 1) % cards.length;
        setCurrentIndex(nextIndex);
        setIsFlipped(false);
    };


    const handleEndOfStudy = () => {
        setShowResults(true);
    };

    const handleRestartStudy = () => {
        setCurrentIndex(0);
        setViewedCards([]);
        setShowResults(false);
    };

    function handleReturnToDeck() {
        navigate('/decks');
    }

    return (
        <div className="flashcard-study card">
            {showResults ? (
                <div className="results">
                    <Transition.Root show={open} as={Fragment}>
                        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    >
                                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                <div className="sm:flex sm:items-start">

                                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                            Results:
                                                        </Dialog.Title>
                                                        <div className="mt-2 sm:ml-4 sm:mt-0 sm:text-left">
                                                            <h3 className="text-lg text-gray-500 leading-6">Total Cards Studied: {viewedCards.length}</h3>
                                                            <h3 className="text-lg text-gray-500 leading-6">Hard/Challenging Cards: {viewedCards.filter(card => card.difficulty === 'hard' || card.difficulty === 'challenging').length}</h3>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                    onClick={handleReturnToDeck}
                                                >
                                                    Return to Deck Library
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    onClick={handleRestartStudy}
                                                    ref={cancelButtonRef}
                                                >
                                                    Restart Study
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition.Root>
                    <h2>Results:</h2>
                    <p>Total Cards Studied: {viewedCards.length}</p>
                    <p>Hard/Challenging Cards: {viewedCards.filter(card => card.difficulty === 'hard' || card.difficulty === 'challenging').length}</p>
                    <div className="controls card-footer">
                        <button onClick={handleRestartStudy} className='mx-4'>Restart Study</button>
                        <button onClick={handleReturnToDeck} className='mx-4'>Return to Deck Library</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="study-progress">
                        <p>Studied: {viewedCards.length}</p>
                        <p>Remaining: {cards.length - viewedCards.length}</p>
                    </div>
                    <div className='card-grid'>
                        <div className={`card flashcard-inner ${isFlipped ? 'flipped' : ''}`} >
                            {cards.length > 0 ? (
                                <div className="flashcard">
                                    <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
                                        <div onClick={handleFlip} className="flip-button card-header mx-4">
                                            <button>Flip Card</button>
                                        </div>
                                        <div onClick={() => setIsFlipped(!isFlipped)} className="flashcard-front card-content text-center">
                                            <h2>Front</h2>
                                            <p>{cards[currentIndex]?.question}</p>
                                        </div>
                                    </div>
                                    <div onClick={() => setIsFlipped(!isFlipped)} className="flashcard-back card-content text-center">
                                        <h2>Back</h2>
                                        <p>{cards[currentIndex]?.answer}</p>
                                    </div>
                                </div>
                            ) : (
                                <p>No flashcards available.</p>
                            )}
                            <div className="controls has-text-centered">
                                <button onClick={() => handleNextCard('easy')} className='mx-4'>Easy</button>
                                <button onClick={() => handleNextCard('medium')} className='mx-4'>Medium</button>
                                <button onClick={() => handleNextCard('hard')} className='mx-4'>Hard</button>
                                <button onClick={() => handleNextCard('challenging')} className='mx-4'>Challenging</button>
                            </div>
                            <div className="controls has-text-centered">
                                <button onClick={handleEndOfStudy} className='mx-4 pt-4'>End Study Session</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FlashcardStudy;

