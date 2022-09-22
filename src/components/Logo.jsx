import React from 'react'
import styles from './styles.module.css'

export default function Logo() {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
            <img src='./assets/img/logo.png'/>
            <h1 className={styles.title}>NeoScan</h1>
            <h1 className={styles.title2}> USERS</h1>
        </div>
    )
}
