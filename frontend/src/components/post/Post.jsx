import React, { useState } from 'react';
import { AiOutlineLike, AiOutlineMessage } from 'react-icons/ai';
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { formatDate } from '../../utils/formatDate';
import { BiShare } from 'react-icons/bi';
import { MdSend } from 'react-icons/md';
import { useAuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { BaseUrl } from '../../utils/api'

const CreatePost = ({ post }) => {
  const { authUser } = useAuthContext()
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser._id))
  const [likeCount, setLikeCount] = useState(post.likes.length)

  const [content, setContent] = useState('')
  const [comments, setComments] = useState(post.comments)
  const [showComments, setShowComments] = useState(false)

  const handleLike = async () => {
    try {
      setIsLiked(isLiked)
      const { data } = await axios.post(`${BaseUrl}/posts/${post._id}/like`, {}, { withCredentials: true });
      const newdata = await axios.get(`${BaseUrl}/posts/${post._id}`, { withCredentials: true })
      const repsonse = newdata.data
      setLikeCount(repsonse.likes.length)
      if (data.message === 'Liked the Post') {
        setIsLiked(true)
      } else {
        setIsLiked(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    try {
      await axios.post(`${BaseUrl}/posts/${post._id}/comment`, { content }, { withCredentials: true })
      const newdata = await axios.get(`${BaseUrl}/posts/${post._id}`, { withCredentials: true })
      const repsonse = newdata.data
      setComments(repsonse.comments)
      setContent('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-xl mx-auto border border-gray-300 rounded-lg shadow-md p-4 my-6 bg-white">
      <div className="flex items-center mb-4">
        <img
          src={post.author.profilePic}
          alt="User"
          className="rounded-full h-10 w-10 mr-3"
        />
        <div>
          <p className="font-bold text-sm text-gray-700 ">{post.author.name}</p>
          <p className="text-gray-500 text-xs">{post.author.headline}</p>
          <div className="text-gray-500 text-xs">{formatDate(post.createdAt)}</div>
        </div>
      </div>

      <p className="mb-4 text-xs line-clamp-1">{post.content} </p>

      <div className="flex space-x-2 mb-4">
        <img src={post.image} alt="Post" className="rounded-md max-w-full" />
      </div>

      <div className="flex items-center border-t border-gray-400 pt-4 justify-between text-gray-500">
        <div className="flex gap-10">
          <div onClick={handleLike} className="flex items-center cursor-pointer">
            {!isLiked ? <FaRegHeart className="h-6 w-6 ml-1  text-gray-800 font-semibold text-sm" /> : <FcLike className="h-6 w-6 ml-1  text-gray-800 font-semibold text-sm" />}
            <span className="ml-1  text-gray-800 font-semibold text-sm">{likeCount} likes</span>
          </div>
          <div onClick={() => setShowComments(!showComments)} className="flex items-center cursor-pointer">
            <AiOutlineMessage className='text-2xl text-gray-900' />
            <span className="ml-1  text-gray-800 font-semibold text-sm">Comment</span>
          </div>
          <div className="flex ml-28 items-center cursor-pointer">
            <BiShare className='text-2xl text-gray-900' />
            <span className="ml-1 text-gray-800 font-semibold text-sm">Repost</span>
          </div>
          <div className="flex items-center cursor-pointer">
            <MdSend className='text-2xl text-gray-900' />
            <span className="ml-1 text-gray-800 font-semibold text-sm">Send</span>
          </div>
        </div>
      </div>
      <div className='w-full mt-4'>
        <input type="text" placeholder='Add Comment' value={content} onChange={(e) => setContent(e.target.value)} className='pl-2 bg-white text-gray-900 border-b border-gray-900  text-sm w-[460px] outline-none' />
        <button type='submit' onClick={handleComment} className='bg-blue-500 text-gray-900 px-4 rounded-sm ml-4'>Post</button>
      </div>
      <div>
        <button className='mt-4 text-xs flex w-full justify-end text-gray-700 hover:underline' onClick={() => setShowComments(!showComments)}>
          {showComments ? "...Hide comments" : "... View All comments"}
        </button>
        {showComments && (
          <div className="mt-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id}>
                  <div>
                    <p className='font-bold text-gray-900 flex justify-start rounded-sm text-sm'>{comment.user.name}</p>
                  </div>
                  <div className="mb-4 mt-1 ml-5 flex justify-between">
                    <p className="text-xs font-mono text-gray-800">{comment.content}</p>
                    <p className="text-xs text-gray-800">{new Date(comment.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
