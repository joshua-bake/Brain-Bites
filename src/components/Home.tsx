import { useEffect } from "react"
import home_image from '../assets/brain-bites-high-resolution-logo.jpeg'

const Home = () => {

    useEffect(() => {
        console.log('Home Page Mounted')
    }, [])

    return (
        <section className="hero home-bg is-fullheight">
            <div className="hero-body columns">
                <div className="column is-half is-offset-1">
                    <h1 className="title">Brain Bites</h1>
                    <br />
                    <article className="subtitle text-justify leading-loose">Your personalized study companion with spaced repetition. <br /> Custom Flashcards: Tailor-made for your learning needs.
                        <br /> Smart Review System: Optimize learning with spaced repetition.
                        <br />Progress Tracker: Visualize your growth with insightful reports. <br />Unlock the power of spaced repetition with Brain Bites. <br />
                        Study smarter, not harder. Start your journey today.</article>
                </div>
                <div className="column ">
                    <img className='hero-image' src={home_image} alt="home logo" />
                </div>
            </div>
        </section>
    )
}

export default Home