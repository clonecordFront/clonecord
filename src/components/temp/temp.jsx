import React, { useState } from 'react';

function Temp(props) {
  const [isSignup, setIsSignup] = useState(false);
  const LoginForm = () => {
    return <h1>This is Login Form!</h1>;
  };

  const SignUpForm = () => {
    return <h1>This is Signup Form!!</h1>;
  };

  const MainForm = () => {
    return (
      <>
        <h1>환영합니다 닉네임님!!</h1>
        <button>로그아웃</button>
      </>
    );
  };

  const authorization = null;
  const refresh_token = 'dfdf';

  return (
    <div>
      {authorization && refresh_token ? (
        <MainForm />
      ) : isSignup ? (
        <SignUpForm />
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default Temp;
