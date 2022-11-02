import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/common/layout/Layout';
import styles from './MainPage.module.css';
import LoginPage from '../loginPage/LoginPage';
import Join from '../../components/join/Join';

import { __memberLogout } from '../../redux/modules/LoginSlice';
import { useDispatch } from 'react-redux';
import { indexOf } from 'lodash';

export default function MainPage() {
  const dispatch = useDispatch();

  const loginuser = useSelector((state) => state.user.user);
  console.log(loginuser.data, loginuser.authorization, loginuser.refresh_token);

  const [inSignup, setInSignup] = useState(false);

  const authorization = sessionStorage.getItem('Authorization');
  const refresh_token = sessionStorage.getItem('Refresh-Token');

  const userName = JSON.parse(sessionStorage.getItem('User'))

  const onSubmitHandler = (e) => {
    e.preventDefault(e);
    dispatch(__memberLogout());
  }
  
  const LoginForm = () => {
    return (
      <>
        <LoginPage setInSignup={setInSignup} />
      </>
    );
  };

  const SignupForm = () => {
    return (
      <>
        <Join setInSignup={setInSignup} />
      </>
    );
  };

  const MainForm = () => {
    return (
      <div className={styles.mainbox}>
        <div className={styles.box}>
          <h2>99cord에 오신것을 환영합니다!</h2>
          <h3>'{userName.nickname}'의 친구들이 기다리고 있어요.</h3>
          <div className={styles.buttonbox}>
            <button className={styles.logoutbutton} onClick={onSubmitHandler}>로그아웃</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className={styles.container}>
        {authorization && refresh_token ? (
          <MainForm />
        ) : inSignup ? (
          <SignupForm />
        ) : (
          <LoginForm />
        )}
      </div>
    </Layout>
  );
}