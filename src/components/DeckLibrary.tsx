import { useEffect, useState } from 'react'
import { IDeck } from '../interfaces/deck'


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

    // ? We have decks now, need to figure a stylistic way to display them.

    if (!decks) {
        return <div>
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    }


    return (
        <div>DeckLibrary</div>
    )
}

export default DeckLibrary