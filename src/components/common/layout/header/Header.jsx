import React from 'react';
import styles from './Header.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { __memberLogout } from '../../../../redux/modules/LoginSlice';
import { useDispatch } from 'react-redux';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault(e);
    dispatch(__memberLogout());
    sessionStorage.clear();
    navigate('/')
  }
  
  return (
  <div>
    <div className={styles.box}>99cord</div>
    <div onClick={()=>navigate('/login')}>로그인</div>
    <div onClick={onSubmitHandler}>로그아웃</div>
  </div>
  )
}