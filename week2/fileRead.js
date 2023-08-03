
const fs = require("fs");

function callfn(err, data) {
    console.log(data)
}

fs.readFile("a.txt", "utf-8", callfn);
