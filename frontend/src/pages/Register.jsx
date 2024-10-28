import React, { useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {setAuthUser} = useAuthContext()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post( `${BaseUrl}/auth/signup`,{ name, email, password },{ withCredentials: true });
      localStorage.setItem('user',JSON.stringify(data))
      setAuthUser(data)
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setError(error.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-80">
        <div className="mb-4">
          <label htmlFor="name" className="block font-bold text-md text-gray-600 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 font-mono text-sm font-semibold border border-gray-300 rounded focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold text-md text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border font-mono text-sm font-semibold border-gray-300 rounded focus:outline-none"
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="password" className="block font-bold text-md text-gray-600 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border font-mono text-xs font-semibold border-gray-300 rounded focus:outline-none"
            required
          />
        </div>
        <p className='text-sm font-semibold mb-4 text-gray-700'>Already have an account? <Link to={'/login'}><span className='text-blue-500'>Login Here</span></Link></p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full font-semibold p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;
