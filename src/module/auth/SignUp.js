import React, { useState} from 'react';
import { useForm } from "react-hook-form";
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import { auth,storage,db } from '../../Firebase';
import { Link ,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import './Login.css'

function SignUp() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [progressbar,setProgressBar] = useState('');
    const [formError,setFormError] = useState();
    const [submitDisable,setSubmitDisable] = useState(false);
    const [userImg, setUserImg] = useState();

    function handleChange(e) {
        console.log("Click", e);
        setUserImg(URL.createObjectURL(e.target.files[0]));
    }

    const successToast = () => toast.success('SignUp SuccessFully', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    const ErrorToast = () => toast.error(formError, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const onSubmit = (data) => {
        setSubmitDisable(true);
        console.log("Show Image url", data);

        createUserWithEmailAndPassword(auth, data.email, data.password)
          .then(async (response) => {
            const user = response.user;
            setSubmitDisable(false);
            const storageRef = ref(storage, data.profilepic[0].name);
            const uploadTask = uploadBytesResumable(storageRef, data.profilepic[0]);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload Progress: ", progress + "%");
                setProgressBar(progress)
              },
              (error) => {
                console.error("ImageUpload Error:", error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref)
                  .then(async (downloadURL) => {
                    await updateProfile(user, {
                      displayName: data.fullname,
                      photoURL: downloadURL,
                    });
                    await setDoc(doc(db, "users", user.uid), {
                      userId: user.uid,
                      fullName: data.fullname,
                      email: data.email,
                      userProfile: downloadURL,
                    });
                    await setDoc(doc(db,"chatUser",user.uid),{});
                  })
                  .catch((error) => {
                    console.error("Error in getDownloadURL:", error);
                });
              }
            );
            navigate("/login");
          })
          .then(() => {
            successToast();
          })
          .catch((error) => {
            setFormError(error.message);
            ErrorToast();
            setSubmitDisable(false);
          });
      };
	return <>
        <div className='login_page'>  
            <div className='form_wrap'>
                <div className='login_inner'>
                    <h2>Welcome Beezbag </h2>
                    <h6>Beezbag SignUp please enter your detail below to create new account.</h6>
                    {progressbar && <p>File Upload `${progressbar}` + "%"</p>}
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <fieldset>
                            <input  style={{display:'none'}} type="file" id="uploadAvtar" {...register("profilepic", { required: true, onChange:(e) => {handleChange(e)} })} />
                            <label htmlFor="uploadAvtar">
                                <img width="80px" height="80px" id="user_avtar" src={`${userImg ? userImg : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png'}`} alt="Profile User" />
                                <span>&#x271B; Profile Image</span>
                            </label>
                            {errors.profilepic && <span className='form_error'>Please upload profile pic first!</span>}
                        </fieldset>
                        <fieldset>
                            <input autoComplete="new-email" placeholder='Enter Your Email' type='email' {...register("email", { required: true })} />
                            {errors.email && <span className='form_error'>Email field is required</span>}
                        </fieldset>
                        <fieldset>
                            <input autoComplete="new-name" placeholder='Enter Full Name' type='text' {...register("fullname", { required: true })} />
                            {errors.fullname && <span className='form_error'>Please enter full name first!</span>}
                        </fieldset>
                        <fieldset>
                            <input autoComplete="new-password" placeholder='Enter password' type='password' {...register("password", { required: true })} />
                            {errors.password && <span className='form_error'>Please enter password</span>}
                        </fieldset>
                        
                        {formError && <div className='form_error'>{formError}</div> }
                        <fieldset>
                            <input type="submit" value="Sign In" disabled={submitDisable} />
                        </fieldset>
                        <p>Don't have an account.? <Link to="/login">Sign In</Link></p>
                    </form>
                </div>
            </div>
            
        </div>
    </>
}

export default SignUp;
