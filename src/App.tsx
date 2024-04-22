import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import DeckLibrary from "./components/DeckLibrary"
import Study from "./components/Study"
import CreateDeck from "./components/CreateDeck"
import Signup from "./components/Signup"
import Login from "./components/Login"
import axios from "axios"
import { useEffect, useState } from "react"
import CreateCard from "./components/CreateCard"
import CardLibrary from "./components/CardLibrary"
import { baseUrl } from "./config"
import ShowCards from "./components/ShowCards"

function App() {

  const [user, setUser] = useState(null)

  async function fetchUser() {
    const token = localStorage.getItem('token')
    const resp = await axios.get(`${baseUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setUser(resp.data)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) fetchUser()
  }, [])


  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/decks' element={<DeckLibrary />} />
        <Route path='/study' element={<Study />} />
        <Route path="/study/:deckId" element={<Study />} />
        <Route path='/deck/create' element={<CreateDeck />} />
        <Route path='/cards' element={<CardLibrary />} />
        <Route path='/card/create' element={<CreateCard />} />
        <Route path="/cards/:cardId" element={<ShowCards user={user} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/login" element={<Login fetchUser={fetchUser} />} />
      </Routes>
    </Router>
  )
}

export default App
