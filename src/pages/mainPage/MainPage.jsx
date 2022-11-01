
import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/common/layout/Layout';
import styles from './MainPage.module.css';
import LoginPage from '../loginPage/LoginPage';
import JoinPage from '../joinPage/JoinPage';
import Join from '../../components/join/Join';



export default function MainPage() {

  const loginuser = useSelector((state) => state.user.user)
  console.log(loginuser.data, loginuser.authorization, loginuser.refresh_token)

  const [inSignup, setInSignup] = useState(false);

  const authorization = sessionStorage.getItem('Authorization')
  const refresh_token = sessionStorage.getItem('Refresh-Token')

  const LoginForm = () => {
    return (
    <>
      <LoginPage setInSignup={setInSignup}/>
    </>
    )
  };
  const SignuoForm = () => {
    return (
      <>
        <Join setInSignup={setInSignup}/>
      </>
    )
  };
  const MainForm = () => {
    return (
      <div className={styles.mainbox}>
        <div className={styles.box}>
          <p>환영합니다!</p>
          
          <button>로그아웃 버튼 정렬,</button>

        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className={styles.container}>
          { authorization && refresh_token ? (
            <MainForm/>
            ) : inSignup ?(
              <SignuoForm/>
              ) : (
              <LoginForm/>
            )
          }
      </div>
    </Layout>
  );
}