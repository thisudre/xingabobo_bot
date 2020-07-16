var app = require('./config/server.js');
const twitter = require('./config/twitter.js');

//Configura a porta disponível ou a porta 3000
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
//Configura o host disponível ou "0.0.0.0"
var server_host = process.env.YOUR_HOST || '0.0.0.0';


// postaTweet();


function buscaTweets() {
    var stream = twitter.stream('statuses/filter', {track: "@xingabobo xingue"})
    stream.on('tweet', function(tweet){
        console.log("quem me marcou foi: " + tweet.user.screen_name);
        console.log("pra responder: " + tweet.in_reply_to_screen_name);
        if ((tweet.user.screen_name != 'xingabobo') 
        && (tweet.in_reply_to_screen_name != 'xingabobo')
        && (tweet.in_reply_to_screen_name != null)
        ) 
        {
            twitter.postaTweet(tweet);
            console.log(tweet.entities.user_mentions);
        }
        else
        {
            console.log("o tweet não será postado.");
            console.log(tweet.entities.user_mentions);
        }
    });
}

app.listen(server_port, server_host, function () {
    console.log("Aplicação online.");
    buscaTweets();
});
