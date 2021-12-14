const fs = require("fs")
module.exports = {
    Init : function () {
        console.log("[INFO] Initializing Library...")
        fs.writeFileSync("BeeDB.Library.temp", new Date() + ":")
        console.log("[INFO] Temp file Created")
        console.log("[INFO] Initialization succeed")
    },
    CacheLoader : function () {
        return fs.readFileSync("BeeDB.Library.temp", "utf-8").split(":")
    }
}

