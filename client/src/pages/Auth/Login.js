import Brand from "../../components/Brand/Brand";
import { Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../utils/api";
import isUserLogin from "../../utils/check-auth";
import socketIo from "../../utils/socket";


function Login () {
    const [invalid, setInvalid] = useState(null);
    const [isSubmited, setIsSubmited] = useState(false);
    const navigate = useNavigate();
    const isLoggedIn = isUserLogin();

    useEffect(() => {if (isLoggedIn) navigate("/panel")},[]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData =  new FormData(e.target);

        setIsSubmited(true);

        try {
            const res = await fetch(`${API_BASE_URL}/user/login`, {
                method : "POST",
                body : new URLSearchParams(formData),
                credentials : 'include',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            });

            const data = await res.json();
            
            // handle error request
            if (res.status === 400 || res.status === 401 || res.status === 500) {
                setInvalid(data.message);
            }else {
                socketIo.emit('identify_user', data.session.userId);
                localStorage.setItem("userSession", JSON.stringify(data.session));
                navigate("/panel");
            }
            
        } catch (error) {   
            console.log(error);
        }

        setIsSubmited(false);

    }

    return isLoggedIn ?  null :  (
        <div className="md:bg-white bg-black">
            <div className="bg-black min-h-screen max-w-md flex flex-col justify-around items-center mx-auto">
                <Brand/>
                <div className="bg-white px-3 py-5 w-11/12 rounded-lg">
                    <h1 className="text-2xl font-bold text-black">Login</h1>
                    <p className="mt-2">Please insert your credentials</p>
                    <form className="mt-5" onSubmit={handleSubmit}>
                        <div>
                            <label for="username" className="block text-sm">Username</label>
                            <input name="username" id="username" type="text" className="mt-2 p-3 block w-full border-2 border-slate-500 rounded-lg text-sm" placeholder="Input username" />
                        </div>
                        <div className="mt-3">
                            <label for="password" className="block text-sm">Password</label>
                            <input name="password" id="password" type="password" className="mt-2 p-3 block w-full border-2 border-slate-500 rounded-lg text-sm" placeholder="Input password" />
                        </div>
                        <button className="rounded-lg bg-black text-white mt-4 h-12 w-full" disabled={isSubmited}>{isSubmited ? 'Please Wait...' : 'Login'}</button>
                    </form>
                    {invalid && 
                    <div className="mt-3 text-center">                           
                        <p className="text-sm text-red-500">{invalid}</p>
                    </div>
                    }
                    <p className="text-center text-xs mt-4">Didn't have an account ? <Link className="font-bold" to ='/register'>Sign up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login;