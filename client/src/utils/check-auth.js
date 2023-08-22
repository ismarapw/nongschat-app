const isUserLogin = () => {
    const userData = localStorage.getItem("userSession");

    return userData ? true : false;

}

export default isUserLogin;