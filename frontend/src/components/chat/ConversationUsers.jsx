import Conversation from './Conversation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BaseUrl } from '../../utils/api'

const ConversationUsers = () => {
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
        <div className='w-80 border-r border-gray-600 h-[465px] '>
            <div className='h-[465px] overflow-y-scroll'>
                {users.length > 0 && users.map((user) => {
                    return <Conversation user={user} key={user._id} />
                })}
            </div>
        </div>
    )
}

export default ConversationUsers
