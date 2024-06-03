import React, { useContext, useEffect } from 'react';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../../../hooks/useInput';
import { UserDisplayContext } from '../../../context/UserDisplayContext';
import { StompContext } from '../../../context/StompContext';
import { TabContext } from '../../../context/TabContext ';

import Chat from '../chat/Chat';
import styles from './Room.module.css';
import RoomHeader from './roomHeader/RoomHeader';

import {
  CLEAR_CHANNEL,
  ADD_CHAT,
  __getChannel,
} from '../../../redux/modules/ChatSlice';

import placeholderPath from '../../../img/profile_placeholder.png';
import User from '../user/User';
import { useNavigate } from 'react-router-dom';

function VideoWrapper({ stream }) {
  return (
    <div className={styles.videoWrapper}>
      <video className={styles.video} src={stream}/>
    </div>
  ) 
}

export default function Room({ roomId, stream }) {
  const { stompClient } = useContext(StompContext);
  const { isUserDisplay } = useContext(UserDisplayContext);
  const { tab, setTab } = useContext(TabContext);

  const nickname = JSON.parse(sessionStorage.getItem('UserNickname'));
  const key = JSON.parse(sessionStorage.getItem('UserKey'));

  // TODO: 브라우저 화면 크기에따른 크기 조절 & 마운트 시 스크롤 아래로
  const [chatboxHeight, setChatboxHeight] = useState(
    window.innerHeight - 25 - 60 - 3 - 60
  );

  const handleResize = debounce(() => {
    setChatboxHeight(window.innerHeight - 25 - 60 - 3 - 60);
  }, 1000);

  function prepareScroll() {
    window.setTimeout(scrollUL, 50);
  }

  const scrollUL = () => {
    let chatUL = document.querySelector('#chatUL');
    if (chatUL) chatUL.scrollTo(0, chatUL.scrollHeight);
  };

  useEffect(() => {
    //console.log(roomId);
    setTab(roomId);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // TODO: 채팅 제출 시 이벤트
  const dispatch = useDispatch();
  const [chatInput, setChatInput, chatInputHandler] = useInput('');
  const chats = useSelector((state) => state.chat.chats);
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (chatInput === '') return;

    stompClient.send(
      `/app/room/${roomId}/chat`,
      {},
      JSON.stringify({
        userId: key,
        name: nickname,
        message: chatInput,
      })
    );

    setChatInput('');
  };

  // TODO: Stomp Control
  const onMessageReceived = (payload) => {
    console.log('Received!');
    const payloadData = JSON.parse(payload.body);
    console.log(payloadData);
    // if (payloadData.room.roomId === parseInt(roomId)) {
    //   switch (payloadData.type) {
    //     case 'TALK':
    //       dispatch(ADD_CHAT({ ...payloadData, roomId: roomId }));
    //       prepareScroll();
    //       break;
    //     default:
    //       break;
    //   }
    // }
    dispatch(ADD_CHAT({ ...payloadData, roomId: roomId }));
    prepareScroll();
  };

  //! Mount시 구독 && Dismount시 구독 해지
  useEffect(() => {
    //? setTimeout으로 stompClient의 connected가 true가 되는것을 기다린 후 특정 채널 구독
    window.setTimeout(() => {
      if (stompClient !== undefined) {
        if (stompClient.connected) {
          stompClient.subscribe(
            `/topic/room/${roomId}/chat`,
            onMessageReceived,
            { id: `sub-${roomId}` }
          ); //? second: callback after subscribe, third: headers
        } else {
          console.log('Stomp not connected yet...');
        }
      } else {
        console.log('Stomp is undefined yet...');
      }
    }, 200);

    return () => {
      if (
        stompClient !== undefined &&
        stompClient !== null &&
        stompClient.connected
      ) {
        stompClient.unsubscribe(`sub-${roomId}`);
      }
    };
  }, [stompClient, roomId]);

  //* 권한 없는 유저 쫓아내기
  const navigate = useNavigate();
  const getOut = () => {
    window.setTimeout(() => {
      if (
        channel.data.memberList &&
        channel.data.memberList.findIndex(
          (member) => member.memberId === key
        ) !== -1
      ) {
        //console.log('welcome my friend!');
      } else if (channel.data.memberList) {
        navigate('/');
      }
    }, 500);
  };
  //! channel 입장 시 채널 데이터 가져오기 && 퇴장시 리덕스 채널 정보 삭제
  const channel = useSelector((state) => state.chat.channel);
  useEffect(() => {
    //console.log('lets dispatch');
    dispatch(__getChannel(roomId));
    return () => {
      dispatch(CLEAR_CHANNEL());
    };
  }, [roomId]);

  //getOut();
  window.setTimeout(scrollUL, 200);

  return (
    <section className={styles.container}>
      {/* Channel name & Search box, Hr */}
      <RoomHeader channel={channel.data} />
      <hr className={styles.line} />

      <div className={styles.channelBox}>
        <div className={styles.voice}>
          <div className={styles.voiceList}>VOICE CHANNEL</div>
          <div className={styles.profile}>
            <div className={styles.profileInfo}>
              <div className={styles.imgBox}>
                <img
                  className={styles.profile_img}
                  src={placeholderPath}
                  alt='profile_picture'
                />
              </div>
              <div className={styles.fullName}>
                <span
                  style={{
                    fontSize: '20px',
                  }}
                >
                  {nickname}
                </span>
              </div>
            </div>
            <div className={styles.profileBtnSet}>
              <i className='fa-solid fa-microphone'></i>
              <i className='fa-solid fa-headphones'></i>
              <i className='fa-solid fa-gear'></i>
            </div>
          </div>
        </div>
        <div className={styles.video}>
          helloworld
        </div>

        <div className={styles.chat}>
          <ul
            id='chatUL'
            className={styles.chatBox}
            style={{ maxHeight: chatboxHeight }}
          >
            <div className={styles.firstChat}>
              <h2>{channel.data.name} 채널에</h2>
              <h2>오신 것을 환영합니다</h2>
              <p>이 채널이 시작된 곳이에요.</p>
            </div>

            {/* 특정 채털의 chat list mapping */}
            {/* <Chat /> */}
            {chats.data &&
              chats.data.map((chat) => (
                <Chat key={chat.timestamp} chat={chat} />
              ))}
          </ul>

          <div className={styles.inputBox}>
            <form
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
              onSubmit={onSubmitHandler}
            >
              <input
                className={styles.input}
                type='text'
                placeholder={`${channel.data.name}에 메시지 보내기`}
                value={chatInput}
                onChange={chatInputHandler}
              />
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
