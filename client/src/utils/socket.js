import { io } from 'socket.io-client';
import { API_BASE_URL } from './api';

const socketInstance = io(API_BASE_URL);

export default socketInstance;
