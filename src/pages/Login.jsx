import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import PwdInput from '../components/PwdInput'
import styles from './login.module.css'




export default function Login() {

    const [pass, setPass] = useState('')
    const navigate = useNavigate()


    function handleEnter(e) {
        e.preventDefault()
        if (!pass) {
            return alert('A senha é obrigatória!')
        }
        if (pass !== import.meta.env.VITE_PASSWORD) {
            setPass('')
            return alert('Senha Incorreta!')

        }
        navigate('/users')
    }

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
                        onClick={handleEnter}
                        type='submit'
                        className={styles.button}>Entrar</button>
                </form>
            </main>
        </div>
    )
}
