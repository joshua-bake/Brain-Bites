import React, { useState } from 'react'
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



    return (
        <div>Signup</div>
    )
}

export default Signup