import React, { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import SockJS from 'sockjs-client';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CHANNEL, DELETE_CHANNEL, UPDATE_CHANNEL } from '../redux/modules/ChatSlice';

export const StompContext = createContext();

export function StompProvider({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.name.user)
  const Stomp = require('stompjs');
  const [stompClient, setStompClient] = useState();
  //let stomp_client;

  function init() {
    //console.log('Lets try connect!');
    let sock = new SockJS('https://158.179.171.152/signal');
    setStompClient(Stomp.over(sock));
  }

  const unloadHandler = (event) => {
    event.preventDefault();
    event.returnValue = '';

    stompClient.send(
      '/app/disconnect',
      {},
      JSON.stringify({uuid: user.data.key})
    );
  }

  const onConnected = () => {
    /* topic/common subscribe 공통적으로 받아야 하는 정보 받기 위해서 구독하고 redux에 정보 업데이트 */
    stompClient.subscribe('/topic/common', msg => {
      const data = JSON.parse(msg.body);
      const payload = {
        id: data.id,
        name: data.name
      };

      
      if(data.type === "ROOM_CREATE") dispatch(ADD_CHANNEL(payload)); // room create
      else if(data.type === "ROOM_DELETE") dispatch(DELETE_CHANNEL(payload)); // room delete
      else if (data.type === "ROOM_UPDATE") dispatch(UPDATE_CHANNEL(payload)); // room update
    });

      
    /* 창을 그대로 끄면 알려주기 위해서 window.onbeforeunload 이벤트 핸들러 추가한다 */
    window.addEventListener('beforeunload', unloadHandler);
    
  };
  const onError = (err) => {
    console.log('Error Occured Below');
    console.log(err);
  };

  // !Mount - Stomp over SockJS && Dismout - STOMP Disconnect
  useEffect(() => {
    init();

    return () => {
      window.removeEventListener('beforeunload', unloadHandler);

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
