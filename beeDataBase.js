const fs = require("fs")
const crypto = require('crypto')
const Library = require("./Library")
Library.Init()
const ENCRYPTION_KEY = "HH95XH7sYAbznRBJSUE9W8RQxzQIGSpy"
const BUFFER_KEY = "RfHBdAR5RJHqp5wm"
const ENCRYPT_METHOD = "aes-256-cbc"
const ENCODING = "hex"

function getEncryptedString(raw) {
    let iv = Buffer.from(BUFFER_KEY)
    let cipher = crypto.createCipheriv(ENCRYPT_METHOD, Buffer.from(ENCRYPTION_KEY), iv)
    let encrypted = cipher.update(raw)

    encrypted = Buffer.concat([encrypted, cipher.final()])

    return encrypted.toString(ENCODING)
}

function getDecryptedString(encrypted) {
    let iv = Buffer.from(BUFFER_KEY)
    let encryptedText = Buffer.from(encrypted, ENCODING)
    let decipher = crypto.createDecipheriv(ENCRYPT_METHOD, Buffer.from(ENCRYPTION_KEY), iv)
    let decrypted = decipher.update(encryptedText)

    decrypted = Buffer.concat([decrypted, decipher.final()])

    return decrypted.toString()
}
const input = require("input");

(async() => {
    if (!fs.existsSync("data.beedb")) {
        console.log("[INFO] Creating new DataBase...")
        fs.writeFileSync("data.beedb", "This is Sample Data;")
        const passwd = await input.text("DataBase passwd :")
        const raw = passwd
        const encrypted = getEncryptedString(raw)
        fs.appendFileSync("data.beedb.password", encrypted)
        console.log("[INFO] Encrypted password")
    }

    let db
    const packageJson = require("./package.json")
    const encryptedUserPassword = fs.readFileSync("data.beedb.password", "utf8")
    console.log(`
    ###############################################################################
    ###                                                                         ###
    ###                  Welcome to BeeDB(${packageJson.version})               ###
    ###                                                                         ###
    ###############################################################################`)
    console.log("[INFO] Loading DataBase...")
    const UserPassword = getDecryptedString(encryptedUserPassword)
    const inputPassword = await input.text("Password :")
    if (inputPassword != UserPassword) {
        console.log("password incorrect")
        console.log("Auto logout for 3 seconds...")
        fs.unlinkSync("BeeDB.Library.cache")
        console.log("cache removed")
        setTimeout(() => {
            process.exit(0)
        }, 3000)
    }else {
        console.log("password matches")
    }
    while (true) {
        try {
            db = fs.readFileSync("data.beedb", "utf-8")
        }catch (err) {
            const stacktraceMessage = `##### stacktrace at ${new Date()} ####################################################################################3`
            console.warn("[WARN] Failed to load data.beedb")
            fs.appendFileSync("stacktrace.txt", stacktraceMessage + `\n${err}`)
        }
        console.log("[INFO] Updating DataBase")
        const DataBase = db.split(";")
        const cmd = await input.text("[DataBase@BeeDB]COMMAND >")
        if (cmd === "INSERT") {
            const InsertData = await input.text("Insert Data :")
            fs.appendFileSync("data.beedb", InsertData + ";")
        }else if (cmd === "EXIT") {
            console.log("Removing Cache...")
            fs.unlinkSync("BeeDB.Library.cache")
            console.log("Logout Successes")
            break
        }else if (cmd === "READ") {
            for (let i = 0; i < DataBase.length; i++) {
                console.log("################################")
                console.log(DataBase[i])
            }
        }
    }
})()