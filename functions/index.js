const functions = require("firebase-functions");
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.disable("x-powered-by");

app.get("/time", (req, res) => {
  res.json(`${Date.now()}`);
});

app.get("/", (req, res) => {
  res.render("index", {
    reply: "Welcome! This app in currently under development",
  });
});

app.get("/time-cached", (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  res.send(`${Date.now()}`);
});

exports.app = functions.https.onRequest(app);
