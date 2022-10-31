import React, { useContext } from 'react';
import { UserDisplayContext } from '../../../../context/UserDisplayContext';
import styles from './RoomHeader.module.css';

export default function RoomHeader(props) {
  const { toggleIsUserDisplay } = useContext(UserDisplayContext);

  return (
    <div className={styles.box}>
      <div className={styles.name}>채널명예정</div>

      <div className={styles.search}>
        {/* search box */}
        <div className={styles.btnSet}>
          {/* <i className="fa-solid fa-bell-slash"></i> */}
          <button className={styles.barBtn}>
            <i className='fa-solid fa-bell'></i>
          </button>
          <button className={styles.barBtn} onClick={toggleIsUserDisplay}>
            <i className='fa-solid fa-user-group'></i>
          </button>
        </div>

        <input type='text' placeholder='검색하기' className={styles.input} />
      </div>
    </div>
  );
}
