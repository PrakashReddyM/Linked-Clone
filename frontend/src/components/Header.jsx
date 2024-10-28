import React from 'react';
import logo from '../assets/logo.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { RiHome2Fill } from "react-icons/ri";
import { BsFillBagDashFill } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { MdPerson } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { useAuthContext } from '../context/AuthContext';

const Header = () => {
    const navigate = useNavigate()
    const {setAuthUser} = useAuthContext()
    const handleLogout = () => {
        localStorage.removeItem('user')
        setAuthUser(null)
        navigate('/login')
    }
    return (
        <div className="bg-white shadow-md">
            <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
                <div className="flex items-center">
                    <img src={logo} alt="logo" className="h-8 mr-4" />
                    <div className="relative">
                        <input
                            type="search"
                            placeholder="Search"
                            className="border rounded-md bg-blue-100 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <FiSearch className="absolute left-3 top-3 text-gray-500" />
                    </div>
                </div>

                <div className="flex space-x-10">
                    <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                        <RiHome2Fill className="text-2xl mb-1" />
                        <span className="text-xs font-semibold">Home</span>
                    </Link>
                    <Link to="/network" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                        <MdPerson className="text-2xl mb-1" />
                        <span className="text-xs font-semibold">My Network</span>
                    </Link>
                    <Link to="/jobs" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                        <BsFillBagDashFill className="text-2xl mb-1" />
                        <span className="text-xs font-semibold">Jobs</span>
                    </Link>
                    <Link to="/messaging" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                        <BiMessageRoundedDetail className="text-2xl mb-1" />
                        <span className="text-xs font-semibold">Messaging</span>
                    </Link>
                    <Link to="/notifications" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                        <IoMdNotifications className="text-2xl mb-1" />
                        <span className="text-xs font-semibold">Notifications</span>
                    </Link>
                    <Link to="/profile" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                        <MdPerson className="text-2xl mb-1" />
                        <span className="text-xs font-semibold">Me</span>
                    </Link>
                </div>

                <div>
                    <button onClick={handleLogout}><LuLogOut className="text-2xl mb-1 text-gray-800" /></button>
                </div>
            </div>
        </div>
    );
};

export default Header;
