 let fs = require("fs").promises
 let removefile = async (path) => {
     let fileexists;

    try {
      await fs.access(path);
      fileexists = true;
    } catch (e) {
      fileexists = false;
    }

    if (fileexists) {
       fs.unlink(path);
    }
 }
 



module.exports = removefile;