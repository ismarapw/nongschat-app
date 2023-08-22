import 'remixicon/fonts/remixicon.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from "../../utils/api";
import isUserLogin from "../../utils/check-auth";
import { useNavigate } from "react-router-dom";


async function updateData(toUpdate, data){
    const formData = new FormData();
    formData.append(toUpdate, data);
    
    const isImageUpdate = toUpdate === "image";
    const headers = isImageUpdate ? {} : { "Content-Type": "application/x-www-form-urlencoded" };
    
    const fetchProperties = {
        method: "PATCH",
        credentials: "include",
        headers,
        body: isImageUpdate ? formData : new URLSearchParams(formData)
    };
    
    try {
        const res = await fetch(`${API_BASE_URL}/user/update/${toUpdate}`, fetchProperties);
        const data = await res.json();

        if (isImageUpdate) {
            return { status: res.status, message: data.message , file: data.file};
        }else {
            return { status: res.status, message: data.message};
        }

    } catch (error) {
        throw new Error(error)
    }
}


function AccountSetting () {
    const [userInfo, setUserInfo] = useState({
        username : "",
        email : "",
        password : "",
        image : ""
    });
    const [responseData, setResponseData] = useState({
        username : null,
        email : null,
        password : null,
        image : null
    });
    const isLoggedIn = isUserLogin();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        }else {
            fetch(`${API_BASE_URL}/user/update/profile`, {
                method : "GET",
                credentials : "include"
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setUserInfo({
                    ...userInfo,
                    username : data.result.username,
                    email : data.result.email,
                    password : data.result.password,
                    image : data.result.image,
                })
            })
            .catch(error => {
                console.log(error)
            })
        }

    }, []);


    const handleUpdateField = async (field, newValue) => {
        if (field !== "image") setUserInfo({...userInfo,[field]: newValue});
    
        try {
            const updateRes = await updateData(field, newValue);
            
            if(updateRes.file) setUserInfo({...userInfo,image: updateRes.file});

            setResponseData({
                ...responseData,
                [field]: {
                    status: updateRes.status,
                    message: updateRes.message,
                }
            });

        } catch (error) {
          console.log(error);
        }
      };
    
      const handleUsername = (e) => handleUpdateField("username", e.target.value);
      const handleEmail = (e) => handleUpdateField("email", e.target.value);
      const handlePassword = (e) => handleUpdateField("password", e.target.value);
      const handleImage = (e) => handleUpdateField("image", e.target.files[0]);

    return !isLoggedIn ? null : (
        <div className="bg-white max-w-md min-h-screen mx-auto drop-shadow-2xl">
            <div className='sticky top-0 bg-white pb-3'>
                <div className="w-11/12 pt-4 flex ml-4 gap-x-2">
                    <Link class="ri-arrow-left-line text-2xl" to = "/panel"></Link>
                    <h1 className="text-2xl font-semibold">Profile</h1>
                </div>
            </div>
            <div className="mt-8 flex justify-center items-center flex-col">
                <div className='w-40 h-40 relative'>
                    <img src = {`${API_BASE_URL}/img/${userInfo.image}`} className="rounded-full w-40 h-40 object-cover" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 bg-gray-800 rounded-full flex justify-center items-center">
                        <i class="ri-camera-fill text-xl text-white"></i>
                    </div>
                    <input onChange={handleImage} type='file' name='image' className="w-10 h-10 absolute bottom-0 right-1 opacity-0"/>
                </div>
                <>
                {responseData.image && 
                <p className={`mt-3 text-sm ${responseData.image.status === 201 ? 'text-green-500' :'text-red-500'}`}>{responseData.image.message}</p>
                }
                </>
            </div>
            <div className="mt-4 ml-5 relative">
                <label for="username" className="block text-sm">Username</label>
                <input onChange={handleUsername} name="username" id="username" type="text" value={userInfo.username} className="mt-2 px-2 py-2 w-[95%] border-2 border-slate-400 rounded-lg text-sm" placeholder="Input your username" />
                <i class="ml-3 ri-pencil-line text-2xl absolute top-8 right-8"></i>
                <>
                {responseData.username && 
                <p className={`mt-2 text-sm ${responseData.username.status === 201 ? 'text-green-500' :'text-red-500'}`}>{responseData.username.message}</p>
                }
                </>
            </div>
            <div className="mt-4 ml-5 relative">
                <label for="email" className="block text-sm">Email</label>
                <input onChange={handleEmail} name="email" id="email" type="text" value={userInfo.email} className="mt-2 px-2 py-2 w-[95%] border-2 border-slate-400 rounded-lg text-sm" placeholder="Input your email" />
                <i class="ml-3 ri-pencil-line text-2xl absolute top-8 right-8"></i>
                <>
                {responseData.email && 
                <p className={`mt-2 text-sm ${responseData.email.status === 201 ? 'text-green-500' :'text-red-500'}`}>{responseData.email.message}</p>
                }
                </>
            </div>
            <div className="mt-4 ml-5 relative">
                <label for="password" className="block text-sm">Password</label>
                <input onChange={handlePassword} name="password" id="password" value={userInfo.password} type="password" className="mt-2 px-2 py-2 w-[95%] border-2 border-slate-400 rounded-lg text-sm" placeholder="Unchanged Password" />
                <i class="ml-3 ri-pencil-line text-2xl absolute top-8 right-8"></i>
                <>
                {responseData.password && 
                <p className={`mt-2 text-sm ${responseData.password.status === 201 ? 'text-green-500' :'text-red-500'}`}>{responseData.password.message}</p>
                }
                </>
            </div>
        </div>
    )
}

export default AccountSetting;