import React, { useEffect, useRef, useState } from 'react';

// import SockJS from 'sockjs-client';
// import { over } from 'stompjs';
import Room from './room/Room';
import Layout from '../../components/common/layout/Layout';
import { UserDisplayProvider } from '../../context/UserDisplayContext';
import { useParams } from 'react-router-dom';
import RoomWaiting from './roomWaiting/RoomWaiting';

export default function ChatPage() {
  const { id } = useParams();
  const [isRoomWaiting, setIsRoomWaiting] = useState(true);
  const [stream, setStream] = useState(null);

  return (
    <Layout setIsRoomWaiting={setIsRoomWaiting}>
      <UserDisplayProvider>
        { isRoomWaiting ? <RoomWaiting roomId={id} setIsRoomWaiting={setIsRoomWaiting} setStream={setStream}/> : <Room roomId={id} setIsRoomWaiting={setIsRoomWaiting} stream={stream} setStream={setStream}/> }
      </UserDisplayProvider>
    </Layout>
  );
}
