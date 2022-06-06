import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import AppContext from './Contexts/AppContext';
import Home from './Pages/Home/Home';

import "./Components/Page/page.css";
import "./Components/Form/Form.css";
import Navbar from './Components/Navbar/Navbar';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import CreateCategory from './Pages/Category/Create/CreateCategory';
import HttpClient from './Services/HttpClient';
import ShowCategory from './Pages/Category/Show/ShowCategory';
import CreateForum from './Pages/Forum/Create/CreateForum';

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
              <Route path="/category/:id" element={<ShowCategory/>}></Route>
              <Route path="/forum/create/:categoryId" element={user ? <CreateForum/> : { component: () => <Navigate to="/auth/login" /> }}></Route>
              <Route path="/profile" element={user ? <Profile/> : { component: () => <Navigate to="/auth/login" /> }}/>
              <Route path="/category/create" element={user ? <CreateCategory/> : { component: () => <Navigate to="/auth/login" /> }}/>
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
