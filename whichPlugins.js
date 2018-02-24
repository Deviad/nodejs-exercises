// This code is able to scan a JSON in order to find the keys on the left side and say if there are some matching a given list.
// To execute it you need to run the file from command line. E.g. node exercise02.js text.txt
let [executable, absPath, target, ...message] = process.argv;
const fs = require('fs');
const readStream = fs.createReadStream(target, {encoding:  "utf8"});


const whichPlugins = (pluginList) => (function(){
  let arr = [];
  let activePlugins = [];

  return new Promise((resolve, reject) => {
    readStream
    .on('readable', function () {
      let chunk;
      while (null !== (chunk = readStream.read())) {
        const wordBuffer = chunk.split(/\s+/);
        arr = wordBuffer
        .filter(word=> word.match(/"[a-zA-z]+[a-zA-z0-9-_+=]*":/g))
        .map(word=>word.split(':').join('').split('"').join(''));
      }
    });
    readStream
    .on('end', function () {
      if(arr.length > 0 ) {
        arr.map(el => { 
          if (pluginList.indexOf(el) > -1) {
            activePlugins.push(el);
          } 
        });
      }
      resolve({activePlugins});
    });
  });
})(pluginList);

whichPlugins(['pippo', 'pluto']).then(console.log);
