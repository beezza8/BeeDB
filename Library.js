const fs = require("fs")
module.exports = {
    Init : function () {
        console.log("[INFO] Initializing Library...")
        fs.writeFileSync("BeeDB.Library.cache", new Date() + ":")
        console.log("[INFO] Cache Created")
        console.log("[INFO] Initialization succeed")
    }
}
