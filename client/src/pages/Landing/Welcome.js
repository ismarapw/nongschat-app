import { Link ,useNavigate} from "react-router-dom";
import Brand from "../../components/Brand/Brand";
import isUserLogin from "../../utils/check-auth";
import { useEffect } from "react";

function Welcome () {
    const isLoggedIn = isUserLogin();
    const navigate = useNavigate(); 

    useEffect(() => {if (isLoggedIn) navigate("/panel")},[]);

    return isLoggedIn ?  null :  (
        <div className="md:bg-white bg-black">
            <div className="bg-black min-h-screen max-w-md flex flex-col justify-around items-center mx-auto">
                <Brand/>
                <div className="bg-white px-3 py-5 w-11/12 rounded-lg">
                    <h1 className="text-center font-semibold text-black">Ready to jump into vibrant conversations? Log in now to Nongschat and join the chatter.</h1>
                    <button className="rounded-lg bg-black text-white mt-4 h-12 w-full"><Link to='/login' className="w-full inline-block">Get Started</Link></button>
                    <p className="text-center mt-4 text-xs">Didn't have an account ? <Link className="font-bold" to ='/register'>Sign up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Welcome;