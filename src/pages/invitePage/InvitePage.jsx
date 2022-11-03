import React, { useEffect } from 'react';
import styles from './InvitePage.module.css';
import backgroundPath from '../../img/background.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { __getChannel, __inviteChannel } from '../../redux/modules/ChatSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function InvitePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorization = sessionStorage.getItem('Authorization');
  const refresh_token = sessionStorage.getItem('Refresh-Token');

  //useParams로 받아온 channelId & useSelector로 user정보 받아서 데이터 넣어줌
  const channel = useSelector((state) => state.chat.channel);
  useEffect(() => {
    if (authorization && refresh_token) {
      dispatch(
        __getChannel({
          authorization: authorization,
          refresh_Token: refresh_token,
          roomId: id,
        })
      );
    }
  }, [id]);

  console.log(channel);

  const onClickHandler = () => {
    dispatch(
      __inviteChannel({
        authorization: authorization,
        refresh_token: refresh_token,
        roomId: id,
      })
    );
    navigate(`/channel/${id}`);
  };

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
            src={channel.data.imageUrl}
            alt='channel logo'
          />
        </div>
        <h1>{channel.data.roomName}</h1>
        <button className={styles.inviteBtn} onClick={onClickHandler}>
          초대 수락
        </button>
      </div>
    </div>
  );
}
