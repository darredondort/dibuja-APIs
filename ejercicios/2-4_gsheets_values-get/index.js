// declara variables globales para recibir y manipular datos
let data;
let num;

// Script adaptado del ejemplo de Google Sheets APIs:
// "node.js quickstart"
// https://developers.google.com/sheets/api/quickstart/nodejs

// importar los paquetes fs, realine y googleapis
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// configurar alcances de Google API sobre nuestra cuenta
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// referir a archivo token.json que será generado automáticamente cuando la aplicación
// se autentique por primera vez en Terminal
const TOKEN_PATH = 'token.json';

// cargar llaves de cliente desde archivo local credentials.json
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Autorizar cliente con credenciales, luego llamar a Google Sheets API.
  authorize(JSON.parse(content), gotData);
});

/**
 * Declara la función autorize(), que crea un cliente OAuth2 con las credenciales del primer parámetro
 * y ejecuta la función del segundo parámetro como callback que recibirá la respuesta de datos
 */
 function authorize(credentials, callback) {
   // deestructurar parámetros necesarios de credenciales
   const {client_secret, client_id, redirect_uris} = credentials.installed;
   const oAuth2Client = new google.auth.OAuth2(
       client_id, client_secret, redirect_uris[0]);

   // Revisar si ya existía un token
   fs.readFile(TOKEN_PATH, (err, token) => {
     if (err) return getNewToken(oAuth2Client, callback);
     oAuth2Client.setCredentials(JSON.parse(token));
     callback(oAuth2Client);
   });
 }


/**
 * Obtener y guardar nuevo token generado después de solicitud de autenticación
 * y ejecutar el callback dado con el cliente OAuth2 autorizado
 execute the given callback with the authorized OAuth2 client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Recibe e imprime datos solicitados al endpoint values.get de Google Sheets API
 * con los parámetros que indican el hoja de cálculo y rango de celdas
 */
function gotData(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    // indicar Id de Google Sheet, debe tene permiso de lectura habilitado
    spreadsheetId: '1ihdwd-YY5h_wCkaaKVK0P70gjhxxRlLuNLYPQeJwrq8',
    // solicita todas las celdas entre B5 Y J998
    range: 'confirmadosFuente!B5:J998',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    // data = rows;
    // let csv = rows;
    data = rows.join('"\n"');
    let csv = data.replace(/\"/g, "");
    // let json = JSON.stringify(data);
    // console.log(json);


    let timestamp = new Date();
    let timestampPrint = timestamp.toLocaleString();
    let timestampISO = timestamp.toISOString();
    let timestampFile = timestampISO.replace(/\:/g, "-");




    fs.writeFile(`${timestampFile}_gsheets.csv`, csv, (err) => {
      if (err) throw err;
      console.log(`Datos de ${data.length} registros grabados en ${timestampFile}_gsheets.json`);
    });
    if (rows.length) {
      console.log(rows[0]);
      console.log(rows[1]);
      rows.map((row) => {
        // console.log(row[0],row[1],row[2],row[3]);
        // console.log(`${row[0]}, ${row[4]}`);
      });
    } else {
      console.log('No se encontraron datos.');
    }
  });
}
