import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './Login.css'
import { Link } from 'react-router-dom';
import { auth } from '../../Firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendPasswordResetEmail } from 'firebase/auth';

function ForgotPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [submitDisable] = useState(false);
    
    const onSubmit = async (data) => {
        let emailvalue = data?.email
        try {
            await sendPasswordResetEmail(auth, emailvalue);
            const successToast = () => toast.success('Password reset email sent');
            successToast();
        } catch (error) {
            const errorToast = () => toast.error(error.message);
            errorToast();        
        }
    }

	return <>
        <div className='login_page'>  
            <div className='form_wrap'>
                <div className='login_inner'>
                    <h2>Forgot Password</h2>
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <fieldset>
                            <input autoComplete="new-email" placeholder='Enter your email' type='email' defaultValue="" {...register("email", { required: true })} />
                            {errors.email && <span className='form_error'>This field is required</span>}
                        </fieldset>
                        <fieldset>
                            <input type="submit" disabled={submitDisable} value="Submit" style={{marginTop:0}} />
                        </fieldset>
                        <p>Back to <Link to="/login">Sign In</Link></p>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default ForgotPassword;
