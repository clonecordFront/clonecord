import React, { useContext, useEffect } from 'react';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../../../hooks/useInput';
import { UserDisplayContext } from '../../../context/UserDisplayContext';
import { StompContext } from '../../../context/StompContext';

import Chat from '../chat/Chat';
import styles from './Room.module.css';
import RoomHeader from './roomHeader/RoomHeader';

import { __addChat } from '../../../redux/modules/ChatSlice';

export default function Room() {
  const { stompClient } = useContext(StompContext);
  const { isUserDisplay } = useContext(UserDisplayContext);

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
    chatUL.scrollTo(0, chatUL.scrollHeight);
  };

  useEffect(() => {
    prepareScroll();
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
    dispatch(
      __addChat({
        id: null,
        type: 'TALK',
        roomId: '1',
        sender: 'FrontMan',
        message: chatInput,
      })
    );
    setChatInput('');
    prepareScroll();
  };

  // TODO: Stomp Control
  const onMessageReceived = (payload) => {
    const payloadData = JSON.parse(payload.body);
    console.log(payload);
    switch (payloadData.type) {
      case 'TALK':
        dispatch(__addChat(payloadData));
        prepareScroll();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log(chats.data);
  }, [chats.data]);

  //! Mount시 구독 && Dismount시 구독 해지
  useEffect(() => {
    //? setTimeout으로 stompClient의 connected가 true가 되는것을 기다린 후 특정 채널 구독
    window.setTimeout(() => {
      if (stompClient !== undefined) {
        if (stompClient.connected) {
          console.log('Stomp is connected now. Lets subscribe!');
          stompClient.subscribe(`/topic/chat/room/1`, onMessageReceived, {}); //? second: callback after subscribe, third: headers
        } else {
          console.log('Stomp not connected yet...');
        }
      } else {
        console.log('Stomp is undefined yet...');
      }
    }, 200);

    return () => {
      if (stompClient !== undefined && stompClient !== null) {
        stompClient
          .subscribe(`/topic/chat/room/1`, onMessageReceived, {})
          .unsubscribe();
        console.log('DONE...!!!');
      }
    };
  }, [stompClient]);

  return (
    <section className={styles.container}>
      {/* Channel name & Search box, Hr */}
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
            {/* <Chat /> */}
            {chats.data.map((chat) => (
              <Chat chat={chat} />
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
                placeholder='{채널명예정}에 메시지 보내기'
                value={chatInput}
                onChange={chatInputHandler}
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
