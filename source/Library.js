const fs = require("fs")
const chp = require("child_process")
module.exports = {
    Init : function () {
        console.log("[INFO] Initializing Library...")
        fs.writeFileSync("BeeDB.Library.temp", new Date() + ":")
        console.log("[INFO] Temp file Created")
        console.log("[INFO] Initialization succeed")
    },
    CacheLoader : function () {
        return fs.readFileSync("BeeDB.Library.temp", "utf-8").split(":")
    },
    Execute : function (command) {
        return chp.execSync(command).toString()
    }
}

