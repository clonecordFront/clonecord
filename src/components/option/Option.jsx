import styles from './option.module.css';
import React from 'react';

export default function Option() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.voice}>
          <div className={styles.profile}>
            <button type="button" className={styles.btn}></button>
          </div>
        </div>
      </div>
    </>
  );
}
