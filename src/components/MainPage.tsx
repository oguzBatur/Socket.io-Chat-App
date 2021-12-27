import React from 'react'
import { Link } from 'react-router-dom';
import {io} from 'socket.io-client';

const socket = io('http://localhost:3004');
socket.on('connect', () => {
    socket.emit('custom-event');

})
export default function MainPage() {
    return (
        <div className='flex items-center  text-white justify-center h-5/6 flex-col gap-3'>
            <h1 className='font-bold  text-4xl'>theChatApp</h1>
            <Link className='py-2 px-12 text-center rounded-md bg-blue-600 font-bold' to={'/set'}>
            Set Your Username and Go!
           </Link>
      </div>
    )
}
