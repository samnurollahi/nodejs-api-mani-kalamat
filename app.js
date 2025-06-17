const express = require("express");
const axios = require("axios");
const { JSDOM } = require("jsdom");

const app = express()

// env
require("dotenv").config({path: "./config/.env"})

// midd
app.use(express.json())

// api
app.get("/", async (req, res, next) => {
    if(!req.query.word) {
        return res.json({word: "The word value is not filled in the query", example: "api?word=سام"})
    }

    // request to dec
    const data = await axios.get(`https://abadis.ir/fatofa/${req.query.word}/`)

    const dom = new JSDOM(data.data)
    const doc = dom.window.document
    const b = doc.querySelector("b")
    const meaning = b.nextSibling.textContent.replace(":", "")

    res.json({meaning, msg: "فارسی را پاس بداریم"})
})

app.listen(process.env.PORT || 3000, (err) => {
    if(err) console.log(err);
    else console.log("server starting");
})