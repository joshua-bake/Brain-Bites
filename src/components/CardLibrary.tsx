import { useEffect, useState } from 'react'
import { ICard } from '../interfaces/card'
import ShowDecks from './ShowDecks'
import ShowCards from './ShowCards'

type Cards = null | Array<ICard>


const CardLibrary = () => {

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


    return <section className='section'>
        <div className="container">
            <div className="">
                {cards?.map(card => {
                    return <ShowCards
                        key={card._id}
                        {...card}
                    />

                })}
            </div>
        </div>
    </section>
}

export default CardLibrary