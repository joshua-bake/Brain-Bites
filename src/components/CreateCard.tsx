import axios from 'axios'
import { SyntheticEvent, useState, Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IDeck } from '../interfaces/deck'
import { baseUrl } from '../config'

type Decks = null | Array<IDeck>

const CreateCard = () => {

    const updateDeckId = (deckId: string) => {
        setFormData(prevState => ({
            ...prevState,
            deck_id: deckId
        }));
        setErrorMessage("");
    };

    function handleDeckIdChange(e: any) {
        const deckId = e.target.value;
        updateDeckId(deckId);
    }


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

    const navigate = useNavigate()

    // ? Card Form
    const [formData, setFormData] = useState({
        question: "",
        answer: "",
        deck_id: "",
    })

    const [errorMessage, setErrorMessage] = useState("")

    function handleChange(e: any) {
        const fieldName = e.target.name
        const newFormData = structuredClone(formData)
        newFormData[fieldName as keyof typeof formData] = e.target.value
        setFormData(newFormData)
        setErrorMessage("")
    }

    async function handleSubmit(e: SyntheticEvent) {
        try {
            e.preventDefault()

            const token = localStorage.getItem('token')
            const resp = await axios.post(`${baseUrl}/cards`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(resp.data)
            navigate('/cards')
        } catch (e: any) {
            setErrorMessage(e.response?.data?.message || "An error occurred while submitting the form.")
        }
    }
    console.log(formData)

if (!decks) {
    return (
        <div className="lds-hourglass"></div>
    )
}

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create Your Cards
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="decks" method="POST" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="question" className="block text-sm font-medium leading- text-gray-900">
                            Question
                        </label>
                        <div className="mt-2">
                            <input
                                id="question"
                                name="question"
                                type="text"
                                required
                                onChange={handleChange}
                                value={formData.question}
                                className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="answer" className="block text-sm font-medium leading- text-gray-900">
                            Answer
                        </label>
                        <div className="mt-2">
                            <input
                                id="answer"
                                name="answer"
                                type="text"
                                required
                                onChange={handleChange}
                                value={formData.answer}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="deck_id" className="block text-sm font-medium leading-6 text-gray-900">
                                Add to Deck:
                            </label>
                        </div>
                        <div className="mt-2">
                            <label>
                                <select name="deck_id" value={formData.deck_id} onChange={handleDeckIdChange}>
                                    <option value="">Select a Deck</option>
                                    {decks?.map(deck => (
                                        <option key={deck.id} value={deck.id}>{deck.title}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        
                    </div>


                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Submit Card
                        </button>
                    </div>
                </form>
                {errorMessage && <p >{errorMessage}</p>}
            </div>
        </div>
    )
}

export default CreateCard