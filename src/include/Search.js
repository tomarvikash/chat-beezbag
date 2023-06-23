import React, { useState,useContext } from "react";
import { db } from '../Firebase';
import { collection, query, getDocs, setDoc,where, getDoc,doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from '../AuthProvider';

function Search() {
  const [username, setUserName] = useState("");
  const [user, setUser] = useState();
  const [err, setErr] = useState(false);
  const {currentUser} =  useContext(AuthContext);

  const handleSearch = async () => {
    const qry = query(collection(db, "users"), where("fullName", "==", username));
    try {
      const querySnapshot = await getDocs(qry);
      if (querySnapshot.empty) {
        setErr(true);
      } else {
        querySnapshot.forEach((doc) => {
          const usersData = [];
          let data = doc.data();
          usersData.push(data); 
          setUser(usersData);

        });
        setErr(false);
      }
    } catch (error) {
      setErr(true);
    }
  };

  const handleKey = (inp) => {
    if (inp.code === 'Enter') {
      handleSearch();
    }
  };

  const handleSelectUser = async () =>{
    const combinedId = currentUser?.uid > user[0]?.userId ? currentUser?.uid + user[0]?.userId : user[0]?.userId + currentUser?.uid;
    try {
      const res  = await getDoc(doc(db,"chats",combinedId));
      // console.log("check Exists ", !res.exists());
      // if(!res.exists()){
        // update or create user chat
          await setDoc(doc(db,"chats",combinedId),{messages:[]});
          // create a chat in chat collection;
          await updateDoc(doc(db,'chatUser',currentUser?.uid),{
            [combinedId+".userInfo"]:{
              userId:user[0]?.userId,
              fullName:user[0].fullName,
              userProfile:user[0].userProfile
            },
            [combinedId+".date"]:serverTimestamp(),
          });
          await updateDoc(doc(db,'chatUser',user[0].userId),{
            [combinedId+".userInfo"]:{
              userId:currentUser?.userId,
              fullName:currentUser?.fullName,
              userProfile:currentUser?.userProfile
            },
            [combinedId+".date"]:serverTimestamp(),
            [combinedId+".lastMessage"]:[],
          });
      // }
    } catch (error) {
      setErr(true);
    }
    setUserName("");
    setErr(false);
    setUser(null);
  }
  return (
    <div className="search_form">
      <div className="search_input">
        <form>
          <input
            type="text"
            placeholder="Find user..."
            name="search"
            onKeyDown={handleKey}
            onChange={(inp) => setUserName(inp.target.value)}
            value={username}
          />
        </form>
      </div>
      {err && <p>Data Not Found</p>}
      {user && (
        <div className="user_details_search" onClick={() => handleSelectUser()}>
          <figure>
            <img loading="lazy" width="30px" height="30px" src={user[0].userProfile} alt="username" />
          </figure>
          <h3>{user[0].fullName}</h3>
        </div>
      )}
    </div>
  );
}

export default Search;
