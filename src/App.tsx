import React, { useState } from 'react';
import {Route, Routes, Link} from 'react-router-dom'
import './App.css';
import MainPage from './components/MainPage';
import Set from './components/Set';
import Chat from './components/Chat';

interface AppStates{
  name: string
}

function App() {


  const [name, setName] = useState<AppStates["name"]>('');

  const getName = (name:string) => {
    setName(name);
  }

  return (
    <div className='bg-gray-700 h-screen'>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/set' element={<Set extractName={getName} />} />
        <Route path='/chat' element={<Chat name={name} />} />
      </Routes>
    </div>
  );
}

export default App;