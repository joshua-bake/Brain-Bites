import { IDeck } from '../interfaces/deck';
import { useNavigate } from 'react-router-dom';

const ShowDecks = ({ id, title, description, category }: IDeck) => {
    const navigate = useNavigate();

    const handleStudyClick = () => {
        navigate(`/study?deckId=${id}`)
    }

    return <div className="column is-one-quarter-desktop is-one-third-tablet">
        <div className="card ">
            <div className="card-header">
                <div className="card-header-title text-xl is-centered">{title}</div>
            </div>
            <div className="card-image">
                <div className="card-content">
                    <p className="has-text-centered text-lg pb-4">Description: {description} <br />
                        Category: {category}</p>
                    <button
                        type="button"
                        onClick={handleStudyClick}
                        className=" card-footer flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Study
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default ShowDecks;
