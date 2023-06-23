import React, { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthProvider";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const {currentUser} = useContext(AuthContext);

    const INITIAL_STATE = {
        chatID:'null',
        user:{}
    }
    const chatReducer = (state,action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return{
                    chatId:currentUser?.uid > action.payload.uid ? currentUser?.uid + action.payload.uid : action.payload.uid + currentUser?.uid,
                    user:action.payload
                }
            default:
            return state;
        }
    }
  
    const [state,dispatch] = useReducer(chatReducer,INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ data:state,dispatch}}>
      {children}
    </ChatContext.Provider>
  );
};