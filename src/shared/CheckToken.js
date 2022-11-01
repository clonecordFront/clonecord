import React, { useState } from 'react';

export default function CheckToken(props) {
  const [isAuth, setIsAuth] = useState('Loading');

  const authorization = sessionStorage.getItem('Authorization');
  const refresh_token = sessionStorage.getItem('Refresh-Token');

  return <div></div>;
}
