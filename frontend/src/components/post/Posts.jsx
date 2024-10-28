import React, { useEffect, useState } from 'react';
import Post from './Post';
import axios from 'axios';
import { BaseUrl } from '../../utils/api';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        setError(null); 
        const { data } = await axios.get(`${BaseUrl}/posts/`, { withCredentials: true });
        
        const sortedPosts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setPosts(sortedPosts);
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  return (
    <div>
      {loading && <p>Loading posts...</p>}
      {error && <p>{error}</p>} 
      {!loading && !error && posts.length === 0 && <p>No posts available.</p>} 
      {posts.map((post) => (
        <Post key={post._id} post={post} /> 
      ))}
    </div>
  );
};

export default Posts;
