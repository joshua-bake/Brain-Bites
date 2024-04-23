import React from 'react'
import { ICard } from '../interfaces/card'

const ShowCards = ({ question, answer, category, deck, }: ICard) => {



    return <div className="column is-one-quarter-desktop is-one-third-tablet">
        <div className="card ">
            <div className="card-header">
                {/* {deck && <div className="card-header-title is-centered">Deck: {deck.title}</div>} */}
            </div>
            <div className="card-image">
                <div className="card-content">
                    <p className="has-text-centered is-size-6 pb-4">Question: {question} <br />
                        Answer: {answer}</p>
                </div>
                <div>

                </div>
            </div>
        </div>

    </div>

}

export default ShowCards
