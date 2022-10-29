import React from 'react';
import styles from './RoomBar.module.css';

export default function RoomBar(props) {
  return (
    <section className={styles.roomList}>
      <div className={styles.mainLogo}>
        <i className='fa-brands fa-discord'></i>
      </div>
      <hr className={styles.line} />

      {/* roomlist by username  */}
    </section>
  );
}
