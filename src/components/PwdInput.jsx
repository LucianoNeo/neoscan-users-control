import React from 'react'
import { FaLock } from 'react-icons/fa'
import styles from './styles.module.css'

export default function PwdInput(props) {
  return (
    <div style={{ transform: 'translateX(-10px)' }}>
      <FaLock className={styles.icons} />
      <input type="password" name="password" id="password" autoComplete='off' 
      value={props.value}
      onChange={props.onchange}
      />
    </div>
  )
}
