import { useEffect, useState } from 'react'
import { ICard } from '../interfaces/card'
import { IDeck } from '../interfaces/deck'
import ShowCards from './ShowCards'
import { baseUrl } from '../config'

type Decks = null | Array<IDeck>

const CardLibrary = () => {

    const [decks, setDecks] = useState<Decks>(null);

    useEffect(() => {
        async function fetchDecks() {
            const resp = await fetch(`${baseUrl}/decks`);
            const data = await resp.json();
            setDecks(data);
        }
        fetchDecks();
    }, []);

    console.log('the decks are...', decks);

    if (!decks) {
        return (
            <div className="lds-hourglass"></div>
        );
    }

    return (
        <section className="section">
            <div className="container">
                {decks.map((deck) => (
                    <div key={deck.id} className='card-title subtitle is-flex is-flex-direction-column'>
                        <h2>{deck.title}</h2>
                        <div className="columns is-flex-wrap-wrap">
                            {deck.cards.map((card) => (
                                <ShowCards key={card.id} {...card} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CardLibrary
