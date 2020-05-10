const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs');
const ytdl = require('ytdl-core');
const youtubedl = require('youtube-dl')
const options = [];

// app.use(express.static('app'))
app.use(express.urlencoded())
app.listen(port, () => console.log(`YoutubeDownloader listening at http://localhost:${port}`))

// var dom = require('jsdom')
// const { JSDOM } = dom;

//JSDOM.fromFile("app/index.html", options).then(dom => {
// console.log(dom.serialize());
// });

// const { window } = new JSDOM("", { runScripts: "outside-only"});

// dom.fromFile("/app/index.html");

// window.eval(`document.body.innerHTML = "<p>Hello, world!</p>";`);
// window.document.body.children.length === 1;

  app.get('/', (req, res) => {
    res.sendFile(__dirname + "/app/index.html");
  })

  app.get('/download', (req, res) => {

    const url = req.query['url'];
    const type = req.query['type'];
    const fileFormat = req.query['fileFormat'];

    ytdl.getInfo(url, (err, info) => {
      if (err) throw err;
      var filename = info.video_id + "." + fileFormat;
      downloadUrl(url, fileFormat);
      res.sendFile(__dirname + "/app/index.html");
    });
  });

function downloadUrl(url, fileFormat){
  if(ytdl.validateURL(url)){
    console.log("URL is valid");
    console.log("Video(s) info:");
    ytdl.getInfo(url, (err, info) => {
    if (err) throw err;
    var fileName = info.video_id + "." + fileFormat;
    if(!info.partial){
      console.log("This is a single video");
      console.log("Title: " + info.title);
      console.log("Video ID: " + info.video_id);
      ytdl(url).pipe(fs.createWriteStream("app/download/" + fileName));
    } else {
      console.log("This is a playlist");
      info.on('video', v => console.log(v.title));
      info.on('done', () => console.log(`Playlist contains ${info.items.length} items.`));
    }
    });
  } else {
    console.log("Unable to get the video :-(");
  }
}

function getVideoInfo(url, fileFormat){

}
