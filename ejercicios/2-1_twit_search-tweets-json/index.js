// variables globales
let query = 'covid';
let data;
let num;

const fs = require('fs');

let Twit = require('twit'); // importa el paquete Twit, instalado desde npm
let config = require('./config.js') //  importa objeto con credenciales y tokens antes Twiiter

let T = new Twit(config); // crea un nuevo objeto Twit pasando como argumento el objeto con objetos y credenciales

// define parámetros para buscar tweets
// lista completa de parámetros para el endpoint GET search/tweets:
// https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets
let params = {
  q: query,
  count: 10
}

T.get('search/tweets', params,gotData); // hacer llamado GET al enpoint search/tweets con parámetros
// una vez que llegue la respuesta, procesa los datos con la función gotData

function gotData(err, data, response) {
  // console.log(data);
  data = data.statuses;
  num = data.length;
  if (num >= 1) {
    console.log(`got ${num} tweets!`);
    for (let i = 0; i<num; i++) {
      let screenName = data[i].user.screen_name;
      let text = data[i].text;
      let retweets = data[i].retweet_count;
      let likes = data[i].favorite_count;
      let date = data[i].created_at;
      console.log(`screenName: @${screenName} \n Text: ${text} \n date: ${date} \n likes: ${likes} \n retweets: ${retweets} \n`);
    }
    console.log("saving this data:");
    // console.log(data);
    saveData(data);
  } else {
    console.log("no se encontraron tweets..")
  }
}

function saveData(dataWrite) {
  // console.log(dataWrite);
  // declara una nueva variable con nuevo un objeto Date
  let timestamp = new Date();
  // en una nuevas variables separadas, guarda la fecha y hora en string
  let localeDate = timestamp.toLocaleDateString().replace(/\//g, "-");
  let localeTime = timestamp.toLocaleTimeString().replace(/\:/g, "-");
  console.log(`La descarga has finalizado en ${localeDate}. Se descargaron ${num} tweets.`);

  let json = JSON.stringify(dataWrite);
  console.log(json);
  fs.writeFile(`../data/${localeDate}_${localeTime}_${query}_tweets.json`, json, (err) => {
    if (err) throw err;
    console.log(`Datos de ${num} tweets grabados en ../data/${localeDate}_${localeTime}_${query}_tweets.json`);
  });
}
