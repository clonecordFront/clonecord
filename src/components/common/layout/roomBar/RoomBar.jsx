import React from 'react';
import styles from './RoomBar.module.css';

export default function RoomBar() {
  // userSlice에서 해당 유저가 구독 중인 채팅방 리스트 가져와야함
  return (
    <section className={styles.roomList}>
      <div className={`${styles.Logo} ${styles.main}`}>
        <i className='fa-brands fa-discord'></i>
      </div>
      <hr className={styles.line} />

      <ul>
        {/* roomlist by username  */}
        <div className={`${styles.Logo} ${styles.temp}`}>
          <i className='fa-solid fa-comments'></i>
        </div>
      </ul>

      <div className={`${styles.Logo} ${styles.plus}`}>
        <i className='fa-solid fa-plus'></i>
      </div>
    </section>
  );
}
