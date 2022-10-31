import React,{ useState} from "react"
import { useNavigate } from "react-router-dom/dist"
import { useDispatch } from "react-redux";
import { __memberLogin } from "../../redux/modules/LoginSlice";
import styles from './LoginPage.module.css'
import Layout from "../../components/common/layout/Layout";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const {value} = e.target;
    setEmail(value);
  }

  const onChangePassword = (e) => {
    const {value} = e.target;
    setPassword(value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(__memberLogin({
      email:email,
      password:password
    }));
    setEmail('');
    setPassword('');
    navigate('/')
  }

  return (
       <div>
        <div className={styles.loginBox}>
          <form onSubmit={onSubmitHandler}>
            <div>
              <i className="fa-brands fa-discord fa-3x" style={{color:'#5865fe'}}/>
              <p>99cord</p>
              <input
                className={styles.loginInput}
                value={email||''}
                type='text'
                onChange={onChangeEmail}
                placeholder='이메일을 입력하세요.'
              />
              <input
                className={styles.loginInput}
                value={password||''}
                type='password'
                onChange={onChangePassword}
                placeholder='비밀번호를 입력하세요'
              />
              <button className={styles.loginButton}>로그인</button>
            </div>
          </form>
          <form>
            <div>
              <p style={{color:'var(--color-light-black)'}} onClick={() => navigate('/')}>아직 회원이 아니신가요?</p>
            </div>
          </form>
        </div>
      </div>
  )
}