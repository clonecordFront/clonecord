import React, { useContext, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

function VideoWrapper({ stream, user_key, name, isMuted }) {
  const videoRef = useRef(null);
  useEffect(()=>{
    videoRef.current.srcObject = stream; 
  },[])
  return (
    <div key={user_key} className={styles.videoWrapper}>
      <div className={styles.videoName}>{name}</div>
      <video className={styles.video} ref={videoRef} id={user_key} autoPlay muted={isMuted}/>
    </div>
  ) 
}

let prev_roomId = undefined;

export default function Room({ roomId, setIsRoomWaiting, stream, setStream }) {
  const { stompClient } = useContext(StompContext);
  const { isUserDisplay } = useContext(UserDisplayContext);
  const { tab, setTab } = useContext(TabContext);

  const navigate = useNavigate();

  const nickname = JSON.parse(sessionStorage.getItem('UserNickname'));
  const key = JSON.parse(sessionStorage.getItem('UserKey'));

  const [participants, setParticipants] = useState([]);

  /*
    * rendering logic
    */
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

  /*
    * chatting event
    */
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

  const onMessageReceived = (payload) => {
    const payloadData = JSON.parse(payload.body);
    dispatch(ADD_CHAT({ ...payloadData, roomId: roomId }));
    prepareScroll();
  };

  //! Mount시 구독 && Dismount시 구독 해지
  useEffect(() => {
    setParticipants([]);

    if(prev_roomId){
      stompClient.send(`/app/room/${prev_roomId}/disconnect`, {}, JSON.stringify({nickname: nickname, key: key}));
    }
    prev_roomId = roomId;

    //? setTimeout으로 stompClient의 connected가 true가 되는것을 기다린 후 특정 채널 구독
    window.setTimeout(() => {
      if (stompClient !== undefined) {
        if (stompClient.connected) {
          
          // subscribe for chatting
          stompClient.subscribe(
            `/topic/room/${roomId}/chat`,
            onMessageReceived,
            { id: `sub-${roomId}` }
          ); //? second: callback after subscribe, third: headers

          // subscribe for user list exchange
          stompClient.subscribe(
            `/topic/room/${roomId}/key/res`,
            msg => {
              const data = JSON.parse(msg.body);
              if(data.key !== key){ 
                setParticipants(state => {
                  if(!state.some(p => p.key === data.key))
                    return [...state, data];
                  else return [...state];
              }); }
            },
            {id: `sub-res-${roomId}`}
          );

          // subscribe for user list exchange
          stompClient.subscribe(
            `/topic/room/${roomId}/key/req`,
            msg => {
              const data = JSON.parse(msg.body);
              if(data.key !== key){ 
                setParticipants(state => {
                  if(!state.some(p => p.key === data.key)){
                    return [...state, data];
                  }
                  else return [...state];
              }); }
              stompClient.send(`/topic/room/${roomId}/key/res`, {}, JSON.stringify({nickname: nickname, key: key}));
            },
            {id: `sub-req-${roomId}`}
          );
          stompClient.send(`/topic/room/${roomId}/key/req`, {}, JSON.stringify({nickname: nickname, key: key}));

          stompClient.subscribe(
            `/topic/room/${roomId}/disconnect`,
            msg => {
              const data = JSON.parse(msg.body);
              setParticipants(state => {
                return state.filter(p => p.key !== data.key);
              });
              
              setConn(c => {
                const filtered_conns = c.filter(conn => conn.key !== data.key);
                return [...filtered_conns];
              });
              setVideos(videos => {
                const filtered_videos = videos.filter(video => video.key !== data.key);
                return [...filtered_videos];
              })
              
            },
            {id: `sub-disconnect-${roomId}`}
          );

          stompClient.subscribe(
            `/topic/room/${roomId}/offer/${key}`,
            msg => {
              const data = JSON.parse(msg.body);
              let remoteKey = data.key;
              let remoteDesc = data.desc;
              let new_conn = createConnection(stompClient, roomId, remoteKey, key, setVideos, setParticipants, setConn, stream);
              new_conn.setRemoteDescription(new RTCSessionDescription({type: remoteDesc.type, sdp: remoteDesc.sdp}));
              setConn(conn => {
                if(!conn.some(c => c.key === remoteKey)){
                  console.log("setconn");
                  return [...conn, {key: remoteKey, connection: new_conn}];
                } 
              });

              new_conn.createAnswer().then(answer => {
                stompClient.send(`/app/room/${roomId}/answer/${remoteKey}`, {}, JSON.stringify({
                  key: key,
                  desc: answer,
                }))
                new_conn.setLocalDescription(answer)
              })
              console.log(connRef.current);

            },
            {id: `sub-offer-${roomId}`}
          )

          stompClient.subscribe(
            `/topic/room/${roomId}/answer/${key}`,
            msg => {
              let data = JSON.parse(msg.body);
              let remoteKey = data.key;
              let remoteDesc = data.desc;

              // because this is the answer from the remote host that local host offered
              const target_conn = connRef.current.find(c => c.key === remoteKey);
              console.log("answer from remote", target_conn, connRef.current)
              target_conn.connection.setRemoteDescription(new RTCSessionDescription(remoteDesc));
            },
            {id: `sub-answer-${roomId}`}
          )

          stompClient.subscribe(
            `/topic/room/${roomId}/ice/${key}`,
            msg => {
              let data = JSON.parse(msg.body);
              let remoteKey = data.key;
              let remoteCand = data.data;

              // because this is the answer from the remote host that local host offered
              const target_conn = connRef.current.find(c => {
                return c.key === remoteKey;
              });
              console.log(remoteKey, target_conn, connRef.current);

              target_conn.connection.addIceCandidate(new RTCIceCandidate({
                candidate: remoteCand.candidate,
                sdpMLineIndex: remoteCand.sdpMLineIndex,
                sdpMid: remoteCand.sdpMid,
              }));
                
            },
            {id: `sub-ice-${roomId}`}
          )

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
        stompClient.unsubscribe(`sub-res-${roomId}`);
        stompClient.unsubscribe(`sub-req-${roomId}`);
        stompClient.unsubscribe(`sub-disconnect-${roomId}`);
        stompClient.unsubscribe(`sub-offer-${roomId}`);
        stompClient.unsubscribe(`sub-answer-${roomId}`);
        stompClient.unsubscribe(`sub-ice-${roomId}`);
      }
    };
  }, [stompClient, roomId]);

  //! channel 입장 시 채널 데이터 가져오기 && 퇴장시 리덕스 채널 정보 삭제
  const channel = useSelector((state) => state.chat.channel);
  const channels = useSelector((state) => state.chat.channels);
  useEffect(()=>{
    console.log(channels, channel); 
    if(!channels.data.some(c => c.id === channel.data.id)){
      navigate('/');
    }
  },[channels])

  useEffect(() => {
    //console.log('lets dispatch');
    dispatch(__getChannel(roomId));

    // add local stream
    setVideos(videos => [...videos, {
      key: key,
      videoElem: <VideoWrapper stream={stream} key={key} name={'내 영상'} isMuted={true}/>
    }])

    return () => {
      dispatch(CLEAR_CHANNEL());
      stompClient.send(`/topic/room/${roomId}/disconnect`, {}, JSON.stringify({key: key}));
      stream.getTracks().forEach(track => {
        track.stop(); 
      })
    };
  }, [roomId]);

  //getOut();
  window.setTimeout(scrollUL, 200);


  // video chat logic
  const [videos, setVideos] = useState([]);
  const [conn, setConn] = useState([]);
  const participantsRef = useRef(null);
  const videosRef = useRef(null);
  const connRef = useRef(null);
  participantsRef.current = participants;
  videosRef.current = videos;
  connRef.current = conn;

  useEffect(()=>{

    setTimeout(()=>{
      const participants = participantsRef.current;

      participants.map((p) => {
        if(!conn.some(c => p.key === c.key)){
          let conn = createConnection(stompClient, roomId, p.key, key, setVideos, setParticipants, setConn, stream); 

          // setConn({key: p.key, connection: conn});
          setConn(c => [...c, {key: p.key, connection: conn}]);

          conn.createOffer().then(offer => {
            conn.setLocalDescription(offer);
            stompClient.send(`/app/room/${roomId}/offer/${p.key}`, {}, JSON.stringify({
              key,
              desc: offer
            }));

          })
        }
      }) 
    }, 2000);

  },[]);
  
  

  return (
    <section className={styles.container}>
      {/* Channel name & Search box, Hr */}
      <RoomHeader channel={channel.data} />
      <hr className={styles.line} />

      <div className={styles.channelBox}>
        <div className={styles.voice}>
          <div className={styles.voiceList}>
          {participants.map((data) => (
            <div className={styles.profileInfo} key={data.key}>
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
                  {data.nickname}
                </span>
              </div>
            </div>
          ))}
          </div>

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
              <a href="/" style={{color: "black"}} onClick={e => {
                stompClient.send(`/topic/room/${roomId}/disconnect`, {}, JSON.stringify({key: key}));
              }}><i className='fa-solid fa-phone-slash'></i></a>
              <a href="#" style={{color: "black"}} onClick={e => {
                  stream.getTracks().forEach(track => {
                    if(track.kind == 'video'){
                      track.enabled = false;
                    }
                  });
              }}>
                <i className='fa-solid fa-video-slash'></i>
              </a>
              <a href="#" style={{color: "black"}} onClick={e => {
                stream.getTracks().forEach(track => {
                    if(track.kind == 'video'){
                      track.enabled = true;
                    }
                })
              }}>
                <i className='fa-solid fa-video onClick={e => {
                }}'></i>
              </a>
              {/* <i className='fa-solid fa-gear'></i> */}
            </div>
          </div>
        </div>
        <div className={styles.videoChat}>
          {videos.map(video => (
            video.videoElem
          ))}
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

const configuration = {
  iceServers: [
      {
          urls: 'stun:stun.l.google.com:19302',
      },
      {
          urls: "turn:turn.argnmp.com:3478",
          username: "hycord",
          credential: "hycord4321",
      },
  ]
};

const createConnection = (stompClient, roomId, remoteKey, myKey, setVideos, setParticipants, setConn, localStream) => {
  const conn = new RTCPeerConnection(configuration);

  conn.addEventListener('icecandidate', e => {
    console.log('icecandidate');
    if(e.candidate !== null){
      stompClient.send(`/app/room/${roomId}/ice/${remoteKey}`, {}, JSON.stringify({key: myKey, data: e.candidate}));
    }
    console.log('connectionState', conn.connectionState, conn);
  });

  conn.addEventListener('connectionstatechange', e => {
    switch(conn.connectionState) {
      case "new":
      case "connecting":
      case "connected":
        break;
      case "disconnected":
      case "failed":
      case "closed":
        setParticipants(state => {
          return state.filter(p => p.key !== remoteKey);
        });

        setConn(c => {
          const filtered_conns = c.filter(conn => conn.key !== remoteKey);
          return [...filtered_conns];
        });
        setVideos(videos => {
          const filtered_videos = videos.filter(video => video.key !== remoteKey);
          return [...filtered_videos];
        })
        break;
      default:
        break;
    }
  });

  conn.addEventListener('track', e => {
    console.log("start track", remoteKey, e.streams);
    setVideos(videos => {
      const filtered_videos = videos.filter(video => video.key !== remoteKey);
      return [...filtered_videos, {
        key: remoteKey,
        videoElem: <VideoWrapper stream={e.streams[0]} key={remoteKey}/>
      }];
    })
    
  })
  localStream.getTracks().forEach(track => {
    conn.addTrack(track, localStream);
  })

  return conn;
}
