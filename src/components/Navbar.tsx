import { Link, useNavigate } from 'react-router-dom'
import { IUser } from '../interfaces/user'

const Navbar = ({ user, setUser }: { user: IUser | null, setUser: Function }) => {

    console.log('user in the navebar', user)
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem('token')
        setUser(null)
        navigate('/home')
    }



    return (
        <>
            <header>
                <nav>
                    <div>
                        <div>
                            <Link to='/home'>Home</Link>
                            <Link to='/decks'>Deck Library</Link>
                            <Link to='/study'>Study</Link>
                            <Link to='/create'>Create FlashCards</Link>
                            <Link to='/signup'>Signup</Link>
                            <Link to='/login'>Login</Link>
                        </div>
                    </div>
                </nav>
            </header>

        </>
    )
}

export default Navbar