// MainLayout
import PropTypes from 'prop-types';
import { NavLink, Navigate } from 'react-router-dom';
import Conatainer from './Conatainer';
import { RiBookOpenFill } from 'react-icons/ri';
import useAuth from '../../Hooks/UseAuth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import userImg from '../../assets/images/user.png'
import Footer from '../Footer/Footer';



const MainLayout = ({ children }) => {

    const { user, logoutUser, loading } = useAuth();
    const [userProfile, setUserProfile] = useState();


    useEffect(() => {

        axios.get(`http://localhost:5000/api/v1/users?email=${user?.email}`)
            .then(response => {
                setUserProfile(response.data);

            })
    }, [user])




    const handleLogOut = () => {
        logoutUser()
        
        return <Navigate to={'/'}></Navigate>
    }

    const navItem = <>

        {
            loading ? 'loading...' : <>
                <li><NavLink to={'/'}>Home</NavLink></li>
                <li><NavLink to={'assignments'}>Assignments</NavLink></li>
                {
                    user?.email ? <>

                        <li><NavLink to={'create-assignments'}> Create assignments</NavLink></li>
                        <li><NavLink to={'my-assignments'}> My Assignments</NavLink></li>
                        <li><NavLink to={'submitted-assignment'}> Submitted Assignment</NavLink></li>
                        <li><button onClick={handleLogOut}>Logout</button></li>

                    </> : <li><NavLink to={'/login'}>Login</NavLink></li>

                }

            </>
        }



    </>




    return (
        <>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar bg-base-300">
                        <Conatainer>
                            <div className="flex-none lg:hidden">
                                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                </label>
                            </div>


                            <div className="flex-1 flex gap-4 items-center px-2 mx-2">
                                <RiBookOpenFill size={30} color='#4bc375' />
                                <div className=' text-sm ' >Online Group Study</div>
                                <div className="dropdown tooltip md:hidden tooltip-left dropdown-end" data-tip={userProfile?.fullName || user?.displayName}>
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full tooltip" data-tip="hello">
                                            <img className='tooltip' data-tip='hello' src={user?.email ? userProfile?.profileImg || user?.photoURL : userImg} />
                                        </div>
                                    </label>

                                </div>
                            </div>


                            <div className="flex-none lg:flex items-center hidden ">
                                <ul className="menu flex items-center menu-horizontal">
                                    {/* Navbar menu content here */}
                                    {navItem}
                                    <div className="dropdown tooltip tooltip-left dropdown-end" data-tip={userProfile?.fullName || user?.displayName}>
                                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full tooltip" data-tip="hello">
                                                <img className='tooltip' data-tip='hello' src={user?.email ? userProfile?.profileImg || user?.photoURL : userImg} />
                                            </div>
                                        </label>

                                    </div>
                                </ul>
                            </div>
                        </Conatainer>
                    </div>
                    {/* Page content here */}
                    {children}
                </div>
                <div className="drawer-side">

                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-72 min-h-full bg-base-200">
                        {/* Sidebar content here */}
                        {navItem}

                    </ul>

                </div>
            </div>
            <Footer />
        </>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node,
}

export default MainLayout;