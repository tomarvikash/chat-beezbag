import  {React, useEffect, useState,useContext } from 'react';
import Search from './Search';
import { onSnapshot, doc } from "firebase/firestore";
import { db } from '../Firebase';
import { AuthContext } from '../AuthProvider';
import { ChatContext } from '../ChatProvider';

function Sidebar (props) {    
    const {currentUser} =  useContext(AuthContext);    
    const {dispatch} =  useContext(ChatContext);    
    // const [selectedName, setSelectedName] = useState(null);

    // const [user, setUser] = useState();

    // const getUsers = async () => {
    //     const qry = query(collection(db, "users"));
    //     try {
    //       const querySnapshot = await getDocs(qry);
    //       if (querySnapshot.empty) {
    //         setErr(true);
    //       } else {
    //         const usersData = [];
    //         querySnapshot.forEach((doc) => {
    //           let data = doc.data();
    //           usersData.push(data); 
    //         });
    //         setUser(usersData); 
    //         setErr(false);
    //       }
    //     } catch (error) {
    //       setErr(true);
    //     }
    //   };

      // get Realtime data from firebase;
      const [chat, setChat] = useState([]);
      useEffect(() => {
        const getChats = () =>{
            const chat_list = onSnapshot(doc(db, "chatUser", currentUser.uid), (doc) => {
                setChat(doc.data());
            });
            return () =>{
            chat_list();
            };
        };
        currentUser?.uid && getChats();
      },[currentUser?.uid]);
      const storeName = async (name) => {
         console.log(name);
         dispatch({type:"CHANGE_USER",payload:name})
      };

	return (
        <>
            {currentUser?.displayName && <ul className='name_list_wrap current_user'>
                <li>
                    <figure>
                        <img src={currentUser?.photoURL} alt={currentUser?.displayName} loading="lazy" />
                    </figure>
                    <span className='content_details'>
                        <h3>{currentUser?.displayName}</h3>
                    </span>
                </li>
            </ul>}
            <Search />
            <ul className='name_list_wrap'>
                {chat ?
                  Object.entries(chat).map((items,index)=>{
              return <li key={index} onClick={() => storeName({uid:items[1].userInfo.userId,name:items[1].userInfo.fullName, userImg:items[1].userInfo.userProfile})}>
                        <figure >
                            <img src={items[1].userInfo.userProfile} alt={items[1].userInfo.fullName} loading="lazy" />
                            <span className={`status active`}></span>
                        </figure>
                        <span className='content_details'>
                            <h3>{items[1].userInfo.fullName} <span className='date'>{`${new Date(items[1].date?.seconds*1000).getDate()}/${new Date(items[1].date?.seconds*1000).getMonth()}/${new Date(items[1].date?.seconds*1000).getFullYear()}`}</span></h3>
                            <p>{items[1].userInfo.fullName} <span className='time'>{`${new Date(items[1].date?.seconds*1000).getHours()}:${new Date(items[1].date?.seconds*1000).getMinutes()}`}</span></p>
                        </span>
                      </li>    
                  }) : <p style={{padding:'30px 15px',fontSize:15,color:'#7b7777',textAlign:'left'}}><span style={{textTransform:'capitalize'}}>{currentUser.displayName}</span> hasn't done any chat yet.</p>
                }
            </ul>
        </>
    )
}


export default Sidebar;
