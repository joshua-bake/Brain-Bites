import { useEffect } from "react"


const Home = () => {


    useEffect(() => {
        console.log('Home Page Mounted')
    }, [])





    return (
        <div className="text-3xl font-bold underline homepage">Welcome to Home</div>
    )
}

export default Home