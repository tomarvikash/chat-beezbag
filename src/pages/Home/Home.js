import React, { useState ,useEffect, useContext} from 'react';
import './Home.css'
import Sidebar from '../../include/SidebarNav';
import Lottie from 'react-lottie';
import animationData from './128009-no-data.json';
import { ChatContext } from '../../ChatProvider';
import { Timestamp, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import { AuthContext } from '../../AuthProvider';
import { v4 as uuid } from 'uuid';

function Home(props) {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid"
      }
    };
    
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const {data} = useContext(ChatContext);
    const {currentUser} = useContext(AuthContext);

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };

    const handleSendMessage = async () => {
      if (inputValue.trim() !== '') {
        setInputValue('');
        await updateDoc(doc(db,'chats',data.chatId),{
            messages:arrayUnion({
                id:uuid(),
                senderId:currentUser?.uid,
                message:inputValue,
                date:Timestamp.now(),
            }),
        });
      }
    };
    
    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
            handleSendMessage();
            event.preventDefault();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [handleSendMessage]);


    useEffect(() => {
          const getChats = () =>{
              const chat_list = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
                  doc.exists() && setMessages(doc.data());
              });
              return () =>{
                  chat_list();
              };
          };
          data.chatId && getChats();
    },[data.chatId]);

	return <>
        <div className='home'>  
            <div className='left-sidebar'>
                <Sidebar  />
            </div>
            <div className='right_aside'>
                {data.chatId ?
                    <div className='head_chat'>
                        <figure>
                            <img loading="lazy" src={`${data.user.userImg}`} alt={data.user.name} />
                            <span className={`status active`}></span>
                        </figure>
                        <div className='user_details'>
                            <h3>{data.user.name}</h3>
                        </div>
                    </div>
                    : <div className='noChat_data'>
                        <h6>No messages list.</h6>
                        <Lottie 
                            options={defaultOptions}
                            height={600}
                            width={'100%'}
                        />
                    </div>
                }
                <div className='chat_body'>
                    {data.chatId &&
                        <div className='chat_wraps'>
                            <div className='innter_list_chat'>
                                {messages.messages?.map((item, index) => ( 
                                    <>
                                        <span key={index} className='message_wrap'>
                                            <div  className={`message ${(item.senderId === currentUser?.uid) ? 'sender':'reciver'}`}>
                                                <img src={(item.senderId === currentUser?.uid) ? currentUser?.photoURL : data.user.userImg} className='userProfile' alt="" />
                                                <span className="message-text">{(item.senderId === currentUser?.uid) ? item.message:item.message}</span>
                                            </div>
                                        </span>
                                    </>
                                ))}
                            </div>
                        </div>
                    }    
                </div>
                {data.chatId && <div className='chat_footer'>
                    <textarea
                        className='editer' 
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                        />
                    <button className='send_cta_btn'
                     onClick={(e) => handleSendMessage(e)}
                    >
                        <span>&#10146;</span>
                    </button>
                </div>}
            </div>
        </div>
    </>
}

export default Home;
