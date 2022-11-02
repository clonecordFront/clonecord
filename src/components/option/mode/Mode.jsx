import React, {useContext, useState} from 'react'
import styles from './Mode.module.css'
import { Darkmode } from '../../../context/DarkmodeContext';


export default function Mode() {
  const { isDark, toggleIsDark } = useContext(Darkmode)
  
  const toggleISDark = sessionStorage.setItem('KeepDarkmode',true)

  return (
    <>
      <div className={styles.modeContainer}>
        <div className={isDark ? styles.lightloginBox : styles.darkloginBox}>
          <button onClick={toggleIsDark}>다크모드</button>
        </div>
      </div>
    </>
  )
}