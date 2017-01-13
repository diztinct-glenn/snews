const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const ngrok = require('ngrok');

const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.SLACK_CLIENT_ID;
const CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

ngrok.connect(function (err, url) {});
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`App is running on ${PORT}.`));

app.get("/", function(req, res) {
  res.send("hi");
})
