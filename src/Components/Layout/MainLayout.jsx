// MainLayout
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Conatainer from './Conatainer';
import { RiBookOpenFill } from 'react-icons/ri';

const MainLayout = ({ children }) => {

    const navItem = <>

        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'assignments'}>Assignments</NavLink></li>
        <li><NavLink to={'create-assignments'}> Create assignments</NavLink></li>
        <li><NavLink to={'my-assignments'}> My Assignments</NavLink></li>
        <li><NavLink to={'/login'}>Login</NavLink></li>

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
                                <RiBookOpenFill size={40} color='#4bc375' />
                                <div className='text-lg font-bold' >Online Group Study</div>
                            </div>


                            <div className="flex-none lg:flex items-center hidden ">
                                <ul className="menu menu-horizontal">
                                    {/* Navbar menu content here */}
                                    {navItem}
                                    <div className="dropdown tooltip tooltip-left dropdown-end" data-tip='hello'>
                                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full tooltip" data-tip="hello">
                                                <img className='tooltip' data-tip='hello' src="https://images.pexels.com/photos/5553050/pexels-photo-5553050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                                            </div>
                                        </label>
                                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                            <li>
                                                <a className="justify-between">
                                                    Profile
                                                    <span className="badge">New</span>
                                                </a>
                                            </li>
                                            <li><a>Settings</a></li>
                                            <li><a>Logout</a></li>
                                        </ul>
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

            <footer className="footer mt-4 footer-center p-4 bg-base-300 text-base-content">
                <aside>
                    <p>Copyright © 2023 - All right reserved by Online Group Study </p>
                </aside>
            </footer>
        </>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node,
}

export default MainLayout;