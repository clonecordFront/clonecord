import React, { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import SockJS from 'sockjs-client';

export const StompContext = createContext();

export function StompProvider({ children }) {
  const Stomp = require('stompjs');
  const [stompClient, setStompClient] = useState();
  //let stomp_client;

  function init() {
    console.log('Lets try connect!');
    let sock = new SockJS('https://code99-dev.pyuri.dev/ws/chat');
    //stomp_client = Stomp.over(sock);
    setStompClient(Stomp.over(sock));
    // stomp_client.debug = null;
    //stomp_client.connect({}, onConnected, onError); // First arg is Header
    //stompClient.connect({}, onConnected, onError); // First arg is Header
  }

  const onConnected = () => {
    // !userSlice 유저정보 connected true로 변경
    // !해당 유저가 참가해있는 사설채팅방 모두 다시 구독 시작
    // !Join 메시지? 선택사항
    console.log('Just Connected!');
  };
  const onError = (err) => {
    console.log('Error Occured Below');
    console.log(err);
  };

  // !Mount - Stomp over SockJS && Dismout - STOMP Disconnect
  useEffect(() => {
    init();

    return () => {
      if (stompClient) {
        console.log('Trying Disconnect..');
        stompClient.disconnect(() => {}, {}); //!Disconnect하면서 userSlice connected false
      }
    };
  }, []);
  
  useEffect(() => {
    if (stompClient) stompClient.connect({}, onConnected, onError); // First arg is Header
  }, [stompClient]);

  return (
    <StompContext.Provider value={{ stompClient }}>
      {children}
    </StompContext.Provider>
  );
}
