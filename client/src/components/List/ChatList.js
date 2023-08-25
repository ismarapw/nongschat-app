import Loader from "../Loader/Loading";
import moment from 'moment-timezone';

function ChatList ({chatList, currUserId}) {

    return (
        <>
            {!chatList && 
                <Loader text = 'Loading Chat, Please Wait...' />
            }
            {chatList && chatList.map(chat => (
                <div className={`my-4 flex ${chat.sender_id === currUserId ? 'justify-end' : 'justify-start'}`}>
                    <p className={`max-w-[350px] ${chat.sender_id === currUserId ? 'bg-black text-white': 'bg-slate-50' }  inline-block p-2 rounded-xl text-sm`}>{chat.content}<span className='text-[11px] float-right mt-2 ml-3'>{moment.tz(chat.createdAt, moment.tz.guess()).format("HH:mm")}</span></p>
                </div>
            ))}
        </>
    )
}

export default ChatList;