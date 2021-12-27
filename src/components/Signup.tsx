import React, { ChangeEvent, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

interface userInformation{
    name: string,
    pass: string
}

export default function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState<userInformation["name"]>('')
    const [pass, setPass] = useState<userInformation["pass"]>('')

    const getName = (e:ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const getPass = (e:ChangeEvent<HTMLInputElement>) => {
        setPass(e.target.value);
    }
    const sendInformation = () => {
        
    }
    return (
        <>
            <Link className='font-bold absolute right-0 text-white m-1 py-2 px-12 bg-green-400 cursor-pointer rounded-sm ' to={'/'}>
                Go Back
            </Link>
            <form className='h-full sm:w-1/3 m-auto flex flex-col items-center justify-center gap-8 text-white text-center bg-blue-800 '>
                <div>
                    <label>
                        <p className='font-bold text-2xl'>SIGNUP</p>
                    </label>
                </div>
                <div>
                    <label>
                        <p>Name</p>
                        <input onChange={getName} value={name} className='text-black p-1 rounded-md' type="text"/>
                    </label>
                </div>
                <div>
                    <label>
                        <p>Password</p>
                        <input onChange={getPass} value={pass} className='text-black p-1 rounded-md' type="password"/>
                    </label>
                </div>
                <div>
                    <label>
                        <input onClick={sendInformation} className='font-bold  py-2 px-12 bg-green-400 cursor-pointer rounded-sm' type="submit"/>
                    </label>
                </div>
            </form>
        </>
    )
}
