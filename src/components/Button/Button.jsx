import React from 'react'
import styles from './Button.module.scss'

export default function Button({children, action}) {
  return (
    <button className={styles.Button} onClick={action}>{children}</button>
  )
}
