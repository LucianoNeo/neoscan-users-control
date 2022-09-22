import React from 'react'
import styles from './login.module.css'
import {FaUser , FaLock} from 'react-icons/fa'
import Logo from '../components/Logo'
import UserInput from '../components/UserInput'
import PwdInput from '../components/PwdInput'


export default function Login() {
    return (
        <div className={styles.page}>
        <main className={styles.container}>
            <Logo/>
            <form>
            <UserInput/>
            <PwdInput/>
            
            <button className={styles.button}>Entrar</button>
            </form>
        </main>
        </div>
    )
}
