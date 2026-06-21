const express = require("express");
const app = express();

const chars =
"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encode(num){
    if(num === 0) return chars[0];

    let shortCode = "";

    while(num > 0){
        shortCode = chars[num % 62] + shortCode;
        num = Math.floor(num / 62);
    }

    return shortCode;
}

function decode(str){
    let num = 0;

    for(const ch of str){
        num = num * 62 + chars.indexOf(ch);
    }

    return num;
}

let id = 1;
const urlDatabase = {};

app.get("/", (req,res)=>{
    res.send("Home Page");
});

app.get("/create", (req,res)=>{
    const longUrl = "https://google.com";

    const shortCode = encode(id++);
    urlDatabase[shortCode] = longUrl;

    res.send(`Created: localhost:3000/${shortCode}`);
});

app.get("/:code",(req,res)=>{
    const longUrl = urlDatabase[req.params.code];

    if(!longUrl){
        return res.send("URL not found");
    }

    res.redirect(longUrl);
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});