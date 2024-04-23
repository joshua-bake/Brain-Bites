import { SyntheticEvent, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../config'

const Signup = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        passwordConfirmation: ""
    })

    const [errorData, setErrorData] = useState({
        email: "",
        username: "",
        password: "",
        passwordConfirmation: ""
    })

    function handleChange(e: any) {
        const fieldName = e.target.name
        const newFormData = structuredClone(formData)
        newFormData[fieldName as keyof typeof formData] = e.target.value
        setFormData(newFormData)
    }

    async function handleSubmit(e: SyntheticEvent) {
        try {
            // e.preventDefault()
            const resp = await axios.post(`${baseUrl}/signup`, formData)
            console.log(resp.data)
            navigate('/login')
        } catch (e: any) {
            setErrorData(e.response.data.errors)
        }
    }

    console.log(errorData)

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 signup-bg signup-color">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight signup-color">
                    Create an Account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="login" method="POST" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-base font-medium leading-6 signup-color">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="username"
                                autoComplete="username"
                                required
                                onChange={handleChange}
                                value={formData.username}
                                className="block w-full rounded-md border-0 py-1.5 signup-color shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-base font-medium leading-6 signup-color">
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
                                className="block w-full rounded-md border-0 py-1.5 signup-color shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-base font-medium leading-6 signup-color">
                                Password
                            </label>
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
                                className="block w-full rounded-md border-0 py-1.5 signup-color shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                            />
                        </div>
                    </div>
                    {errorData.password && <p>{errorData.password}</p>}
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-base font-medium leading-6 signup-color">
                                Password Confirmation
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="passwordConfirmation"
                                name="passwordConfirmation"
                                type="password"
                                autoComplete="current-password"
                                required
                                onChange={handleChange}
                                value={formData.passwordConfirmation}
                                className="block w-full rounded-md border-0 py-1.5 signup-color shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                            />
                        </div>
                    </div>
                    {errorData.passwordConfirmation && <p>{errorData.passwordConfirmation}</p>}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
                {/* {errorData && <p >{errorDa}</p>} */}
                <p className="mt-10 text-center text-base text-gray-500">
                    Already a member?{' '}
                    <a href="login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Login Here!
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Signup