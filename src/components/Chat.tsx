import { DefaultEventsMap } from '@socket.io/component-emitter';
import  { useEffect, useState, ChangeEvent, KeyboardEvent } from 'react'
import  {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {io, Socket} from 'socket.io-client';

interface ChatProps{
    name: string
}
interface ChatStates{
    message: string
}


const CONNECTION_PORT = 'localhost:3004';
let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export default function Chat({name}:ChatProps) {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [message,setMessage] = useState<ChatStates["message"]>('');
    const navigator = useNavigate();
    
    useEffect(() => {
        socket = io(CONNECTION_PORT);
        socket.on('receive-chat-message', (msg) => {
            putExternalMessages(msg.message, msg.name);
        })
     
    }, [CONNECTION_PORT])
    
    const putUserMessage = () => {
        socket.emit('send-chat-message', {message, name});
        const textField = document.getElementById('textField');
        textField?.scrollTo({top: textField.scrollHeight, behavior: 'smooth'});
        setMessage('');
    }
    

   

    const putExternalMessages = (message:string,name:string) => {
        if(message.replace(/\s/g,'') !== '')
        {
            const textField = document.getElementById('textField');
            const divNode = document.createElement('div');
            const nameNode = document.createElement('p');
            const messageNode = document.createElement('p');
            divNode.className = 'p-2';
            nameNode.className = 'font-bold text-white ml-4';
            messageNode.className = 'py-2 px-4 bg-white rounded-2xl shadow-lg';
            messageNode.innerText = message;
            nameNode.innerText= name;
            divNode.appendChild(nameNode);
            divNode.appendChild(messageNode);
            textField?.append(divNode);
            textField?.scrollTo({top: textField.scrollHeight, behavior: 'auto'});
        }
    }


    const getMessage = (e:ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }
    
    const deleteTokenAndGoBack = () => {
        removeCookie('token');
        navigator('/');
    }
    const handleKeyDown = (e:KeyboardEvent) => {
        if(e.key === 'Enter')
        {
            putUserMessage();
        }
    }
    return (
        <>
            <button className='font-bold absolute right-0 text-white m-1 py-2 px-12 bg-green-400 cursor-pointer rounded-sm ' onClick={deleteTokenAndGoBack}>
                Go Back
            </button>
            <div key={'chat-container'} className='w-1/2 h-screen  rounded-md flex flex-col bg-gray-400 m-auto'>
                    <div key={'chat-field-container'} className='flex flex-col overflow-y-scroll self-stretch h-full ' id='textField'>

                    </div>
                    {/* Send BUTTON */}
                    <div key={'sender-container'} className=' w-full h-auto flex items-end '>
                        <input key={'sender-input'} onKeyDown={handleKeyDown} onChange={getMessage} type="text" value={message} className='w-full p-2' />
                        <button key={'sender-submit'}  onClick={putUserMessage}   className='py-2 px-4 bg-yellow-500 font-bold   text-white rounded-sm'>Send</button>
                    </div>
            </div>
        </>

    )
}
