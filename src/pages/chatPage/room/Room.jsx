import { debounce } from 'lodash';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { UserDisplayContext } from '../../../context/UserDisplayContext';
import Chat from '../chat/Chat';
import styles from './Room.module.css';
import RoomHeader from './roomHeader/RoomHeader';

import SockJS from 'sockjs-client';
import { over } from 'stompjs';

export default function Room() {
  const { isUserDisplay } = useContext(UserDisplayContext);
  const [chatboxHeight, setChatboxHeight] = useState(
    window.innerHeight - 25 - 60 - 3 - 60
  );

  // 브라우저 화면 크기에따른 크기 조절 & 마운트 시 스크롤 아래로
  const handleResize = debounce(() => {
    setChatboxHeight(window.innerHeight - 25 - 60 - 3 - 60);
  }, 1000);

  function prepareScroll() {
    window.setTimeout(scrollUL, 50);
  }

  const scrollUL = () => {
    let chatUL = document.querySelector('#chatUL');
    chatUL.scrollTo(0, chatUL.scrollHeight);
  };

  useEffect(() => {
    prepareScroll();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 채팅 제출 시 이벤트
  const onSubmitHandler = (e) => {
    e.preventDefault();
    prepareScroll();
  };

  // Socket
  let stomp_client;
  function connect() {
    let Sock = new SockJS('/ws/chat');
    stomp_client = over(Sock);
    stomp_client.connect({});
  }

  return (
    <section className={styles.container}>
      <RoomHeader />
      <hr className={styles.line} />

      <div className={styles.channelBox}>
        <div className={styles.voice}>
          <div className={styles.voiceList}>VOICE CHANNEL</div>
          <div className={styles.profile}>PROFILE ZONE</div>
        </div>

        <div className={styles.chat}>
          <ul
            id='chatUL'
            className={styles.chatBox}
            style={{ maxHeight: chatboxHeight }}
          >
            CHANNEL FIRST CHAT
            {/* 특정 채털의 chat list mapping */}
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
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
                placeholder='{채널명예정}에 메시지 보내기'
              />
            </form>
          </div>
        </div>

        <div
          className={styles.user}
          style={{ width: isUserDisplay ? '170px' : '0px' }}
        >
          USER LIST
        </div>
      </div>
    </section>
  );
}
