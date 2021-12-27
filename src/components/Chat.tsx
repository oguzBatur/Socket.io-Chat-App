import React, { useEffect, useState, ChangeEvent } from 'react'
import  {useCookies, Cookies,CookiesProvider} from 'react-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client';

interface ChatProps{
    name: string
}
interface ChatStates{
    message: string
}
export default function Chat({name}:ChatProps) {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [message,setMessage] = useState<ChatStates["message"]>('');
    const navigator = useNavigate();
    const socket = io('http://localhost:3004');
    socket.on('connect', () => {

    })
    const validateCookie = async() => {
        const response = await fetch('http://localhost:3004/auth', {
            headers: {
                'Authorization': cookies.token,
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
        const data = await response.json();
        if(data.name !== name)
        {
            navigator('/');
        }

    }
    useEffect(() => {
        validateCookie();
    }, [cookies.token])

    const serverMessages = [];
    const putUserMessage = () => {
        if(message !== "")
        {
            const textField = document.getElementById('textField');
            const divNode = document.createElement('div');
            const nameNode = document.createElement('p')
            const messageNode = document.createElement('p')
            divNode.className = 'p-2';
            nameNode.className = 'font-bold text-white ml-4'
            messageNode.className = 'py-2 px-4 bg-white rounded-2xl shadow-lg'
            messageNode.innerText = message;
            nameNode.innerText= name;
            divNode.appendChild(nameNode);
            divNode.appendChild(messageNode);
            textField?.append(divNode);
            textField?.scrollTo({top: textField.scrollHeight, behavior: 'smooth'})
            setMessage('');
        }
    }
    const putExternalMessages = (message:string,name:string) => {
        const textField = document.getElementById('textField');
            const divNode = document.createElement('div');
            const nameNode = document.createElement('p')
            const messageNode = document.createElement('p')
            divNode.className = 'p-2';
            nameNode.className = 'font-bold text-white ml-4'
            messageNode.className = 'py-2 px-4 bg-white rounded-2xl shadow-lg'
            messageNode.innerText = message;
            nameNode.innerText= name;
            divNode.appendChild(nameNode);
            divNode.appendChild(messageNode);
            textField?.append(divNode);
            textField?.scrollTo({top: textField.scrollHeight, behavior: 'smooth'})
    }
  

    const getMessage = (e:ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }
  
    return (
        <div className='w-1/2 h-screen  rounded-md flex flex-col bg-yellow-500 m-auto'>
                <div className='flex flex-col overflow-y-scroll self-stretch h-full ' id='textField'>

                </div>
                {/* Send BUTTON */}
                <div className=' w-full h-auto flex items-end '>
                    <input onChange={getMessage} type="text" value={message} className='w-full p-2' />
                    <button onClick={putUserMessage}   className='py-2 px-4 bg-yellow-500 font-bold text-white rounded-sm'>Send</button>
                </div>
        </div>
    )
}
