const socketIO = require('socket.io');

class SocketConnection {
	constructor(server, port) {
		this.server = server;
		this.port = port;
		this.io = socketIO(this.server, {
			cors: {
			origin: this.port
			}
		});
	}

	getIO() {
		return this.io;
	}

	getServer() {
		return this.server;
	}

	getPort()  {
		return this.port;
	}
}

module.exports = SocketConnection;