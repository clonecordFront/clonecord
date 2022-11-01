import React from 'react';
import styles from './InvitePage.module.css';
import backgroundPath from '../../img/background.jpg';
import { useParams } from 'react-router-dom';

export default function InvitePage({ props }) {
  const { id } = useParams();
  //useParams로 받아온 channelId & useSelector로 user정보 받아서 데이터 넣어줌

  return (
    <div className={styles.bgBox}>
      <img
        className={styles.bgImg}
        src={backgroundPath}
        alt='invite page background'
      />

      <div className={styles.inviteBox}>
        <div className={styles.imgBox}>
          <img
            className={styles.channelImg}
            src='http://res.heraldm.com/phpwas/restmb_idxmake_amp.php?idx=681&simg=%2Fcontent%2Fimage%2F2013%2F10%2F02%2F20131002000784_0.jpg'
            alt='channel logo'
          />
        </div>
        <h1>항해99 대화채널</h1>
        <button className={styles.inviteBtn}>초대 수락</button>
      </div>
    </div>
  );
}
