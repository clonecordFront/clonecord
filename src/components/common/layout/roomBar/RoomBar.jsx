import React, { useEffect } from 'react';
import styles from './RoomBar.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../../../../hooks/useInput';
import { __getChannels } from '../../../../redux/modules/ChatSlice';

export default function RoomBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const channels = useSelector((state) => state.chat.channels);
  const [channelInput, setChannelInput, channelInputHandler] = useInput('');

  const authorization = sessionStorage.getItem('Authorization');
  const refresh_token = sessionStorage.getItem('Refresh-Token');
  //console.log(authorization, refresh_token);
  //console.log(channels.data);

  useEffect(() => {
    if (authorization && refresh_token) {
      dispatch(
        __getChannels({
          authorization: authorization,
          refresh_Token: refresh_token,
        })
      );
    }
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen((prev) => !prev);
    setFileImage('');
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setChannelInput('');
    toggleModal();
  };

  const [fileImage, setFileImage] = useState('');
  const saveFileImage = (file) => {
    if (file) setFileImage(URL.createObjectURL(file));
  };
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage('');
  };
  const onImageChangeHandler = (e) => {
    saveFileImage(e.target.files[0]);
  };

  //console.log(fileImage);
  return (
    <>
      <section className={styles.roomList}>
        <div
          className={`${styles.Logo} ${styles.main}`}
          onClick={() => {
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
              <li key={channel.roomId}>
                <div
                  className={`${styles.Logo} ${styles.temp}`}
                  onClick={() => {
                    navigate(`/channel/${channel.roomId}`);
                  }}
                >
                  {channel.imageUrl ? (
                    <img
                      src={channel.imageUrl}
                      className={styles.channelLogo}
                      alt={`${channel.roomName} logo`}
                    ></img>
                  ) : (
                    <h1>{channel.roomName.slice(0, 1).toUpperCase()}</h1>
                  )}
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
            채널은 나와 친구들이 함께 어울리는 공간입니다. 내 채널을 만들고
            대화를 시작해보세요.
          </span>
          <div className={styles.preImgBox}>
            <input
              type='file'
              id='choosePhoto'
              name='choosePhoto'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={onImageChangeHandler}
              //value={fileImage}
            />
            <label className={styles.preLab} htmlFor='choosePhoto'>
              이미지 등록
            </label>
            {fileImage && (
              <img className={styles.preImg} alt='sample' src={fileImage} />
            )}
          </div>

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
