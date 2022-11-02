import React from 'react';
import styles from './Header.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { __memberLogout } from '../../../../redux/modules/LoginSlice';
import { useDispatch } from 'react-redux';

export default function Header() {
  
  return (
  <div>
    <div className={styles.box}>99cord</div>
  </div>
  )
}