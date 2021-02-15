
import { Album } from './../../src/app/album';
import { open } from 'sqlite';

var sqlite3 = require("sqlite3");
let sqliteConfig = {
  filename: './db/chinook.db',
  driver: sqlite3.Database
};

var express = require("express");
var cors = require('cors'); 
// create the server
let server = express();
// use cors to prevent CORS (Cross Origin Resource) errors
server.use(cors());
// Set app to listen on port 3000
server.listen(3000, function() {
    console.log("server is running on port 3000");
});

var bodyParser = require("body-parser");
// create a parser to pars data send to server
var jsonParser = bodyParser.json();

server.get("/greatestAlbum", function(req, res) {

  let errorMsg: string = undefined;
  let jsonData = undefined;
  let sql = `SELECT Title, Name
            FROM albums, artists 
            WHERE albums.ArtistId = artists.ArtistId
            AND artists.name = ?
            AND albums.AlbumId = ?`;

  (async () => {

    const db = await open(sqliteConfig);

    try {     
      let row = await db.get(sql, "Queen", 36);
      jsonData = JSON.stringify(row);
    }
    catch(err) {
      errorMsg = err;
    }
    finally {
      if(db != undefined)
        db.close();
    }

    if(errorMsg == undefined) {
      res.send(jsonData);
    }
    else
      res.status(400).send({'result':'unable to get'});

  })();

});

server.get("/albumList/:artName", function(req, res) {

  let errorMsg: string = undefined;
  let jsonData = undefined;
  let artName: string = req.params.artName;
  let selectSql: string = `SELECT Title, Name as ArtistName
                            FROM albums, artists 
                            WHERE albums.ArtistId = artists.ArtistId
                            AND artists.name = ?`;
  (async () => {
    
    const db = await open(sqliteConfig);

    try {     
      let row = await db.all(selectSql, artName);
      jsonData = JSON.stringify(row);
    }
    catch(err) {
      errorMsg = err;
    }
    finally {
      if(db != undefined)
        db.close();
    }

    if(errorMsg == undefined) {
      res.send(jsonData);
    }
    else
      res.status(400).send({'result':'unable to get'});

  })();

});

server.post("/addalbum", jsonParser, async function(req, res) {

  let newAlbum: Album = new Album(req.body);
  let selectSql: string = "SELECT ArtistId FROM artists WHERE Name = ?";
  let insertSql: string = "INSERT INTO albums (Title, ArtistId) VALUES (?, ?)";
  let artistId: number = -1;
  let errorMsg: string = undefined;

  (async () => {
    
    const db = await open(sqliteConfig);

    try {     
      let col = await db.get(selectSql, newAlbum.ArtistName);
      artistId = col.ArtistId;
      let result = await db.run(insertSql, newAlbum.Title, artistId);
      let newId = result.lastID;
    }
    catch(err) {
      errorMsg = err;
    }
    finally {
      if(db != undefined)
        db.close();
    }

    if(errorMsg == undefined) {
      res.status(200).json({'result':'album saved'});
    }
    else
      res.status(400).send({'result':'unable to save'});

  })();
});

