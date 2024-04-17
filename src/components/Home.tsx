import { useEffect } from "react"


const Home = () => {

    useEffect(() => {
        console.log('Home Page Mounted')
    }, [])

    return (
        <div>Welcome to Home</div>
    )
}

export default Home