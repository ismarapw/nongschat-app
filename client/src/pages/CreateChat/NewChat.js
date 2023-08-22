import { Link } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import { useState } from 'react';
import { API_BASE_URL } from "../../utils/api";
import SearchBox from '../../components/Input/SearchBox';
import UserList from '../../components/List/UserList';

function NewChat() {
    const [searchedUser, setSearchedUser] = useState(null);

    // serch user 
    const searchHandler = async (e) => {
        const searchVal = e.target.value;

        if (searchVal !== "") {
            try {
                const res = await fetch(`${API_BASE_URL}/user/search/${searchVal}`, {
                    method : "GET",
                    credentials : "include"
                })
    
                const data = await res.json();

                setSearchedUser(data.result);
                
            } catch (error) {
                console.log(error);
            }
        }else {
            setSearchedUser(null);
        } 
        
    }

    return (
        <div className="bg-white max-w-md min-h-screen mx-auto drop-shadow-2xl">
            <div className='sticky top-0 bg-white pb-3 z-10'>
                <div className="w-11/12 pt-4 flex ml-4 gap-x-2">
                    <Link class="ri-arrow-left-line text-2xl" to = "/panel"></Link>
                    <h1 className="text-2xl font-semibold">Start Nongki</h1>
                </div>
            </div>
            <div className='mt-3 w-11/12 mx-auto'>
                <SearchBox searchHandler={searchHandler} placeholder = 'Find User' />
            </div>
            <div className='mt-3 w-11/12 mx-auto'>
                <UserList users = {searchedUser} title = 'Search Result' />
            </div>
        </div>
    )
}

export default NewChat;