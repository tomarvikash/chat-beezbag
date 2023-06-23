import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../AuthProvider';

function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    // const [logindata,setlogindata] = useState();
    const [formError,setSormError] = useState("");
    const [submitDisable,setSubmitDisable] = useState(false);

    const {currentUser} = useContext(AuthContext);
    console.log("currentUser",currentUser);
    const onSubmit = data => {
        setSubmitDisable(true);
        signInWithEmailAndPassword(auth,data.email,data.password).then( (response) =>{
            const user = response.user
            setSubmitDisable(false)
            localStorage.clear();
            localStorage.setItem('UserToken', user.accessToken);
            const successToast = () => toast.success('User Login Successfully');
            successToast();
            navigate('/chat');
        })
        .catch( (error) =>{
            setSormError(error?.message);
            const errorToast = () => toast.error(error?.message);
            errorToast();
            setSubmitDisable(false);
        })
    };

	return <>
        <div className='login_page'>  
            <div className='form_wrap'>
                <div className='login_inner'>
                    <h2>Welcome back</h2>
                    <h6>Beezbag SignIn please enter your detail below</h6>
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <fieldset>
                            <input autoComplete="new-email" placeholder='Enter your email' type='email' defaultValue="" {...register("email", { required: true })} />
                            {errors.email && <span className='form_error'>This field is required</span>}
                        </fieldset>
                        <fieldset>
                            <input autoComplete="new-password" placeholder='Enter password' type='password' {...register("password", { required: true })} />
                            <span className='forgot_link'>
                                <Link to="/forgot">Forgot Password</Link>
                            </span>
                            {errors.password && <span className='form_error'>This field is required</span>}
                        </fieldset>
                        {formError && <div className='form_error'>{formError}</div> }
                        <fieldset>
                            <input type="submit" disabled={submitDisable} value="Sign In" />
                        </fieldset>
                        <p>Don't have an account.? <Link to="/signup">SignUp</Link></p>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default Login;
