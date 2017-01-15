const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const ngrok = require('ngrok');

const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.SLACK_CLIENT_ID;
const CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`App is running on ${PORT}.`));

app.get("/", (req, res) =>
  res.send("hi")
);

app.get("/snews", function(req, res) {
  res.send('ngrok test');
});

app.post("/snews", function(req,res) {
  // input = JSON.stringify(req.body);
  input = req.body.text;
  console.log(input);

  var api = `https://newsapi.org/v1/articles?source=${input}&sortBy=latest&apiKey=${NEWS_API_KEY}`
  request(api, function(err, resp, body){
      // console.log(body) // Logs JSON object from the external API of the specific beer I searched
      body = JSON.parse(body);
      console.log(body);
      source = body.source;
      articles = body.articles[0].title;
      console.log(source, articles);

      slack_message = {
        text: input

      }

      res.send(body.articles); // sends json object back to front end
  })
  // res.send(req.body)
});
