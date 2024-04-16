import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {





    return (
        <>
            <header>
                <nav>
                    <div>
                        <div>
                            <Link to='/home'>
                                Home
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

        </>
    )
}

export default Navbar