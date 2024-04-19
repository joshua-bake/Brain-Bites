import React from 'react'
import { IDeck } from '../interfaces/deck'
import { useNavigate } from 'react-router-dom'


const ShowDecks = ({ title, description, category }: IDeck) => {

    // ? Button on Decks to open and show cards. Like Product page.
    // ? On Deck page, map and show Cards

const navigate = useNavigate()

    function handleClick() {
        navigate('/cards')
    }


    return <section className="section ">
        <div className="column is-one-quarter-desktop is-one-third-tablet">
            <div className="card">
                <div className="card-header">
                    <div className="card-header-title is-centered">{title}</div>
                </div>
                <div className="card-content">
                    <p>{description}</p>
                    <span className="is-centered">{category}</span>
                    <div>
                        <button
                            type="submit"
                            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Study
                        </button>
                    </div>
                    <div>
                        <button
                            type="submit"
                            onClick={handleClick}
                            className="flex justify-center rounded-md bg-lime-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Cards
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </section>


}

export default ShowDecks