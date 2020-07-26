var app = require('./config/server.js');
const bot = require('./config/bot.js');

//Configura a porta disponível ou a porta 3000
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
//Configura o host disponível ou "0.0.0.0"
var server_host = process.env.YOUR_HOST || '0.0.0.0';

function buscaTweet() {
    var stream = bot.stream('statuses/filter', {track: '@xingabobo xing'})
    stream.on('tweet', function(tweet){
        console.log("tweet encontrado");
        bot.curteTweet(tweet.id_str);
        if (
            (tweet.user.screen_name != 'xingabobo') 
            && (tweet.in_reply_to_screen_name != 'xingabobo')
            && (tweet.in_reply_to_screen_name != null)
        )
        {
            bot.enviaTweet(tweet.in_reply_to_screen_name, tweet.in_reply_to_status_id_str);
        }
        else
        {
            console.log("novo tweet não postado.");
        }
    });
};

app.listen(server_port, server_host, function () {
    console.log("Aplicação online.");
    buscaTweet();
});
