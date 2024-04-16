import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"

function App() {




  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
