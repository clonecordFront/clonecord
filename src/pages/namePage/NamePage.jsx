import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { __nameLogin } from '../../redux/modules/NameSlice';
import styles from './NamePage.module.css';

export default function NamePage({ setNickname2 }) {
  const [nickname, setNickname] = useState('');
  const dispatch = useDispatch();

  const onChangeNickname = (e) => {
    const { value } = e.target;
    setNickname(value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(__nameLogin({ nickname: nickname }));
    setNickname2(nickname);
    setNickname('');
  };

  return (
    <div>
      <div className={styles.lightloginBox}>
        <form onSubmit={onSubmitHandler}>
          <div>
            <i
              className='fa-brands fa-discord fa-3x'
              style={{ color: '#5865fe' }}
            />
            <div className={styles.text}>99cord</div>
            <input
              className={styles.loginInput}
              type='text'
              value={nickname || ''}
              onChange={onChangeNickname}
              placeholder='닉네임을 입력하세요.'
            />
          </div>
          <div>
            <button className={styles.loginButton}>입장하기!</button>
          </div>
        </form>
      </div>
    </div>
  );
}
