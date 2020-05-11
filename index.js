const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const ytdl = require('ytdl-core');
const youtubedl = require('youtube-dl')

const options = [];

app.use(express.static('app'))
app.use(express.urlencoded())
app.listen(port, () => console.log(`YoutubeDownloader listening at http://localhost:${port}`))

  app.post('/', (req, res) => {
    const url = req.body.url;
    const type = req.body.type;
    const fileFormat = req.body.fileFormat;
    console.log("User requested url: " + url);
    console.log("Type: " + type);
    console.log("File Format: " + fileFormat);
    // Begin the download procedure
    downloadUrl(url, fileFormat);
    res.end()
  })

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
      ytdl(url).pipe(fs.createWriteStream(fileName));
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
