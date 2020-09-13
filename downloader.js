const fs = require("fs");
const https = require("https");

module.exports = { 
    isInstalled: function() {
	fs.exists("./youtube-dl",function(exists){
	    return exists;
	});
    }
}
