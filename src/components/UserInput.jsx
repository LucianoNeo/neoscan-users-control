import React from 'react'
import { FaUser } from 'react-icons/fa'
import styles from './styles.module.css'

export default function UserInput(props) {
    return (
        <div style={{ transform: 'translateX(-10px)' }}>
            <FaUser className={styles.icons} />
            <input type="text" name="user" id="user" autoComplete='off'
                value={props.value}
                onChange={props.onchange}
            />
        </div>
    )
}
