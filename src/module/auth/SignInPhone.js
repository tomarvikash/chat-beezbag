import React from 'react';
import { useForm } from "react-hook-form";
import './Login.css'
import { Link } from 'react-router-dom';
import {auth } from '../../Firebase';
import { signInWithPhoneNumber} from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';

function SignInPhone() {
    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = data => {
        const phoneNumber = data.phone;

        const appVerifier = window.recaptchaVerifier;

        console.log(phoneNumber,window.recaptchaVerifier);

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                console.log("Getting Confirm Result 1 --->");

            window.confirmationResult = confirmationResult;
            
            console.log("Getting Confirm Result 000 2");

            }).catch((error) => {
                console.error("Getting error",error.message);
        });
    };

    

	return <>
        <div className='login_page'>  
            <div className='form_wrap'>
                <div className='login_inner'>
                    <h2>Enter Mobile</h2>
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <fieldset>
                            <input autoComplete="new-email" placeholder='+91-00 00 000-000' type='number' pattern="[0-9]"  defaultValue="" {...register("phone", { required: true })} />
                            {errors.phone && <span className='form_error'>This field is required</span>}
                        </fieldset>
                        <fieldset>
                            <input type="submit"  value="Send OTP" />
                        </fieldset>
                        <p>Don't have an account.? <Link to="/login">Sign In</Link></p>
                    </form>
                </div>
            </div>
            <div id="recaptcha-container"></div>
        </div>
    </>
}

export default SignInPhone;
