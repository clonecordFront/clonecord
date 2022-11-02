import axios from 'axios';
import { useState } from 'react';
import React from 'react';
import styles from './Join.module.css';

export default function Join({ setInSignup }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordChck] = useState('');

  const register = () => {
    axios
      .post(
        'https://code99-dev.pyuri.dev/api/members/signup',
        {
          nickname: name,
          email: email,
          password: password,
          passwordCheck: passwordCheck,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        sessionStorage.setItem('token', response.data.jwt);
        alert('회원가입에 성공했습니다.');
        setInSignup(false);
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log('error', error.response);
      });
  };

  const nickNameCheck = () => {
    axios
      .post(
        'https://code99-dev.pyuri.dev/api/members/check/nick',
        {
          nickname: name,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        sessionStorage.setItem('token', response.data.jwt);

        if (response.data.success === true) {
          return alert('사용할 수 있는 닉네임입니다.');
        } else {
          return alert(response.data.error.message);
        }

        // console.log(response.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log('error', error.response);
      });
  };

  const emailCheck = () => {
    axios
      .post(
        'https://code99-dev.pyuri.dev/api/members/check/email',
        {
          email: email,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        sessionStorage.setItem('token', response.data.jwt);
        if (response.data.success === true) {
          return alert('사용할 수 있는 이메일입니다.');
        } else {
          return alert(response.data.error.message);
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log('error', error.response);
      });
  };

  const nameOnChangeHandler = (e) => {
    setName(e.target.value);
  };

  const nameChekOnClickHandler = () => {
    nickNameCheck();
  };

  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const emailChekOnClickHandler = () => {
    emailCheck();
  };
  const passwordOnChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const passwordCheckOnChangeHandler = (e) => {
    setPasswordChck(e.target.value);
  };

  const joinOnClickHandler = () => {
    register();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <h3 className={styles.joinText}>회원가입</h3>
          
            <p className={styles.text}>이름</p>
            <input
              className={styles.input}
              placeholder='이름을 입력하세요'
              type={name}
              onChange={nameOnChangeHandler}
            />
            <button className={styles.cheBtn} onClick={nameChekOnClickHandler}>
              중복확인
            </button>
            <p className={styles.text}>이메일</p>
            <input
              className={styles.input}
              placeholder='이메일을 입력하세요'
              type={email}
              onChange={emailOnChangeHandler}
            />
            <button className={styles.cheBtn} onClick={emailChekOnClickHandler}>
              중복확인
            </button>
            <p className={styles.text}>비밀번호</p>
            <input
              className={styles.passwordInput}
              placeholder='비밀번호를 입력하세요'
              type='password'
              onChange={passwordOnChangeHandler}
            />
            <p className={styles.text}>비밀번호 확인</p>
            <input
              className={styles.passwordInput}
              placeholder='비밀번호 확인'
              type='password'
              onChange={passwordCheckOnChangeHandler}
            />
          
          <button className={styles.joinBtn} onClick={joinOnClickHandler}>
            SIGN UP
          </button>
        </div>
      </div>
    </>
  );
}
