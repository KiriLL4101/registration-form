import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { useDispatch } from "react-redux";

import { useAuth } from './hooks/auth.hook.js'
import { useRoutes } from './routes';
import { setAuth } from './redux/action/auth.js';

import './app.css';
import 'materialize-css'
import Navbar from './components/Navbar.js';


function App() {
  const { login, logout, userId } = useAuth()
  const isAuth = !!userId
  const router = useRoutes(isAuth)

  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(setAuth({ login, logout, userId }))
  }, [])

  return (
    <BrowserRouter>
      {isAuth && <Navbar />}
      {router}
    </BrowserRouter>
  );
}

export default App;
