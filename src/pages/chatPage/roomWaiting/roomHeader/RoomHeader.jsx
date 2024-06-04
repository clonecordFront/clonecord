import React, { useContext, useState } from 'react';
import { UserDisplayContext } from '../../../../context/UserDisplayContext';
import styles from './RoomHeader.module.css';
import { useDispatch } from 'react-redux';
import {
  __deleteChannel,
  __updateChannel,
} from '../../../../redux/modules/ChatSlice';
import { useNavigate } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
import { useRef } from 'react';

export default function RoomHeader({ channel }) {
  const [dropOpen, setDropOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const { isUserDisplay, toggleIsUserDisplay } = useContext(UserDisplayContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDrop = () => {
    setDropOpen((prev) => !prev);
    if (updateOpen) {
      toggleUpdate();
    }
  };

  const toggleUpdate = () => {
    setUpdateOpen((prev) => !prev);
  };

  const deleteHandler = () => {
    dispatch(__deleteChannel(channel.id));
    navigate('/');
  };
  const channelNameRef = useRef(null);
  const updateHandler = (e) => {
    e.preventDefault();
    const channelName = channelNameRef.current.value; // input에서 현재 값을 가져옵니다.
    dispatch(__updateChannel({ id: channel.id, name: channelName }));
    toggleDrop();
  };

  const DropDown = () => {
    return (
      <div className={styles.dropdown}>
        <ul className={styles.droplist}>
          <li onClick={deleteHandler} style={{ color: 'red' }}>
            채널 삭제
          </li>
          <li
            onClick={toggleUpdate}
            style={{ color: updateOpen ? 'blue' : 'black' }}
          >
            채널 수정
          </li>
        </ul>
        {updateOpen ? (
          <form className={styles.updateForm} onSubmit={updateHandler}>
            <input
              className={styles.formInput}
              type='text'
              placeholder='채널 이름을 입력해주세요'
              ref={channelNameRef}
            />
            <button type='submit' className={styles.formButton}>
              완료
            </button>
          </form>
        ) : null}
      </div>
    );
  };

  return (
    <>
      <div className={styles.box}>
        <div className={styles.name} onClick={toggleDrop}>
          <span>{channel.name}</span>
          <div
            className={styles.nameBtn}
            style={{
              color: dropOpen
                ? 'var(--color-light-blue)'
                : 'var(--color-black)',
            }}
          >
            <i className='fa-solid fa-caret-down' />
          </div>
        </div>

        <div className={styles.search}>
        </div>
        {dropOpen ? <DropDown /> : null}
      </div>
    </>
  );
}
