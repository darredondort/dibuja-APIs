// declara variables globales para llamar, recibir y manipular datos
let place = "Global"
let query = '1';
let data;
let dataJSON;
let num;

// importar los paquetes de npm fs, Twit y createCsvWriter
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
let Twit = require('twit'); // importa el paquete Twit, instalado desde npm

let config = require('./config.js'); //  importa objeto de autenticación con credenciales y tokens para Twitter
let T = new Twit(config); // crea un nuevo objeto Twit, pasando como argumento el objeto de autenticación

// define parámetros para buscar tendencias (id de locación y hashtags a excluir)
// documentación completa de endpoint GET trends/place:
// https://developer.twitter.com/en/docs/trends/trends-for-location/api-reference/get-trends-place
let params = {
  id: query
  // exclude: ""
}

T.get('trends/place', params,gotData); // hacer llamado GET al enpoint trends/place con parámetros
// una vez que llegue la respuesta, procesa los datos con la función gotData

function gotData(err, json, response) {
  console.log(json);
  dataJSON = json;
  data = json[0].trends;
  num = data.length;
  if (num >= 1) {
    console.log(data);
    console.log("got " + num + "trends")
    saveData();
  } else {
    console.log("no se encontraton tendencias para esta locación...")
  }
}

function saveData() {
  // declara una nueva variable con nuevo un objeto Date
  let timestamp = new Date();
  // en una nuevas variables separadas, guarda la fecha y hora en string
  let localeDate = timestamp.toLocaleDateString().replace(/\//g, "-");
  let localeTime = timestamp.toLocaleTimeString().replace(/\:/g, "-");
  console.log(`La descarga has finalizado en ${localeTime}. Se descargaron ${num} tendencias.`);

  const csvWriter = createCsvWriter({
  path: `../data/${localeDate}_${localeTime}_${place}_trends.csv`,
  header: [
      {id: 'name', title: 'name'},
      {id: 'url', title: 'url'},
      {id: 'promoted_content', title: 'promoted_content'},
      {id: 'tweet_volume', title: 'tweet_volume'}
  ]
  });
  let records = [];
  for (let i=0;i<num;i++){
    let trendObj = {"name":data[i].name,"url":data[i].url,"promoted_content":data[i].promoted_content,"query":data[i].query,"tweet_volume":data[i].tweet_volume};
    records.push(trendObj);
  }
  csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...csv escrito');
    });

  let json = JSON.stringify(dataJSON);
    // console.log(json);
  fs.writeFile(`../data/${localeDate}_${localeTime}_${place}_trends.json`, json, (err) => {
    if (err) throw err;
    console.log('...JSON escrito');
    console.log(`Datos de ${num} tendencias grabados en ../data/${localeDate}_${localeTime}_${place}_trends.json y .csv`);
  });
}
