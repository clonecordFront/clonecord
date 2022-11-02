import { useEffect, useState } from 'react';

export default function CheckToken(key) {
  const [isAuth, setIsAuth] = useState('Loading');

  //const authorization = sessionStorage.getItem('Authorization');
  const refresh_token = sessionStorage.getItem('Refresh-Token');

  useEffect(() => {
    const checkToken = async () => {
      if (!refresh_token) {
        sessionStorage.clear();
        setIsAuth('Failed');
      } else {
        setIsAuth('Success');
      }
    };
    checkToken();
  }, [key]);

  return { isAuth };
}
