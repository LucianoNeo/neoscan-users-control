import React from 'react'
import { FaMap } from 'react-icons/fa'
import styles from './styles.module.css'

export default function CityInput(props) {
    return (
        <div style={{ transform: 'translateX(-10px)' }}>
            <FaMap className={styles.icons} />
            <input type="text" name="user" id="user" autoComplete='off' 
            value={props.value}
            onChange={props.onchange}
            />
        </div>
    )
}
