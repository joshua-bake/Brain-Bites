import { SyntheticEvent, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
            e.preventDefault()
            const resp = await axios.post('/api/signup', formData)
            console.log(resp.data)
            navigate('/login')
        } catch (e: any) {
            setErrorData(e.response.data.errors)
        }
    }

    console.log(errorData)

    return (
        <div>Signup</div>
    )
}

export default Signup