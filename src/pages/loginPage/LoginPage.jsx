import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import { useDispatch } from 'react-redux';
import { __memberLogin } from '../../redux/modules/LoginSlice';
import { Darkmode } from '../../context/DarkmodeContext';
import styles from './LoginPage.module.css';

export default function LoginPage({ setInSignup}, porps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const { isDarkmode, toggleIsDarkmode } = useContext(true);
  
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => {
    setIsDark((prev) => !prev);
    console.log('hi')
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      __memberLogin({
        email: email,
        password: password,
      })
    );
    setEmail('');
    setPassword('');
    navigate('/');
  };

  return (
    <div>
      
      <div className={isDark ? styles.darkloginBox : styles.lightloginBox}>
        <button onClick={toggleDark}>다크모드</button>
        <form onSubmit={onSubmitHandler}>
          <div>
            <i
              className='fa-brands fa-discord fa-3x'
              style={{ color: '#5865fe' }}
            />
            <div className={styles.text}>99cord</div>
            <input
              className={styles.loginInput}
              value={email || ''}
              type='text'
              onChange={onChangeEmail}
              placeholder='이메일을 입력하세요.'
            />
            <input
              className={styles.loginInput}
              value={password || ''}
              type='password'
              onChange={onChangePassword}
              placeholder='비밀번호를 입력하세요'
            />
            <button className={styles.loginButton}>로그인</button>
          </div>
        </form>
        <form>
          <div>
            <div className={styles.signUptext}
              onClick={() => {
                setInSignup(true);
              }}
            >
              아직 회원이 아니신가요?
            </div>
          </div>
        </form>
      
      </div>
    </div>
  );
}
