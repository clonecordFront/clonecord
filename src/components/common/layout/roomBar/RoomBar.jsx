import React from 'react';
import { useState } from 'react';
import styles from './RoomBar.module.css';
import useInput from '../../../../hooks/useInput';

export default function RoomBar() {
  const [channelInput, setChannelInput, channelInputHandler] = useInput('');
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setChannelInput('');
    toggleModal();
  };
  // userSlice에서 해당 유저가 구독 중인 채팅방 리스트 가져와야함

  return (
    <>
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

        <div className={`${styles.Logo} ${styles.plus}`} onClick={toggleModal}>
          <i className='fa-solid fa-plus'></i>
        </div>
      </section>

      {/* + Button -> Modal Layout & Box */}
      <div
        className={modalOpen ? styles.modalLayoutOpen : styles.modalLayoutClose}
        onClick={toggleModal}
      />

      <div className={modalOpen ? styles.modalBoxOpen : styles.modalBoxClose}>
        <div className={styles.xBtn} onClick={toggleModal}>
          <i className='fa-solid fa-xmark' />
        </div>
        <form className={styles.modalForm} onSubmit={onSubmitHandler}>
          <span className={styles.formText}>채널 만들기</span>
          <span className={styles.formServeText}>
            채널은 나와 친구들이 함께 어울리는 공간입니다. 내 채널을 만들고
            대화를 시작해보세요.
          </span>
          <input
            type='text'
            placeholder='채널 이름을 입력해주세요'
            value={channelInput}
            onChange={channelInputHandler}
            className={styles.formInput}
          />
          <button className={styles.submitBtn}>채널 만들기</button>
        </form>
      </div>
    </>
  );
}
