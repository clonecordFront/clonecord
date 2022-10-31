import React from 'react';
import styles from './Chat.module.css';

import placeholderPath from '../../../img/profile_placeholder.png';

export default function Chat({ chat }) {
  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <div className={styles.imgBox}>
          <img
            className={styles.profile_img}
            src={placeholderPath}
            alt='profile_picture'
          />
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.info}>
          <span className={styles.nickname}>{chat.sender}</span>
          <span className={styles.date}>2022.10.27</span>
        </div>
        <div className={styles.content}>{chat.message}</div>
      </div>
    </div>
  );
}
