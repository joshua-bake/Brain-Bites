import axios from 'axios'
import { SyntheticEvent, useState, Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { IDeck } from '../interfaces/deck'
import { baseUrl } from '../config'

type Decks = null | Array<IDeck>

const CreateCard = () => {


    const [decks, setDecks] = useState<Decks>(null)


    useEffect(() => {
        async function fetchDecks() {
            const resp = await fetch(`${baseUrl}/api/decks`)
            const data = await resp.json()
            setDecks(data)
        }
        fetchDecks()
    }, [])

    console.log(decks)
    //! need to get decks so it can map over the options
    const deckOptions = [
        { decks },

    ]

    console.log('deck options are...', deckOptions)




    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    const [selected, setSelected] = useState(deckOptions[3])


    const navigate = useNavigate()

    // ? Card Form
    const [formData, setFormData] = useState({
        question: "",
        answer: "",
        category: "",
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
            e.preventDefault() //? Prevents the page from refreshing.

            const token = localStorage.getItem('token')
            const resp = await axios.post(`${baseUrl}/api/cards`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(resp.data)
            navigate('/cards')
        } catch (e: any) {
            setErrorMessage(e.response.data.message)
        }
    }
    console.log(formData)

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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        <label htmlFor="category" className="block text-sm font-medium leading- text-gray-900">
                            Category
                        </label>
                        <div className="mt-2">
                            <input
                                id="category"
                                name="category"
                                type="text"
                                required
                                onChange={handleChange}
                                value={formData.category}
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
                            <input
                                id="deck_id"
                                name="deck_id"
                                type="text"
                                required
                                onChange={handleChange}
                                value={formData.deck_id}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                    </div>

                    <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                            <>
                                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Listbox.Label>
                                <div className="relative mt-2">
                                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                        <span className="flex items-center">

                                            {/* <span className="ml-3 block truncate">{selected.title}</span> */}
                                        </span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {deckOptions.map((option) => (
                                                <Listbox.Option
                                                    key={option.id}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                        )
                                                    }
                                                    value={deckOptions}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <div className="flex items-center">

                                                                <span
                                                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                >
                                                                    {/* {decks?.title} */}
                                                                </span>
                                                            </div>

                                                            {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                    )}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>


                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Submit Deck
                        </button>
                    </div>
                </form>
                {errorMessage && <p >{errorMessage}</p>}
            </div>
        </div>
    )
}

export default CreateCard