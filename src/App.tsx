import React, { useEffect, useState } from 'react';
import {Route, Routes, Link, useNavigate} from 'react-router-dom'
import './App.css';
import MainPage from './components/MainPage';
import Set from './components/Set';
import Chat from './components/Chat';
import {useCookies} from 'react-cookie';

interface AppStates{
  name: string
}

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const navigator = useNavigate();
  const [name, setName] = useState<AppStates["name"]>('');
  const validateCookie = async() => {
      if(cookies.token)
      {
        const response = await fetch('https://hechatapp.herokuapp.com/auth', {
              headers: {
                  'Authorization': cookies.token,
                  'Content-Type': 'application/json'
              },
              method: 'GET',
          })
        const data = await response.json();
        if(data.name)
        {
          setName(data.name)
          navigator('/Socket.io-Chat-App/chat');
        }
      }
  }
  useEffect(() => {
    validateCookie();
  }, [])
  const getName = (name:string) => {
    setName(name);
  }

  return (
    <div className='bg-gray-700 h-screen'>
      <Routes>
        <Route path='/Socket.io-Chat-App' element={<MainPage />} />
        <Route path='/Socket.io-Chat-App/set' element={<Set extractName={getName} />} />
        <Route path='/Socket.io-Chat-App/chat' element={<Chat name={name} />} />
      </Routes>
    </div>
  );
}

export default App;