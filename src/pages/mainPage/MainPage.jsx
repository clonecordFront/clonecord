import React,{ useState} from "react"
import { useNavigate } from "react-router-dom/dist"
import { useDispatch } from "react-redux";
import { memberLogin } from "../../redux/modules/loginSlice";

export default function MainPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
    dispatch(memberLogin({
      email,
      password
    }));
    setEmail('');
    setPassword('')

    if(password.length < 4 || password.length > 20) {
      alert("4자리 ~ 20자리 이내로 입력하세요")
      return false;
    }
  }

  return (
    
      <div className="loginPage">
        <form className="loginBox" onSubmit={onSubmitHandler}>
          <div>
            <p>Discode</p>
            <input
              className="loginInput"
              value={email}
              type='text'
              onChange={onChangeEmail}
              placeholder='이메일을 입력하세요.'
              />
            <input
              className="loginInput"
              value={password}
              type='password'
              onChange={onChangePassword}
              placeholder='비밀번호를 입력하세요'
              />
            <button className="loginButton">로그인</button>
          </div>
          <p onClick={navigate('/signup')}>아직 회원이 아니신가요?</p>
        </form>
      </div>
  
  )

}

// const SLink = styled(Link)`
//   color: #ff6551;
//   text-decoration: none;
//   font-size: 14px;
// `;

// const ButtonStyle = styled.button`
//   width: 300px;
//   height: 50px;
//   border: none;
//   background-color: #508dff;
//   color: #fff;
//   border-radius:7px;
//   margin-top: 10px;
//   font-size: 15px;
//   font-weight: 700;
//   transition: 0.3s;
//   cursor: pointer;
//   &:hover {
//     background-color: #003aa7;
//   }
// `;

// const TextStyle = styled.div`
//   font-size:20px;
//   font-weight: 600;
//   color: #005db4;
//   margin-bottom: 30px;
// `;

// const InputStyle = styled.input`
//   border: 1px solid #ccc;
//   margin-bottom: 10px;
//   height: 40px;
//   outline: none;
//   padding: 0 10px;
//   border-radius: 5px;
//   font-size: 15px;
//   &::placeholder{
//     color:#aaa;
//   }
// `;

// const FormStyle = styled.form`
//   display: flex;
//   flex-direction: column;
//   text-align: center;
//   color: #000000;
//   margin-bottom: 30px;
//   width: 300px;
// `;

// const LoginContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   /* background-color: #a8a8a8; */
//   width: 500px;
//   /* height: 400px; */
//   border-radius: 10px;
//   text-align: center;
//   margin-top: 20px;
// `;