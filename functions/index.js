const functions = require("firebase-functions");
const firebase = require("firebase-admin");
// const serviceaccount = require("./secret.json");
const express = require("express");
const app = express();
const firebaseApp = firebase.initializeApp(functions.config().firebase);
app.set("view engine", "ejs");
app.disable("x-powered-by");

const db = firebase.firestore();
function write() {
  //read data from databse
  var result = {
    quote: "jeene laga hu pehle se jyada, pehle se jyada tum pe marne laga hu",
    author: `${Date.now()}`,
  };

  console.log(result.body);
  const obj = {
    quote: "jeene laga hu pehle se jyada, pehle se jyada tum pe marne laga hu",
    author: `${Date.now().toLocaleString()}`,
  };
  const QuoteData = {
    quote: obj.quote,
    author: obj.author,
  };
  return db
    .collection("sampledata")
    .doc("inspiration")
    .set(QuoteData)
    .then(() => {
      console.log("new quote written to database!!!!!!!!!!!!!");
    });
}
app.get("/time", (req, res) => {
  res.json(`${Date.now()}`);
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/loggedin", (req, res) => {
  res.render("loggedin");
});
function readData() {
  db.collection("sampledata")
    .doc("inspiration")
    .get()
    .then((doc) => {
      if (!doc.exists) {
        console.log("Doc does not exist");
      } else {
        console.log(doc.data());
        return doc.data();
      }
    })
    .catch((err) => {
      console.error("Error was caused", err);
      process.exit();
    });
}
app.get("/", (req, res) => {
  // write();
  var zz = readData();
  console.log("zz is", zz);
  res.render("index", zz);
});

app.get("/time-cached", (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  res.send(`${Date.now()}`);
});

exports.app = functions.region("asia-south1").https.onRequest(app);
