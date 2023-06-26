import React, { useState ,useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,Routes,Route,} from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Login from './module/auth/Login';
import SignUp from './module/auth/SignUp';
import { AuthProvider } from './AuthProvider';
import Header from './include/header';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './Firebase';
import UserProfile from './pages/Profile/UserProfile';
import { ChatProvider } from './ChatProvider';
import ForgotPassword from './module/auth/ForgotPassword';
import SignInPhone from './module/auth/SignInPhone';

function App() { 
  const [isLogin,setIsLogin] = useState([false]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(user);
      } else {
        setIsLogin(false);
      }
    });
  },[]);
        return (
          <AuthProvider>
            <ChatProvider>
              <Router >
                <main role="main">
                  <Header name={isLogin} />
                  <Routes> 
                      <Route path="/" element={<Login/> } /> 
                      <Route path="/login" element={<Login/> } /> 
                      <Route path="/forgot" element={<ForgotPassword/> } /> 
                      <Route path="/signphone" element={<SignInPhone/> } /> 
                      <Route path="/signup" element={<SignUp/> } /> 
                      <Route path="/chat" element={<Home/> } /> 
                      <Route path="/profile" element={<UserProfile user={isLogin} /> } /> 
                      <Route path="/about" element={<About/> } /> 
                      <Route path="/contact" element={<Contact/> } /> 
                  </Routes> 
                </main>
                <ToastContainer />
            </Router>
          </ChatProvider>  
        </AuthProvider>
      );
  }
  

export default App;
