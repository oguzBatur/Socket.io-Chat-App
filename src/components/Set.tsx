import React, { ChangeEvent, MouseEventHandler, MouseEvent, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import  {useCookies, Cookies,CookiesProvider} from 'react-cookie';

interface userInformation{
    name: string,
    err: string
}
interface SetProps{
    extractName: Function
}
export default function Set({extractName}:SetProps) {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [name, setName] = useState<userInformation["name"]>('');
    const [err, setErr] = useState<userInformation["err"]>('');

    const navigate = useNavigate();
    const getName = (e:ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setErr('');
    }
    const sendInformation = async() => {
        extractName(name);
        if(name.replace(/\s/g,'') !== ""){

            const response = await fetch('http://localhost:3004/setUser', {
                method: 'POST',
                body:JSON.stringify({name:name}),
                headers:{
                    'Content-Type': 'application/json'
                },
            })
            const data = response ? await response.json() : null;
            if(data.token)
            {
                await setCookie('token',data.token);
                if(cookies.token)
                {
                    await navigate('/chat')
                }
            }
            else{
                setErr(response.status.toString());
            }
            
        }
        else{
            setErr('Incorrect Name!');        
        }
    }
    const handleKeyDown = (e:React.KeyboardEvent) => {
        if(e.key === 'Enter') sendInformation();
    }
    return (
        <>
            <Link className='font-bold absolute right-0 text-white m-1 py-2 px-12 bg-green-400 cursor-pointer rounded-sm ' to={'/'}>
                Go Back
            </Link>
            <form className='h-full sm:w-1/3 m-auto flex flex-col items-center justify-center gap-3 text-white text-center '>
                <div>
                    <label>
                        <p className='font-bold text-2xl'>Set Your Username</p>
                    </label>
                </div>
                <div>
                    <label>
                        <p>Name</p>
                        <input onChange={getName} onKeyDown={handleKeyDown} value={name} className='text-black p-1 rounded-md' type="text"/>
                    </label>
                </div>
                <div>
                    <label>
                        <p className='h-12 w-36 text-red-500 font-medium'>{err}</p>
                    </label>
                </div>
                <div>
                    <label>
                        <input onClick={sendInformation} className='font-bold  py-2 px-12 bg-green-400 cursor-pointer rounded-sm' value='Go!' type="submit"/>
                    </label>
                </div>
            </form>
        </>
    )
}
