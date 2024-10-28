import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import './index.css';
import Network from './pages/Network';
import MessagePage from './pages/MessagePage';
import EditBanner from './components/EditBanner';
import NoPage from './pages/NoPage';
import { useAuthContext } from './context/AuthContext';

const App = () => {
  const location = useLocation();
  const { authUser } = useAuthContext();

  const shouldHideHeader = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className='min-h-screen'>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={'/login'} />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/register' element={authUser ? <Navigate to='/' /> : <Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path='/edit-banner' element={<EditBanner />} />
        <Route path='/network' element={<Network />} />
        <Route path='/messaging' element={<MessagePage />} />
        <Route path='/jobs' element={<NoPage />} />
        <Route path='/notifications' element={<NoPage />} />
      </Routes>
    </div>
  );
};

export default App;
