import { useEffect, useState } from 'react'
import { IDeck } from '../interfaces/deck'
import { ICard } from '../interfaces/card'

type Cards = null | Array<ICard>
type Decks = null | Array<IDeck>


const DeckLibrary = () => {

    const [decks, setDecks] = useState<Decks>(null)
    

    useEffect(() => {
        async function fetchDecks() {
            const resp = await fetch('/api/decks')
            const data = await resp.json()
            setDecks(data)
        }
        fetchDecks()
    }, [])



    console.log(decks)
    
    const [cards, setCards] = useState<Cards>(null)

    useEffect(() => {
        async function fetchCards() {
            const resp = await fetch('/api/cards')
            const data = await resp.json()
            setCards(data)
        }
        fetchCards()
    }, [])

    console.log(cards)

    if (!cards) {
        return <div>
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    }

    // ? We have decks now, need to figure a stylistic way to display them.

    if (!decks) {
        return <div>
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    }



    return <section className='section'>
        <div className="container">
            <div>
                {decks.title}
            </div>
        </div>
    </section>
}

export default DeckLibrary