import React from 'react'
import { ICard } from '../interfaces/card'

const ShowCards = ({ question, answer, category }: ICard) => {


    return <section className="section ">
        <div className="column is-one-quarter-desktop is-one-third-tablet">
            <div className="card">
                <div className="card-header">
                    <div className="card-header-title is-centered">{question}</div>
                </div>
                <div className="card-content">
                    <p>{answer}</p>
                    <span className="is-centered">{category}</span>
                    <div>
                        <button
                            type="submit"
                            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Study
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </section>
}

export default ShowCards