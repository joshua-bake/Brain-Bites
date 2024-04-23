import { useEffect } from "react"
import home_image from '../assets/brain-bites-high-resolution-logo.jpeg'

const Home = () => {

    useEffect(() => {
        console.log('Home Page Mounted')
    }, [])

    return (
        <section className="hero home-bg is-fullheight">
            <div className="hero-body columns">
                <div className="column is-two-thirds">
                    <p className="title">Fullheight hero</p>
                    <p className="subtitle">Fullheight subtitle</p>
                </div>
                <div className="column ">
                    <img className='hero-image' src={home_image} alt="home logo" />
                </div>
            </div>
        </section>
    )
}

export default Home