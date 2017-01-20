const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const mustacheExpress = require('mustache-express');

const PORT = process.env.PORT || 3000;
const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;
const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;
const SLACK_VERIFICATION_TOKEN = process.env.SLACK_VERIFICATION_TOKEN;
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const news_sources = require('./news_sources');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`App is running on ${PORT}.`));

app.get("/", (req, res) =>
  res.render("index")
);

// app.post("/snews", function(req,res) {
//   const input = req.body.text;
//   let sorting = "top";
//   console.log(input);
//   let api = `https://newsapi.org/v1/articles?source=${input}&sortBy=${sorting}&apiKey=${NEWS_API_KEY}`;
//   if(input === "something") {
//     res.send("Sorry, I didn't quite catch that. Try using the command [help] to see a list of acceptable commands!")
//   } else if(input === "help") {

//       slack_message = news_sources;
//       res.send (slack_message);

//   } else if(input === "the-next-web") {
//        sorting = "latest";
//        api = `https://newsapi.org/v1/articles?source=${input}&sortBy=${sorting}&apiKey=${NEWS_API_KEY}`;
//        request(api, function(err, resp, body){
//         body = JSON.parse(body)
//         // console.log(body);
//         const source = body.source.toUpperCase();
//         const articles_new = body.articles;
//         // console.log(articles_new)

//         let tester_art = articles_new.map(function(element) {
//           let article_title = element.title;
//           let link = element.url;
//           let description = element.description;
//           let image = element.urlToImage
//           return {
//               color: "#ff0000",
//               "mrkdwn_in": ["text"],
//               title: article_title,
//               title_link: link,
//               text: description,
//               thumb_url: image,
//               footer: "/snews",
//               footer_icon: "http://emojipedia-us.s3.amazonaws.com/cache/a3/dd/a3dd2044fded090033553d2c6a893d82.png"
//             }
//         })
//         // console.log(tester_art);

//         slack_message = {
//           text: `*${source}*`,
//           text_color: "#000000",
//           mrkdwn_in: "text",
//           attachments: tester_art
//         }
//         // console.log(slack_message)
//         res.send(slack_message);
//       })

//   } else {

//     request(api, function(err, resp, body){
//         body = JSON.parse(body);
//         // console.log(body);
//         const source = body.source.toUpperCase();
//         const articles_new = body.articles;
//         // console.log(articles_new)

//         let tester_art = articles_new.map(function(element) {
//           let article_title = element.title;
//           let link = element.url;
//           let description = element.description;
//           let image = element.urlToImage;
//           return {
//               color: "#ff0000",
//               "mrkdwn_in": ["text"],
//               title: article_title,
//               title_link: link,
//               text: description,
//               thumb_url: image,
//               footer: "/snews",
//               footer_icon: "http://emojipedia-us.s3.amazonaws.com/cache/a3/dd/a3dd2044fded090033553d2c6a893d82.png"
//             }
//         })
//         // console.log(tester_art);

//         slack_message = {
//           text: `*${source}*`,
//           text_color: "#000000",
//           mrkdwn_in: "text",
//           attachments: tester_art
//         }
//         // console.log(slack_message)
//         res.send(slack_message);
//     })
//   }
// });

// app.get("/slack", function(req,res) {
//   let data = {
//     form: {
//     client_id: SLACK_CLIENT_ID,
//     client_secret: SLACK_CLIENT_SECRET,
//     code: req.query.code
//   }
// }
//   console.log(req.query.code);

//   request.post('https://slack.com/api/oauth.access', data, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       // You are done.
//       // If you want to get team info, you need to get the token here
//       let token = JSON.parse(body).access_token; // Auth token
//       res.redirect('https://snews-app.herokuapp.com/');
//     }
//   })

// })
