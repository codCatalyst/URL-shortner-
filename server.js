const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/google", (req, res) => {
    res.redirect("https://google.com");
});
app.get("/:code", (req, res) => {
    const code = (req.params.code);
    const longUrl = urlDatabase[code];
    if (!longUrl) {
        return res.send("URL not found");
    }
    res.redirect(longUrl);
});

const urlDatabase = {
    abc123: "https://google.com",
    xyz789: "https://github.com"
};

app.listen(3000, () => {
    console.log("Server running on port 3000");
});