import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import PwdInput from '../components/PwdInput'
import styles from './login.module.css'
import { useContext } from 'react'
import { Context } from '../Context/AuthContext'
import { useEffect } from 'react'



export default function Login() {
    const { authenticated, handleLogin, pass, setPass } = useContext(Context)

    const navigate = useNavigate()

    useEffect(() => {
        if (authenticated) {
            navigate('/users')
        }
    }, [authenticated])

    return (
        <div className={styles.page}>
            <main className={styles.container}>
                <Logo />
                <form>
                    <PwdInput
                        value={pass}
                        onchange={(event) => setPass(event.target.value)}
                    />
                    <button
                        onClick={handleLogin}
                        type='submit'
                        className={styles.button}>Entrar</button>
                </form>
            </main>
        </div>
    )
}
