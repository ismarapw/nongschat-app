import { API_BASE_URL } from "../../utils/api";
import { NavLink } from 'react-router-dom';
import moment from "moment-timezone";

function UserList({users, title}) {
    return (
        <>
        {users && 
        <>
        <h2 className='text-sm mt-6'>{title}</h2>
        <div className='mx-auto'>
            {users.map(user => (
                <NavLink to = {`/conversation/${user.id}`} key={user.id} >
                    <div className='flex items-center gap-x-3 my-3 drop-shadow-md bg-white p-3 rounded-md' >
                        <img src={`${API_BASE_URL}/img/${user.image}`} className='h-10 w-10 object-cover rounded-full'/>
                        <div>
                            <p className='text-sm font-medium'>{user.username}</p>
                            <p className='text-sm'>Joined {moment.tz(user.createdAt, 'Asia/Makassar').fromNow(true)} ago</p>
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
        </>
        }
        {!users &&
        <div className='flex flex-col justify-center items-center mt-24'>
            <img src='img/notfound1.svg' className="w-2/3"/>
            <span className='text-sm mt-3'>Not Found</span>
        </div>
        }
        </>
    )
}

export default UserList;