var weather;

var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&APPID=001b0f58045147663b1ea518d34d88b4';
var units = '&units=metric';

var input;

function setup() {
  createCanvas(windowWidth, windowHeight);

  var button = select('#submit');
  button.mousePressed(weatherAsk);

  input = select('#city');
}

function weatherAsk() {
  var url = api + input.value() + apiKey + units;
  loadJSON(url, gotData);
}

function gotData(data) {
  weather = data;
  console.log(data);
}

function draw() {
  background(0);
  if (weather) {
    var temp = weather.main.temp;
    var humidity = weather.main.humidity;

    let colTemp = map(temp, -10, 50, 0, 255);
    let colHum = map(temp, 0, 100, 0, 255);

    fill(colTemp, colTemp, 0);
    ellipse(windowWidth/3, windowHeight/2, 200, 200);
    fill(0, colHum, colHum);
    ellipse(windowWidth-windowWidth/3, windowHeight/2, 200, 200);
  }
}
