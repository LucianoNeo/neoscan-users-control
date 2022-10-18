import React, { createContext, useState } from "react";
import axios from 'axios'
import { useEffect } from "react";


const Context = createContext()

function AuthProvider({ children }) {

    const [authenticated, setAuthenticaded] = useState(false)
    const [pass, setPass] = useState('')
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            axios.defaults.headers.common["x-access-token"] = `${JSON.parse(token)}`
            setAuthenticaded(true)
        }
        setLoading(false)

    }, [])

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const response = await
                axios.post(`${import.meta.env.VITE_API_ADDRESS}/login`, { password: pass },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
            const token = response.data.token
            localStorage.setItem('token', JSON.stringify(token))
            axios.defaults.headers.common["x-access-token"] = `${token}`
            setAuthenticaded(true)
        } catch (error) {
            console.log(error)
            setPass('')
            return alert('Senha Incorreta!')
        }

    }

    function handleLogOut() {
        localStorage.removeItem('token')
        setAuthenticaded(false)
        axios.defaults.headers.common["x-access-token"] = undefined
    }


    if (loading) {
        return <h1>Loading</h1>
    }



    return (
        <Context.Provider value={{ authenticated, handleLogin, pass, setPass, handleLogOut }}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider }