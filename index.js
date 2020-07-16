var Twit = require('twit');
var config = require('./config.js');
const randomItem = require('random-item');

var twitter = new Twit(config);

var arrayComecos = [
    'isso aí é coisa de',
    'você é um',
    'tu tem cara de',
    'vai tomar banho na soda, ô',
    'tu tem cheiro é de',
    'e aí ô',
    'e aí ô cara de',
    'tu é mó',
    'olha morrice, um',
    'olha aqui, sue',
    'lá vem você com essa cara de',
    'ninguem te perguntou, ô',
    'deixa de ser',
    'não fala mais comigo, sue',
    'mas tu é um baita de ume',
    'diretamente de ume',
    'nunca vi ninguém mais',
]

var arrayXingos = [
    'songamonga',
    'bobaiete',
    'barata tonta',
    'boboca',
    'pamonha',
    'c* de brita',
    'c* de alface',
    'salafrario',
    'palermu',
    'c* de alicate',
    'c* de lajota',
    'energumenu',
    'cachorro cururu',
    'biltre',
    'abobalhade',
    'cabeça de hamburguer',
    'panaca',
    'mequetrefe',
    'paspalhu',
    'pamonha',
    'c* de apito',
    'c* de mochila',
    'pilantra',
    'trombadinha',
    'bananão',
    'panaca',
    'mentecaptu',
    'feiose',
    'larápio',
    'fi de uma lapréa',
    'tchonga',
    'lambisgóia',
    'fi de rampera',
    'catilanga',
    'xarope',
    'sirigaita',
    'chatonilde',
    'matute veio',
    'cheira virilha',
    'frívole',
    'bafo de jontex',
    'lazarento',
    'velhacu',
    'bobalhão',
    'sommelier de r*la',
    'comedia',
    'quina de mesa',
    'peido de suvaco',
    'talho de tabaco',
    'corno',
    'desmiolado',
    'precário',
    'peido na farofa',
    'bocó',
    'lambe bota',
    'rato de isqueiro',
    'burraldo',
    'tapado',
    'cocozento'
];

function postaTweet(tweetToReply) {
    var user = '@' + tweetToReply.in_reply_to_screen_name;
    var tweet = user + " " + randomItem(arrayComecos).toUpperCase() + " " + randomItem(arrayXingos).toUpperCase() + "!!!!"
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
            console.log('tweet postado: ' + tweet);
        }
    );
}

// postaTweet();
function buscaTweets() {
    var stream = twitter.stream('statuses/filter', {track: "@xingabobo xingue"})
    stream.on('tweet', function(tweet){
        // console.log(tweet);
        console.log("quem me marcou foi: " + tweet.user.screen_name);
        console.log("pra responder: " + tweet.in_reply_to_screen_name);
        if ((tweet.user.screen_name != 'xingabobo') 
        && (tweet.in_reply_to_screen_name != 'xingabobo')
        && (tweet.in_reply_to_screen_name != null)
        ) 
        {
            postaTweet(tweet);
            console.log(tweet.entities.user_mentions);
        }
        else
        {
            console.log("o tweet não será postado.");
            console.log(tweet.entities.user_mentions);
        }
    });
}

buscaTweets();