import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/common/layout/Layout';
import styles from './MainPage.module.css';
import LoginPage from '../loginPage/LoginPage';
import Join from '../../components/join/Join';

import { __memberLogout } from '../../redux/modules/LoginSlice';
import { useDispatch } from 'react-redux';


export default function MainPage() {
  const dispatch = useDispatch();

  const loginuser = useSelector((state) => state.user.user);
  console.log(loginuser.data, loginuser.authorization, loginuser.refresh_token);


  const [inSignup, setInSignup] = useState(false);

  const authorization = sessionStorage.getItem('Authorization');
  const refresh_token = sessionStorage.getItem('Refresh-Token');

  // 유저 닉네임 로컬에 저장
  const inputValue = loginuser.data.nickname
  useEffect(()=>{ 
    if(!inputValue) {
    } else{
      localStorage.setItem("nickName", JSON.stringify(inputValue))
    }
  })
  
  const onSubmitHandler = (e) => {
    e.preventDefault(e);
    dispatch(__memberLogout());
    localStorage.clear()
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
          <p>환영합니다!</p>

          <button>로그아웃 버튼 정렬,</button>
          <button className={styles} onClick={onSubmitHandler}>로그아웃</button>
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
          <SignuoForm />
        ) : (
          <LoginForm />
        )}
      </div>
    </Layout>
  );
}
