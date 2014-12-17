/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Twitter = require('./twitter.model');
var TWEETS_BUFFER_SIZE = 3;
var Twit = require('twit');
var auth={
  consumer_key:        process.env.TWITTER_KEY,
  consumer_secret:      process.env.TWITTER_SECRET,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_SECRET
}
var T = new Twit(auth);

var nbOpenSockets = 0;
var stream = T.stream('statuses/filter',{track:'christmas, good deed,donate,foundation'});
//automatically close connection until there is a connection

var tweetsBuffer = [];
var stoppedOnce=false;
stream.on('error',function(error){
  console.log('error stream');
});
stream.on('connect', function(request) {
  console.log('Connected to Twitter API');
});
stream.on('disconnect', function(message) {
  console.log('Disconnected from Twitter API. Message: ' + message);
});
stream.on('reconnect', function (request, response, connectInterval) {
  console.log('Trying to reconnect to Twitter API in ' + connectInterval + ' ms');
});

/*Streaming Public Sample*/
var connected=function(){
  if (nbOpenSockets <= 0) {
      nbOpenSockets = 0;
      console.log('First active client. Start streaming from Twitter');
      if(stoppedOnce){
        stream.start();
      }
  }
  nbOpenSockets++;
  console.log('Plus a connection',nbOpenSockets);
};
var onSave=function(sockets,doc){
  sockets.emit('tweet:save', doc);
}
var disconnected=function(){
  nbOpenSockets--;
  console.log('Minus a connection',nbOpenSockets);
  if (nbOpenSockets <= 0) {
      nbOpenSockets = 0;
      console.log("No active client. Stop streaming from Twitter");
      stream.stop();
      stoppedOnce=true;
  }
};
exports.publicStream=function(sockets){
  stream.on('tweet', function(tweet) {
    if (tweet.place === null) {
        return{};
    }

    //Create message containing tweet + username + profile pic + location
    var msg = {};
    msg.text = tweet.text;
    msg.location = tweet.place.full_name;
    msg.timestamp = tweet.created_at;
    msg.user = {
      name: tweet.user.name,
      image: tweet.user.profile_image_url
    };

    //push msg into buffer
    tweetsBuffer.push(msg);

    //send buffer only if full
    if (tweetsBuffer.length >= TWEETS_BUFFER_SIZE) {
      //broadcast tweets
      onSave(sockets,tweetsBuffer);
      tweetsBuffer = [];
    }
  });
};
exports.disconnect=function(socket){
  disconnected();
};
exports.register=function(socket){
  connected();
};
// exports.register = function(socket) {
//   Twitter.schema.post('save', function (doc) {
//     onSave(socket, doc);
//   });
//   Twitter.schema.post('remove', function (doc) {
//     onRemove(socket, doc);
//   });
// }

// function onSave(socket, doc, cb) {
//   socket.emit('twitter:save', doc);
// }

// function onRemove(socket, doc, cb) {
//   socket.emit('twitter:remove', doc);
// }


