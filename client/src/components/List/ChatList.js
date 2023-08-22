import { API_BASE_URL } from "../../utils/api";
import { NavLink } from 'react-router-dom';
import moment from "moment-timezone";


function ChatList ({chatList}) {
    const currUserId = JSON.parse(localStorage.getItem("userSession")).userId;

    return (
        <div className="chat-list">
            {chatList && chatList.map(chat => (
                <NavLink to={`/conversation/${chat.other_user_id}`} className="py-4 flex w-full">
                    <div className="w-16">
                        <img src={`${API_BASE_URL}/img/${chat.image}`} className="rounded-full w-14 h-14 object-cover"/>
                    </div>
                    <div className="ml-3 w-full">
                        <div className = "flex items-center justify-between">
                            <h4 className="font-semibold text-lg">{chat.username}</h4>
                            <p className="text-sm">{moment.tz(chat.latest_time, 'Asia/Makassar').fromNow()}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="w-11/12 truncate text-sm">
                                {chat.sender_id === currUserId ? `You : ${chat.content}` : `${chat.content}`}
                            </p>
                            {chat.receiver_id === currUserId && chat.total_unread > 0 &&
                            <p className="bg-black text-white rounded-full w-5 h-5 text-xs flex justify-center items-center p-3">{chat.total_unread}</p>
                            }
                        </div>
                    </div>
                </NavLink>
            ))} 
        </div>
        
    )
}

export default ChatList;