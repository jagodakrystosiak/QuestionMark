import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppContext from './Contexts/AppContext';
import Home from './Pages/Home/Home';
import './App.css';

import Navbar from './Components/Navbar/Navbar';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';

import HttpClient from './Services/HttpClient';
import CreateQuestion from './Pages/Question/Create/CreateQuestion';
import ShowQuestion from './Pages/Question/Show/ShowQuestion';

function App() {
  useEffect(() => {
    init();
  }, []);

  const [isInitiated, setIsInitiated] = useState(false);
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    localStorage.setItem('token', null);
  }

  const init = async () => {
    const { data } = await HttpClient().get('/api/user/init');
    setUser(data.user);
    setIsInitiated(true);
  };

  return (
    <div>
      {isInitiated && (
        <AppContext.Provider value={{ user, setUser, logout }}>
          <Router>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Home />} exact/>
              <Route path="/question/:id" element={<ShowQuestion/>}></Route>
              <Route path="/profile" element={user ? <Profile/> : { component: () => <Navigate to="/auth/login" /> }}/>
              <Route path="/question/create" element={user ? <CreateQuestion/> : { component: () => <Navigate to="/auth/login" /> }}/>
              <Route path="/auth/register" element={!user ? <Register/> : { component: () => <Navigate to="/" /> }}/>
              <Route path="/auth/login" element={!user ? <Login/> : { component: () => <Navigate to="/" /> }}/>
            </Routes>
          </Router>
        </AppContext.Provider>
      )}
    </div>
  );
}

export default App;
