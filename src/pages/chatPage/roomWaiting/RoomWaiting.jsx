import React, { useContext, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../../../hooks/useInput';
import { UserDisplayContext } from '../../../context/UserDisplayContext';
import { StompContext } from '../../../context/StompContext';
import { TabContext } from '../../../context/TabContext ';

import Chat from '../chat/Chat';
import styles from './RoomWaiting.module.css';
import RoomHeader from './roomHeader/RoomHeader';

import {
  CLEAR_CHANNEL,
  ADD_CHAT,
  __getChannel,
} from '../../../redux/modules/ChatSlice';

import placeholderPath from '../../../img/profile_placeholder.png';
import User from '../user/User';

const getWebcam = (cb) => {
  try {
    const option = {
      'video': true,
      'audio': true,
    }
    navigator.mediaDevices.getUserMedia(option).then(cb);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export default function RoomWaiting({ roomId, setIsRoomWaiting, setStream }) {
  const { stompClient } = useContext(StompContext);
  const { isUserDisplay } = useContext(UserDisplayContext);
  const { tab, setTab } = useContext(TabContext);

  const nickname = JSON.parse(sessionStorage.getItem('UserNickname'));
  const key = JSON.parse(sessionStorage.getItem('UserKey'));

  // TODO: 채팅 제출 시 이벤트
  const dispatch = useDispatch();

  const videoRef = useRef(null);

  useEffect(() => {
  }, [stompClient, roomId]);

  //! channel 입장 시 채널 데이터 가져오기 && 퇴장시 리덕스 채널 정보 삭제
  const channel = useSelector((state) => state.chat.channel);
  useEffect(() => {
    dispatch(__getChannel(roomId));
    // get user media
    getWebcam((stream)=>{
      videoRef.current.srcObject = stream;
      setStream(stream);
    });
    return () => {
      dispatch(CLEAR_CHANNEL());
    };
  }, [roomId]);


  return (
    <section className={styles.container}>
      {/* Channel name & Search box, Hr */}
      <RoomHeader channel={channel.data} />
      <hr className={styles.line} />

      <div className={styles.channelBox}>
        <div className={styles.voice}>
        </div>

        <div className={styles.chat}>
            <div className={styles.videoWrapper}>
              <video className={styles.video} ref={videoRef} autoPlay/>
            </div>
            <button className={styles.formButton} onClick={()=>setIsRoomWaiting(false)} >
                입장하기
            </button>
      
        </div>

        <div
          className={styles.user}
          style={{ width: isUserDisplay ? '170px' : '0px' }}
        >
          <span className={styles.userListText}>온라인 - 0</span>
          <ul>
            {channel.data.memberList &&
              channel.data.memberList.map((user) => {
                return <User key={user.memberId} user={user} />;
              })}
          </ul>

          <span className={styles.userListText}>오프라인 - 0</span>
          <ul>{/* <User /> */}</ul>
        </div>
      </div>
    </section>
  );
}
