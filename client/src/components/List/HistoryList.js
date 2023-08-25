import { API_BASE_URL } from "../../utils/api";
import { NavLink } from 'react-router-dom';
import moment from "moment-timezone"; 
import Loader from "../Loader/Loading";


function HistoryList ({historyList, currUserId}) {


    return (
        <div className="chat-list">
            {!historyList && <Loader text = "Loading Chat History..." />}
            {historyList && historyList.length === 0 && 
            <div className='flex flex-col justify-center items-center mt-24'>
                <img src='img/nochat.svg' className="w-2/3"/>
                <span className='text-sm mt-3'>No Chat Yet</span>
            </div>
            }
            {historyList && historyList.map(chat => (
                <NavLink to={`/conversation/${chat.other_user_id}`} className="py-4 flex w-full">
                    <div className="w-16">
                        <img src={`${API_BASE_URL}/img/${chat.image}`} className="rounded-full w-14 h-14 object-cover"/>
                    </div>
                    <div className="ml-3 w-full">
                        <div className = "flex items-center justify-between">
                            <h4 className="font-semibold text-lg">{chat.username}</h4>
                            <p className="text-sm">{moment.tz(chat.latest_time, moment.tz.guess()).fromNow()}</p>
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

export default HistoryList;