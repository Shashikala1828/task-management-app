# Task Management App

![image](https://github.com/Shashikala1828/task-management-app/assets/74039065/f942fd15-f477-4c84-aff5-d0826a5715a8)


##  Installation:

- Install Node.js,
- Clone this repo: git clone https://github.com/Shashikala1828/task-management-app.git,
- Install dependences by writing in console: npm install,
- Setup module by writing in console: npm link --force,
- Done, you can use it from your cmd.

## Description

- User-Friendly Interface
- Development and Production Modes

## Documentation

### `To Run the code in Production Mode`
- npm run build
- node server.js

### `To Run the code in Development Mode`
1. Make Changes in App.js
   -By Commenting this line
   ...*const backendHost = '/api/tasks';

   and,
   -By Uncommenting this line
   ...*const backendHost = "http://localhost:8080/api/tasks";

2. Make Change in Server.js
   - By Commenting these lines
   ...*const port = 3000;
   ...*app.use(express.static(path.join(__dirname, 'build')));

   and,
   - By Uncommenting these lines
   ...*const port = 8080;
   ...*app.use(cors());

