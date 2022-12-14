import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './BtnHome.module.css'

export default function BtnHome() {
    const history = useHistory()
  return (
   <button
      className={styles.btn}
      onClick={() => history.push('/')}
   >
        Home
   </button>
  )
}
