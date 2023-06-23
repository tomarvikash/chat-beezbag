import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import Lottie from 'react-lottie';
import animationData from './99284-beezbag-logo.json';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { AuthContext } from '../AuthProvider';
import {  signOut } from "firebase/auth";
import {auth} from '../Firebase';


const handleLogout = () => {
    signOut(auth).then(() => {
        const successToast = () => toast.success('User SignOut Successfully');
        successToast();
        return localStorage.clear("UserToken");
    }).catch((error) => {
        console.log("Error Header",error);
    });
}
function Header (props){
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    
    const items = [
        {
            name : 'About',
            link: '/about',
            id:'1'
        },
        {
            name : 'Login',
            link: '/login',
            id:'2'
        },
    ]

	return (
        <header>
            <div className='container-fluid'>
                <div className='row align-items-center'>
                    <div className='col-md-4'>
                        <Link to={`${props.name ? '/chat':'/'}`}>
                            <Lottie 
                                options={defaultOptions}
                                height={50}
                                width={110}
                                style={{marginLeft:0}}
                            />
                        </Link>
                    </div>
                    <div className='col-md-8'>
                        <ul className='mb-0' role="navigation"> 
                            {!props.name ? 
                                items.map ((items,index) =>{
                                    return (<li key={index}>
                                        <Link to={`${items.link}`}>
                                            {items.name}
                                        </Link>
                                    </li>
                                    )
                                }) : <>
                                    <li>
                                        <Link to="/chat">Chat</Link>
                                    </li>
                                    <li>
                                        <Link to="/about">About</Link>
                                    </li>
                                    {props.name.photoURL && 
                                        <>
                                            {/* <li style={{marginLeft:'10px'}}>
                                                <img width="30px" height="30px" style={{borderRadius:'50%'}} src={props.name.photoURL} alt={props.name.displayName} />
                                                <Link to="/profile" style={{marginLeft:'5px'}}>{props.name.displayName}</Link>
                                            </li> */}
                                            <li>
                                                <Link to='/login' style={{marginLeft:'12px'}} onClick={() => handleLogout()}>Logout</Link>
                                            </li>
                                        </>
                                    }
                                </>
                            }
                        </ul>
                    </div>
                </div> 
            </div>
        </header>
    )
}


export default Header;
