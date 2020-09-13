const downloader = require('./downloader.js')

if (!downloader.isInstalled()) { console.log("Warning: youtube-dl binary could not be found! Please download from 'https://yt-dl.org/downloads/latest/youtube-dl'.")}
