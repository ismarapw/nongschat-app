import 'remixicon/fonts/remixicon.css';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import isUserLogin from "../../utils/check-auth";
import { API_BASE_URL } from "../../utils/api";
import socketIo from "../../utils/socket";

function Conversation () {
    const navigate = useNavigate();
    const isLoggedIn = isUserLogin();
    const otherUserId = parseInt(useParams('id').id);
    const [inputMsg, setinputMsg] = useState("");
    const [chatMsg, setChatMsg] = useState([]);
    const [otherUserData, setOtherUserData] = useState({
        username : null,
        email : null,
        joined : null,
        image : null
    });
    let [currUserId, setCurrUserId] = useState(null);
    const [status, setStatus] = useState(null);
    
    useEffect(() => {
        const getOtherUserData = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/user/${otherUserId}/profile`, {
                    method : "GET"
                });

                const data = await res.json();

                setOtherUserData({
                    ...otherUserData,
                    username : data.result.username,
                    image : data.result.image,
                });

            } catch (error) {
                console.log(error)
            }
        }

        const getMsg = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/chat/conversation/${otherUserId}`, {
                    method : "GET",
                    credentials : 'include'
                })

                const data = await res.json();

                setChatMsg(data.result);

            } catch (error) {
                console.log(error)
            }
        }

        const handleUserOnlineStatus = (onlineUserList) => {
            if (onlineUserList.some((user) => user.userId === otherUserId)) {
              setStatus("Online");
            } else {
              setStatus("Currently Off");
            }
        };


        if (!isLoggedIn) {
            navigate('/');
        }else {
            setCurrUserId(JSON.parse(localStorage.getItem("userSession")).userId)
            getOtherUserData();
            getMsg();
            socketIo.emit("get_user_online", handleUserOnlineStatus);
            socketIo.on("update_user_online", handleUserOnlineStatus);
        }
    }, []);


    useEffect(() =>{
        socketIo.on('receive_message', (data) => {
            if (data.receiver_id === currUserId && data.sender_id === otherUserId ){
                
                setChatMsg(chatMsg => [...chatMsg, data]);

                fetch(`${API_BASE_URL}/chat/update/${otherUserId}`, {
                    method : "PUT",
                    credentials : 'include'
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(error => console.log(error));
                
                window.scrollTo(0, document.body.scrollHeight);
            }
        });

        return () => {
            socketIo.off('receive_message');
        }

    },[chatMsg])


    const inputMsgHandler = (e) => {
        setinputMsg(e.target.value); 
    }

    const sendHandler = (e) => {
        e.preventDefault();

        if (inputMsg.trim().length !== 0){
            const messageData = {
                content: inputMsg,
                sender_id: currUserId,
                receiver_id: otherUserId,
            };

            fetch(`${API_BASE_URL}/chat/send/${otherUserId}`, {
                method : "POST",
                body : JSON.stringify(messageData),
                headers : {
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setChatMsg(chatMsg => [...chatMsg, data.result]);
                window.scrollTo(0, document.body.scrollHeight);
            })
            .catch(error => {
                console.log(error)
            })

            setinputMsg("");
        }
    }
    
    return !isLoggedIn ? null : (
        <div className="bg-zinc-200 max-w-md min-h-screen mx-auto">
            <div className='sticky top-0 bg-black flex items-center py-3 px-2'>
                <div className="w-1/12">
                    <NavLink to ="/panel">
                        <i class="ri-arrow-left-line text-2xl text-white"></i>
                    </NavLink>
                </div>
                <div className="flex w-10/12">
                    <div>
                        <img src= {`${API_BASE_URL}/img/${otherUserData.image}`} className="rounded-full w-14 h-14 object-cover" />
                    </div>
                    <div className="ml-4">
                        <h3 className='text-white font-semibold'>{otherUserData.username}</h3>
                        <p className='text-white text-sm'>{status}</p>
                    </div>
                </div>
            </div>

            <div className="w-11/12 mx-auto mt-6 pb-44">
                {chatMsg.map(chat => (
                    <div className={`my-4 flex ${chat.sender_id === currUserId ? 'justify-end' : 'justify-start'}`}>
                        <p className={`max-w-[350px] ${chat.sender_id === currUserId ? 'bg-black text-white': 'bg-slate-50' }  inline-block p-2 rounded-xl text-sm`}>{chat.content}<span className='text-[11px] float-right mt-2 ml-3'>{moment.tz(chat.createdAt, "Asia/Makassar").format("HH:MM")}</span></p>
                    </div>
                ))}
            </div>

            <div className="fixed w-full left-0 bottom-5">
                <div className='bg-black w-11/12 sm:w-[425px] mx-auto rounded-md'>
                    <form onSubmit={sendHandler}>
                        <input name='message' type='text' placeholder='Type Message' value={inputMsg} onChange={inputMsgHandler} autocomplete="off" className='text-white w-11/12 px-4 h-12 py-2 bg-transparent outline-none text-sm' />
                        <i class="ri-send-plane-2-line text-xl text-white" onClick={sendHandler}></i>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Conversation;