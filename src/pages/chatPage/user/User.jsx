import React from 'react';
import styles from './User.module.css';

import placeholderPath from '../../../img/profile_placeholder.png';

export default function User({ user }) {
  return (
    <div className={styles.box}>
      <div className={styles.imgBox}>
        <img
          className={styles.profile_img}
          src={placeholderPath}
          alt='user profile img'
        />
      </div>
      <p>FrontMan</p>
    </div>
  );
}
