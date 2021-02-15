# Clientserverdb
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.4.

## Projects
The workspace contains two projects. 
- One Angular web client 
- One express js server project (located in the folder `api-new`)
- One `SQLite database` for which the server has an API

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Client-Debugging
If you have installed the VS Code Extension "Debugger for Chrome" just hit F5 to start debugging or navigate to the Debugger View and run the Debug-Session from there. The config data is available in `launch.json`

## Server-Debugging
VS Code debugging settings -> Attach VS to node process -> Ctrl + Shift + p -> "Auto Attach Always"
Open a new terminal in VS Code, navigate to the `api-new` folder and execute `npm run debug`.
The server has it's own node_modules folder

## !!! Debugging Problems !!!
Whysoever we sowmetimes have problems debugging the server this for the first time because the port is alreday in use. Open the Task Manager and kill node.js tasks.