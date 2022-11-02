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
              src={
                chat.member
                  ? chat.member.profilePic
                    ? chat.member.profilePic
                    : placeholderPath
                  : placeholderPath
              }
              alt='profile_picture'
            />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.info}>
            <span className={styles.nickname}>
              {chat.member && chat.member.nickname}
            </span>
            <span className={styles.date}>
              {chat.modifiedAt && chat.modifiedAt.slice(0, 10)}
            </span>
          </div>
          <div className={styles.content}>{chat.message}</div>
        </div>
      </div>
    </li>
  );
}
