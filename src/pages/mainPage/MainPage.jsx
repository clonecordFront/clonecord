import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/common/layout/Layout';
import styles from './MainPage.module.css';
import { logout } from '../../redux/modules/NameSlice';
import { useDispatch, useSelector } from 'react-redux';
import { DarkProvider } from '../../context/DarkmodeContext';
import { TabContext } from '../../context/TabContext ';
import NamePage from '../namePage/NamePage';

export default function MainPage() {
  const dispatch = useDispatch();
  const { tab, setTab } = useContext(TabContext);
  const [nickname, setNickname] = useState(
    JSON.parse(sessionStorage.getItem('UserNickname'))
  );
  const [key, setKey] = useState(JSON.parse(sessionStorage.getItem('UserKey')));

  useEffect(() => {
    setTab('main');
    const handleStorageChange = (event) => {
      if (event.key === 'UserNickname') {
        setNickname(JSON.parse(event.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [setTab]);

  const onSubmitHandler = (e) => {
    e.preventDefault(e);
    dispatch(logout());
    setNickname(null);
    setKey(null);
  };

  const NameForm = () => {
    return (
      <>
        <NamePage setNickname2={setNickname} />
      </>
    );
  };

  const MainForm = () => {
    return (
      <div className={styles.mainbox}>
        <div className={styles.box}>
          <h2>99cord에 오신것을 환영합니다!</h2>
          <h3>'{nickname}'님의 친구들이 기다리고 있어요.</h3>
          <div className={styles.buttonbox}>
            <button className={styles.logoutbutton} onClick={onSubmitHandler}>
              로그아웃
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <DarkProvider>
        <div className={styles.container}>
          {nickname ? <MainForm /> : <NameForm />}
        </div>
      </DarkProvider>
    </Layout>
  );
}
