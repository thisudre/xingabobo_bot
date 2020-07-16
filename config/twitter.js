const Twit = require('twit');
ofensa = require("./ofensas-bobas.js");

const twitter = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret
});

twitter.postaTweet = function (tweetToReply) {
    var user = '@' + tweetToReply.in_reply_to_screen_name;
    var tweet = user + " " + ofensa.geraOfensa();
    if (user == '@thidre') {
        tweet = user + " te amo papai!!"
    }
    var params = {
        status: tweet,
        in_reply_to_status_id: tweetToReply.in_reply_to_status_id_str,
    }

    twitter.post(
        'statuses/update',
        params,
        function (err, data, response) {
            // console.log(data);
            if (err === undefined) {
                console.log('tweet postado: ' + tweet);
            }
            else{
                console.log(err);
            }
        }
    );
}

module.exports = twitter;