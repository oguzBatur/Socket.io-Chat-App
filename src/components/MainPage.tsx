import React from 'react'
import { Link } from 'react-router-dom';

export default function MainPage() {
    return (
        <div className='flex items-center  text-white justify-center h-5/6 flex-col gap-3'>
            <h1 className='font-bold  text-4xl'>theChatApp</h1>
            <Link className='py-2 px-12 text-center rounded-md bg-blue-600 font-bold' to={'/Socket.io-Chat-App/set'}>
            Set Your Username and Go!
           </Link>
      </div>
    )
}
