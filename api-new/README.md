# API Server
The express server is working with typescript and has a SQLite DB.
Nodemon helps during development as it restarts the server automatically on code changes.

## Run / Debug server
See the `README.md` file in project root

## How the server was initially set up
npm init 
  use index.ts file as main entry point

### NPM basic packages
npm install express typescript nodemon ts-node @types/node eslint eslint-plugin-import body-parser cors

### NPM database packages
npm install sqlite3 sqlite @types/sqlite3 --save

### Add *.json config files
crate tsconfig.json
  add config content
edit package.json
  add nodemon section
  add scripts
