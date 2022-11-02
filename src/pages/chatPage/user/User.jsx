import React from 'react';
import styles from './User.module.css';

import placeholderPath from '../../../img/profile_placeholder.png';

export default function User({ user }) {
  return (
    <li>
      <div className={styles.box}>
        <div className={styles.imgBox}>
          <img
            className={styles.profile_img}
            src={user.profilePic ? user.profilePic : placeholderPath}
            alt='user profile img'
          />
        </div>
        <p>{user.nickname}</p>
      </div>
    </li>
  );
}
