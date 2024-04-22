import axios from 'axios'
import { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../config'

const Login = ({ fetchUser }: { fetchUser: Function }) => {
    // ? Password reset stretch goal

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState("")

    function handleChange(e: any) {
        const fieldName = e.target.name
        const newFormData = structuredClone(formData)
        newFormData[fieldName as keyof typeof formData] = e.target.value
        setFormData(newFormData)
        setErrorMessage("")
    }

    async function handleSubmit(e: SyntheticEvent) {
        try {
            e.preventDefault() //? Prevents the page from refreshing
            const resp = await axios.post(`${baseUrl}/login`, formData)
            localStorage.setItem('token', resp.data.token)
            console.log(resp.data)
            fetchUser()
            navigate('/decks')
        } catch (e: any) {
            setErrorMessage(e.response.data.message)
        }
    }

    console.log(formData)

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 login-bg login-color">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight login-color ">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="decks" method="POST" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-base font-medium leading-6 ">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                onChange={handleChange}
                                value={formData.email}
                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-base font-medium leading-6 ">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                onChange={handleChange}
                                value={formData.password}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                {errorMessage && <p >{errorMessage}</p>}
                <p className="mt-10 text-center text-base text-gray-500">
                    Not a member?{' '}
                    <a href="signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign Up Today!
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login