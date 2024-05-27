import React from 'react';
import styles from './Chat.module.css';

import placeholderPath from '../../../img/profile_placeholder.png';

export default function Chat({ chat }) {
  return (
    <li>
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
            <span className={styles.nickname}>{chat && chat.name}</span>
            <span className={styles.date}>
              {chat.timestamp &&
                `${chat.timestamp.slice(0, 10)}　${chat.timestamp.slice(
                  11,
                  19
                )}`}
            </span>
          </div>
          <div className={styles.content}>{chat.message}</div>
        </div>
      </div>
    </li>
  );
}
