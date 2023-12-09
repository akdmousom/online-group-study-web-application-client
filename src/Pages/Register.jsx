import { NavLink, useNavigate } from "react-router-dom";
import Conatainer from "../Components/Layout/Conatainer";

import sideImg from '../assets/images/undraw_male_avatar_g98d.svg';
import {useState } from "react";
import useAuth from "../Hooks/UseAuth";
import toast from "react-hot-toast";
import axios from "axios";
import {FcGoogle} from 'react-icons/fc';

const Register = () => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [fullName,setFullName] = useState(null)
    const [profileImg,setImg] = useState(null)
    const { createUser,googleLogin } = useAuth();
    const navigate = useNavigate()

    const handleFormSubmit = async (e) => {

        e.preventDefault();

        const toastId = toast.loading('Loading...')

        if (/[A-Z][@#$%^&+=!]/.test(password)) {

            try {

                await createUser(email, password)
                
                toast.success('User Created Successfully..', { id: toastId })

                const userData = {
                    fullName,
                    profileImg,
                    email,

                }

               axios.post('https://online-group-study-server-kohl.vercel.app/api/v1/users', userData)
               .then(response=>{
                if (response) {

                   return navigate('/')
                    
                }
               })



            } catch (error) {
                toast.error(error, { id: toastId })
            }


        }


        else {
            return toast.error('Please enter 1 capital later & Special Carecter', { id: toastId })
        }
    
  
    
    }



        return (
            <Conatainer>
                <div className="hero min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse items-center">
                        <div className="text-center lg:text-left">

                            <img className="lg:w-full lg:h-full h-28 object-cover hidden lg:block" src={sideImg} alt="" />

                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">


                            <form onSubmit={handleFormSubmit} className="card-body">
                                <h1 className="text-3xl text-center font-bold">Register now!</h1>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input onBlur={(e) => setFullName(e.target.value)} type="text" placeholder="Full Name" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Profile Img Url</span>
                                    </label>
                                    <input onBlur={(e) => setImg(e.target.value)} type="text" placeholder="Profile Image Url" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input onBlur={(e) => setEmail(e.target.value)} type="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input onBlur={(e) => setPassword(e.target.value)} type="password" placeholder="password" className="input input-bordered" required />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                        <div className="text-xs"><p>Have an accout <span className="text-primary font-bold"><NavLink to={'/login'}>Login</NavLink></span></p></div>
                                    </label>

                                </div>
                                <div className="flex justify-center mt-2">
                                    <button onClick={()=> googleLogin()} className="btn btn-ghost"><FcGoogle fontSize={41}></FcGoogle></button>
                                </div>
                                <h1 className="text-center text-xs text-secondary">Sign Up With</h1>

                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Conatainer>
        );
    };

    export default Register;