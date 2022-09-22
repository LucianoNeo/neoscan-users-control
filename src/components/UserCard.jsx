import React from 'react'
import styles from './styles.module.css'
import { FaTrash, FaBan, FaCheckCircle } from 'react-icons/fa'

export default function UserCard(props) {
    return (
        <main className={styles.card}>
            <div style={{display:'flex', alignItems:'center'}}>
                <img src="./assets/img/user-img.png" alt="" />
            </div>
            <div className={styles.texts}>
                
                <span>{props.username}</span>
                <span className={styles.cidade} >{props.cidade}</span>
            </div>
            <div className={styles.iconsContainer}>
                <FaCheckCircle className={styles.iconUnblock}
                    title='DESBLOQUEAR'
                    onClick={props.unblock}
                />
                <FaBan className={styles.icons}
                    title='BLOQUEAR'
                    onClick={props.block}
                />

                <FaTrash
                    title='DELETAR'
                    onClick={props.delete}
                    className={styles.icons}
                   
                />
                
            </div>
        </main>
    )
}
