
import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/common/layout/Layout';
import styles from './MainPage.module.css';
import LoginPage from '../loginPage/LoginPage';
import Join from '../../components/join/Join';
import { __memberLogout } from '../../redux/modules/LoginSlice';
import { useDispatch } from 'react-redux';


export default function MainPage() {
  const dispatch = useDispatch();

  const loginuser = useSelector((state) => state.user.user)
  console.log(loginuser.data, loginuser.authorization, loginuser.refresh_token)

  const [inSignup, setInSignup] = useState(false);

  const authorization = sessionStorage.getItem('Authorization')
  const refresh_token = sessionStorage.getItem('Refresh-Token')

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
    <div>
      <LoginPage setInSignup={setInSignup}/>
    </div>
    )
  };
  const SignupForm = () => {
    return (
      <div>
        <Join setInSignup={setInSignup}/>
      </div>
    )
  };
  const MainForm = () => {
    return (
      <div className={styles.mainbox}>
        <div className={styles.box}>
          <h3>어서오너라</h3>
          <h4>{localStorage.getItem('nickName')}님 어서오시고요</h4>
          <button className={styles} onClick={onSubmitHandler}>로그아웃</button>
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
              <SignupForm/>
              ) : (
              <LoginForm/>
            )
          }
      </div>
    </Layout>
  );
}