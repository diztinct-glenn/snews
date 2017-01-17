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
  input = req.body.text;
  console.log(input);

  var api = `https://newsapi.org/v1/articles?source=${input}&sortBy=top&apiKey=${NEWS_API_KEY}`
  request(api, function(err, resp, body){
      body = JSON.parse(body);
      // console.log(body);
      source = body.source.toUpperCase();
      articles = body.articles[0].title;
      link = body.articles[0].url;
      description = body.articles[0].description;
      image = body.articles[0].urlToImage;
      console.log(source, articles);

      slack_message = {
        attachments: [
          {
            color: "#ff0000",
            pretext: source,
            title: articles,
            title_link: link,
            text: description,
            thumb_url: image,
            footer: "snews",
            footer_icon: "http://emojipedia-us.s3.amazonaws.com/cache/a3/dd/a3dd2044fded090033553d2c6a893d82.png"
          }
        ]

      }

      res.send(slack_message);
  })
  // res.send(req.body)
});
