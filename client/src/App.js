import { useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Welcome from './pages/Landing/Welcome';
import ChatPanel from './pages/ChatPanel/ChatPanel';
import Conversation from './pages/Conversation/Conversation';
import AccountSetting from './pages/Setting/AccountSetting';
import NewChat from './pages//CreateChat/NewChat';
import socketIo from "./utils/socket";

function App() {
  useEffect(() => {
    const  userSession = JSON.parse(localStorage.getItem("userSession"));
    if (userSession) {
      socketIo.emit('identify_user', userSession.userId);
    }

    return () => {
      socketIo.disconnect()
    }
  },[])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Welcome/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/register' element={<Register/>} />
          <Route exact path='/account/setting' element={<AccountSetting/>} />
          <Route exact path='/account/logout' element={<Register/>} />
          <Route exact path='/panel' element={<ChatPanel/>} />
          <Route exact path='/conversation/:id' element={<Conversation />} />
          <Route exact path='/new' element={<NewChat/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
