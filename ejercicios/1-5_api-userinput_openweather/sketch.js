let weather;

const api = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=OPENWEATHER_KEY';
const units = '&units=metric';

let input;

function setup() {
  createCanvas(windowWidth, windowHeight);

  let button = select('#submit');
  button.mousePressed(weatherAsk);

  input = select('#city');
}

function weatherAsk() {
  let url = api + input.value() + apiKey + units;
  loadJSON(url, gotData);
}

function gotData(data) {
  weather = data;
  console.log(data);
}

function draw() {
  background(255);
  if (weather) {
    let temp = weather.main.temp;
    let humidity = weather.main.humidity;

    let colTemp = map(temp, -10, 50, 0, 255);
    let colHum = map(temp, 0, 100, 0, 255);
    noStroke();
    fill(colTemp, colTemp, 0);
    ellipse(windowWidth/3, windowHeight/2, 200, 200);
    fill(0, colHum, colHum);
    ellipse(windowWidth-windowWidth/3, windowHeight/2, 200, 200);

    fill(255);
    textFont("Overpass Mono");
    textAlign(CENTER, CENTER);
    textSize(16);
    text(`temperature: \n${temp}`, windowWidth/3, windowHeight/2);
    text(`humidity: \n${humidity}`, windowWidth-windowWidth/3, windowHeight/2);
  }
}
