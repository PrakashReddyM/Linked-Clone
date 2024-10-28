import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BaseUrl } from '../utils/api'

const RightSidebar = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get(`${BaseUrl}/user/`, { withCredentials: true })
                setUsers(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUsers()
    }, [])
    return (
        <div style={{ width: '23%' }} className='mr-1 h-full hide-scrollbar overflow-y-auto'>
            {
                users.map((user) => {
                    return <main key={user._id} className='bg-white w-full rounded-lg shadow-md ml-6 mt-4'>
                        <div className='relative'>
                            <img
                                src={user.bannerImg} alt="banner"
                                className='w-full object-contain rounded-t-lg' />
                            <img
                                src={user.profilePic} alt="profile"
                                className='absolute w-16 h-16 rounded-full border-1 border-white top-10 left-6' />
                        </div>

                        <div className='p-2 mt-10 relative'>
                            <h2 className='text-xs text-gray-800 font-extrabold'>{user.name}</h2>
                            <p style={{ fontSize: '11px' }} className='text-gray-700 text-xs mt-1 '>{user.headline}</p>
                        </div>
                    </main>
                })
            }
        </div>
    )
}

export default RightSidebar