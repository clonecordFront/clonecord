import React, { useContext, useEffect } from 'react';
import styles from './RoomBar.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../../../../hooks/useInput';
import {
  __getChannels,
  __createChannel,
} from '../../../../redux/modules/ChatSlice';
import { CLEAR_CHANNELS } from '../../../../redux/modules/ChatSlice';
import { TabContext } from '../../../../context/TabContext ';

export default function RoomBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const channels = useSelector((state) => state.chat.channels);
  const [channelInput, setChannelInput, channelInputHandler] = useInput('');

  const isLogin = useSelector((state) => state.name.user.isLogin);

  useEffect(() => {
    if (isLogin) {
      dispatch(__getChannels());
    } else {
      dispatch(CLEAR_CHANNELS());
    }
  }, [isLogin, dispatch]);

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    if (isLogin) setModalOpen((prev) => !prev);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(__createChannel(channelInput));
    setChannelInput('');
    toggleModal();
  };

  const { tab, setTab } = useContext(TabContext);

  return (
    <>
      <section className={styles.roomList}>
        <div
          className={`${styles.Logo} ${styles.main} ${
            tab === 'main' && styles.mainActive
          }`}
          onClick={() => {
            setTab('main');
            navigate('/');
          }}
        >
          <i className='fa-brands fa-discord'></i>
        </div>
        <hr className={styles.line} />

        <ul>
          {/* roomlist by username  */}
          {channels.data &&
            channels.data.map((channel) => (
              <li key={channel.id}>
                <div
                  className={`${styles.Logo} ${styles.temp} ${
                    tab === channel.id && styles.active
                  }`}
                  onClick={() => {
                    setTab(channel.id);
                    navigate(`/channel/${channel.id}`);
                  }}
                >
                  <h1>{channel.name.slice(0, 1).toUpperCase()}</h1>
                </div>
              </li>
            ))}
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
            채널은 나와 친구들이 함께 어울리는 공간입니다.
          </span>
          <span className={styles.formServeText}>
            채널을 만들고 대화를 시작해보세요.
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
