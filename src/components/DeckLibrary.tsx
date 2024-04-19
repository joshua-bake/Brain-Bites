import { useEffect, useState } from 'react'
import { IDeck } from '../interfaces/deck'
import ShowDecks from './ShowDecks'
import { baseUrl } from '../config'

type Decks = null | Array<IDeck>


const DeckLibrary = () => {

    const [decks, setDecks] = useState<Decks>(null)


    useEffect(() => {
        async function fetchDecks() {
            const resp = await fetch(`${baseUrl}/decks`)
            const data = await resp.json()
            setDecks(data)
        }
        fetchDecks()
    }, [])

    console.log(decks)

    // ? We have decks now, need to figure a stylistic way to display them.

    if (!decks) {
        return <div>
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    }

    return <section className='section'>
        <div className="container">
            <div className="">
                {decks?.map(deck => {
                    return <ShowDecks
                        key={deck._id}
                        {...deck}
                    />
                })}
            </div>
        </div>
    </section>
}

export default DeckLibrary