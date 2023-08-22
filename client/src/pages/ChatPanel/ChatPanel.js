import 'remixicon/fonts/remixicon.css';
import ChatList from '../../components/List/ChatList';
import {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import isUserLogin from "../../utils/check-auth";
import { API_BASE_URL } from "../../utils/api";
import socketIo from "../../utils/socket";
import SearchBox from '../../components/Input/SearchBox';


function ChatPanel() {

    const [settingIsClicked, setSettingIsClicked] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = isUserLogin();
    const [originalChatList, setOriginalChatList] = useState(null);
    const [chatList, setChatList] = useState(null);
    let [currUserId, setCurrUserId] = useState(null);


    useEffect(() => {
        const fetchChatData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/chat/panel`, {
                    method: 'GET',
                    credentials: 'include'
                });

                const data = await response.json();
                setChatList(data.result);
                setOriginalChatList(data.result);

            } catch (error) {
                console.log(error);
            }
        };

        if (!isLoggedIn) {
            navigate("/");
        }else {
            setCurrUserId(JSON.parse(localStorage.getItem("userSession")).userId);
            fetchChatData();
            socketIo.on('receive_message', fetchChatData);
        }
    }, []);


    const revealSetting = () => {
        setSettingIsClicked(!settingIsClicked);
    }

    const logOutHandler = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/user/logout`, {
                method : "POST"
            });

            if (res.status === 204) {
                localStorage.removeItem("userSession");
                socketIo.emit("user_off", currUserId);
                navigate("/");
            }else {
                const err = await res.json();
                console.log(err);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const searchHandler = (e) => {
        const inputVal = e.target.value.trim()
        if (inputVal.length === 0){
            setChatList(originalChatList);
        }
        else{
            const searchRes = chatList.filter(chat => {
                if (chat.content.includes(inputVal) || chat.username.includes(inputVal)) {
                    return chat;
                }
            })
            setChatList(searchRes);
        }
    }


    return !isLoggedIn ? null : (
        <div className="bg-white max-w-md min-h-screen mx-auto drop-shadow-2xl">
            <div className='sticky top-0 bg-white pb-3'>
                <div className="flex justify-between w-11/12 items-center mx-auto pt-6">
                    <h1 className="text-3xl font-bold">Nongschat.</h1>
                    <div className="icon flex gap-2">
                        <Link to='/new'>
                            <i className="ri-chat-new-line text-2xl newchat cursor-pointer"></i>
                        </Link>
                        <i class="ri-more-2-fill text-2xl setting cursor-pointer" onClick={revealSetting}></i>
                    </div>
                    {settingIsClicked &&
                    <div className="setting absolute mt-6 bg-white top-7 right-7 p-3 drop-shadow-2xl rounded-lg">
                        <Link className="text-sm py-1 block" to ='/account/setting'>Account Setting</Link>
                        <button className="text-sm py-1 block" onClick={logOutHandler}>Logout</button>
                    </div>
                    }
                </div>
                <div className='w-11/12 mt-6 mx-auto'>
                    <SearchBox searchHandler={searchHandler} placeholder = 'Search Message' />
                </div>
            </div>
            <div className="w-11/12 mx-auto mt-4">
                <ChatList chatList={chatList} />
            </div>
        </div>
    )
};


export default ChatPanel;