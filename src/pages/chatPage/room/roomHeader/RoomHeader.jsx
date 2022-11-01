import React, { useContext, useState } from 'react';
import { UserDisplayContext } from '../../../../context/UserDisplayContext';
import styles from './RoomHeader.module.css';

export default function RoomHeader(props) {
  const [dropOpen, setDropOpen] = useState(false);
  const { isUserDisplay, toggleIsUserDisplay } = useContext(UserDisplayContext);

  const toggleDrop = () => {
    setDropOpen((prev) => !prev);
  };

  return (
    <div className={styles.box}>
      <div className={styles.name} onClick={toggleDrop}>
        <span>채널명예정</span>
        <div
          className={styles.nameBtn}
          style={{
            color: dropOpen ? 'var(--color-light-blue)' : 'var(--color-black)',
          }}
        >
          <i className='fa-solid fa-caret-down' />
        </div>
      </div>

      <div className={styles.search}>
        {/* search box */}
        <div className={styles.btnSet}>
          {/* <i className="fa-solid fa-bell-slash"></i> */}
          <button className={styles.barBtn}>
            <i className='fa-solid fa-bell'></i>
          </button>
          <button
            className={styles.barBtn}
            style={{
              color: isUserDisplay
                ? 'var(--color-light-blue)'
                : 'var(--color-black)',
            }}
            onClick={toggleIsUserDisplay}
          >
            <i className='fa-solid fa-user-group'></i>
          </button>
        </div>

        <input type='text' placeholder='검색하기' className={styles.input} />
      </div>
    </div>
  );
}
