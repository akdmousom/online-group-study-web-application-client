import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Conatainer from "../Components/Layout/Conatainer";
import sideImg from '../assets/images/undraw_login_re_4vu2.svg'
import useAuth from "../Hooks/UseAuth";
import { FcGoogle } from 'react-icons/fc';
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";


const Login = () => {
    const { googleLogin, loginUser } = useAuth();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate(null);
    const location = useLocation()



    const googleSignIn = () =>{
        const toastID = toast.loading('Loading...')
        googleLogin()
        .then(res => {
            const userEmail = res?.user?.email;
            const payLoad = {
                userEmail
            }
            axios.post(`https://online-group-study-server-14kb78srt-arijit-kumar-das-projects.vercel.app/api/v1/access-token`, payLoad, { withCredentials: true })
                .then(res => {
                    if (res) {
                        toast.success('Login Successfull', { id: toastID })
                        navigate(location?.state || '/')
                    }
                })

        })

        .catch((error) => {
            const errorCode = error.code;
            toast.error(errorCode, { id: toastID })
        });
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const toastID = toast.loading('Loading...')

        try {

            await loginUser(email, password)
                .then(res => {
                    const userEmail = res?.user?.email;
                    const payLoad = {
                        userEmail
                    }
                    axios.post(`https://online-group-study-server-14kb78srt-arijit-kumar-das-projects.vercel.app/api/v1/access-token`, payLoad, { withCredentials: true })
                        .then(res => {
                            if (res) {
                                toast.success('Login Successfull', { id: toastID })
                                navigate('/')
                            }
                        })

                })

                .catch((error) => {
                    const errorCode = error.code;
                    toast.error(errorCode, { id: toastID })
                });





        } catch (error) {

            toast.error(error, { id: toastID })

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


                        <form onSubmit={handleLogin} className="card-body">
                            <h1 className="text-3xl text-center font-bold">Login now!</h1>
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
                                    <div className="text-xs"><p>Don&apos;t have accout <span className="text-primary font-bold"><NavLink to={'/register'}>Register</NavLink></span></p></div>
                                </label>

                            </div>

                            <div className="flex justify-center mt-2">
                                <button onClick={googleSignIn} className="btn btn-ghost"><FcGoogle fontSize={41}></FcGoogle></button>
                            </div>
                            <h1 className="text-center text-xs text-secondary">Sign Up With</h1>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Conatainer>
    );
};

export default Login;