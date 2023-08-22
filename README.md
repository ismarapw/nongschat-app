# NongsChat Application
Welcome to my first full stack javascript project repository. In this project i tried to make a realtime chat application which is utilized socket.io. I learn a lot of things when i'm trying to make this project, because this is my first project using full javascript technologies.

In the client side, i used react which i learned a lot of react things such as reachHooks, props, routes, states and all of the basic behaviour of react. In the server side, i used node.js (express) to make the RestAPI. As mentioned before, in the server side (node js) i learned a lot as well, such as how to make a middleware, route and how to organize the Model View Controller (MVC) structure from scratch. 

<br>

![2023-08-22 23-02-52 (3)](https://github.com/ismarapw/nongschat-app/assets/76652264/323ce1da-1bd7-401d-83eb-e234ee72f310)


# Detailed Tech Stack
1. Client Side
   - React Js
   - Tailwind CSS
   - Socket-Client
2. Server Side
   - Node (Express Js)
   - Sequelize (for Object Relational Mapper)
   - Socket-Server
3. Database
   - Xampp MySQL (for local Testing)
   - PostgreSQL (using [neon](https://neon.tech/) for serverless in order to deployment soon).

# Features
1. Authentication (Login, Logout and Register).
2. CRUD User Account.
3. Create Chat/Conversations.
4. Show Chat History List.
5. Find User.
6. Show Online/Offline user information.

# How to Test in Your Local ?
After clone this repository, in the client and server direcotry make sure you run:

```bash
npm install 
```

in the client directory, go to src/utils/api.js and make sure you fill the API_BASE_URL based on your Node JS (server) port

```javascript
export const API_BASE_URL = YOUR_NODEJS_SERVER_URL;
```

in the server directory, go to server.js file and change the ALLOWED_PORT based on your react js port

```javascript
const ALLOWED_PORT = YOUR_REACT_URL
```

Setup your database (i used MySQL XAMPP), and create database named '**nongschat**'. 

After you've already made the database go to server/config directory. Here you need to edit 2 files, namely connection.js and config.json.

Connection.js is used for the query process, here you need to specify the database based on yours:
```javascript
const sequelize = new Sequelize('nongschat', DB_NAME, DB_PASS, {
    host: DB_URL,
    dialect: 'mysql',
    port : DB_PORT,
    logging : false
  });
```

In the other hand, config.json is used for migration table. In here, you need to specify the development field based on your database as well. 
```js
"development": {
    "username": DB_NAME
    "password": DB_PASS,
    "database": "nongschat",
    "host": DB_URL,
    "dialect": "mysql",
    "port" : DB_PORT
  }
```

if database config is configured correctly, then you can do the migration by using this command in server dir. This will create table/schema on your database
```bash
npx sequelize-cli db:migrate
```

after that, you can try to run the server and the client in server and client dir by using 
```bash
npm run start
```

# UI Snapshots
![image](https://github.com/ismarapw/nongschat-app/assets/76652264/a8f2f45f-8409-459d-ac6e-a94c5ae40b94)
![image](https://github.com/ismarapw/nongschat-app/assets/76652264/033af438-25ab-4ba5-9015-77d98f2d21df)
![image](https://github.com/ismarapw/nongschat-app/assets/76652264/04adc99a-e41d-4d10-a700-f7325dcaa10c)
![image](https://github.com/ismarapw/nongschat-app/assets/76652264/5b97c542-b6ce-4578-aa8d-10984bcf52e2)
![image](https://github.com/ismarapw/nongschat-app/assets/76652264/7c5f4efe-b30c-4877-907b-ec4197c2d2c9)
![image](https://github.com/ismarapw/nongschat-app/assets/76652264/2f35849f-a57a-4cb8-aebb-57d11d8413a5)
![image](https://github.com/ismarapw/nongschat-app/assets/76652264/3f1a6c04-f188-48bd-ae2a-d783847e16fe)





