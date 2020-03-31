// variables globales para referirse dataset y su extensión máxima
let query = "covid-19";
let data = [];
let num = 10; // definir límite máximo de tweets a descargar

// importar el paquete fs para manipular el sistema de archivos local
const fs = require('fs');
let Twit = require('twit'); // importa el paquete Twit, una vez instalado desde npm
let config = require('./config.js') //  importa objeto de autenticación con credenciales y tokens para Twitter
let T = new Twit(config); // crea un nuevo objeto Twit, pasando como argumento el objeto de autenticación

// crear y configurar un nuevo stream con la API de Twitter para solicitar tweets a tiempo real
// parámetros completos para el endpoint POST statuses/filter:
// https://developer.twitter.com/en/docs/tweets/filter-realtime/api-reference/post-statuses-filter
let stream = T.stream('statuses/filter', { track: query })

// arrancar stream y gestionar los datos de su respuesta
stream.on("tweet", function (tweet) {
  console.log("Solicitando stream a Twitter...")
  // console.log(tweet);
  // si aún no se ha llegado al límite máximo de tweets...
  if (data.length != num) {
    // imprime el contenido de cada tweet y su información asociada
    let screenName = tweet.user.screen_name;
    let text = tweet.text;
    // let retweets = tweet.retweet_count;
    // let likes = tweet.favorite_count;
    let date = tweet.created_at;
    console.log(`screenName: @${screenName} \n Text: ${text} \n date: ${date}`);
    data.push(tweet);
    console.log(`${data.length} tweets descargados hasta ahora...`);
  } else {
    // cierra la conexión de stream con Twitter e imprime total de tweets descargados
    endStream();
  }
})

function endStream() {
  stream.stop();
  // declara una nueva variable con nuevo un objeto Date
  let timestamp = new Date();
  // en una nuevas variables separadas, guarda la fecha y hora en string
  let localeDate = timestamp.toLocaleDateString().replace(/\//g, "-");
  let localeTime = timestamp.toLocaleTimeString().replace(/\:/g, "-");
  console.log(`Stream detenido en ${localeDate} . Se descargaron ${data.length} tweets.`);

  let streamedData = {};
  streamedData.statuses = data;
  // console.log(streamedData);
  let json = JSON.stringify(streamedData);
  // console.log(json);
  fs.writeFile(`../data/${localeDate}_${localeTime}_tweets-stream.json`, json, (err) => {
    if (err) throw err;
    console.log(`Datos de ${data.length} tweets grabados en ../data/${localeDate}_${localeTime}_${query}_tweets-stream.json`);
  });
}
