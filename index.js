var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var Pusher = require('pusher');
require('dotenv').config();

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  encrypted: true
});

app.post('/pusher/auth', function(req, res) {
  console.log(req);
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var presenceData = {
    user_id: ip,
    user_info: {
      name: 'Mr Pusher',
      twitter_id: '@pusher'
    }
  };
  var auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});

var port = process.env.PORT || 3000;
app.listen(port);


