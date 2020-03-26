const options = {
  lat: 30,
  lng: -98,
  zoom: 4,
  style: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  // más estilos de Leaflet: https://leaflet-extras.github.io/leaflet-providers/preview/
  // style: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
  // style: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
  // style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  // style: 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
  // style: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}'

};

const mappa = new Mappa('Leaflet');
let myMap;
let canvas;

let data;
let num;
let countryCases = [];
let countryDeaths = [];
let casesCol = [];
let deathsCol = [];

let cases = [];
let deaths = [];
let critical = [];
let recovered = [];
let todayCases = [];
let todayDeaths = [];
let minCases, maxCases, minDeaths, maxDeaths;

let sizes = [];
let minSize;
let maxSize;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight).parent('canvasContainer');
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  loadJSON('https://corona.lmao.ninja/countries', gotData);
  myMap.onChange(drawData);
}

function draw() {
}

function gotData(json) {
      data = json;
      console.log(data);
      num = data.length;
      console.log("found " + num + " rows");
      for (let i = 0; i<num; i++) {
        cases.push(data[i].cases);
        deaths.push(data[i].deaths);
        critical.push(data[i].critical);
        recovered.push(data[i].recovered);
        todayCases.push(data[i].todayCases);
        todayDeaths.push(data[i].todayDeaths);
      };
      console.log(cases);
      minCases = min(cases);
      maxCases = max(cases);
      minDeaths = min(deaths);
      maxDeaths = max(deaths);
      console.log("min/max cases: " + minCases + "/" + maxCases);
      console.log("min/max deaths: " + minDeaths + "/" + maxDeaths);
    drawData();
}

function drawData() {
  clear();

  for (let i = 0; i<num; i++) {
      const latitude = data[i].countryInfo.lat;
      const longitude = data[i].countryInfo.long;
      const pos = myMap.latLngToPixel(latitude, longitude);
      let valCases = data[i].cases;
      sizeCases = map(sqrt(valCases), sqrt(minCases), sqrt(maxCases), 0, 100) + myMap.zoom();

      countryCases[i] = new Bola(pos.x, pos.y, sizeCases, 1);
      casesCol[i] = color(150, 255, 0, map(valCases, minCases, maxCases, 25, 100));
      countryCases[i].setColor(casesCol[i]);
      countryCases[i].setStroke(200, 255, 0, 200, 1);
      countryCases[i].show();

      let labelCases = data[i].cases;
      let labelSizeCases = map(sqrt(valCases), sqrt(minCases), sqrt(maxCases), 6, 100) + myMap.zoom();

      countryCases[i].setLabelColor(200, 255, 0, 180);
      countryCases[i].showLabel(labelCases, labelSizeCases, 0, -labelSizeCases/2);

      if (data[i].deaths) {
        let valDeaths = data[i].deaths;
        sizeDeaths = map(sqrt(valDeaths), sqrt(minCases), sqrt(maxCases), 0, 100) + myMap.zoom();
        countryDeaths[i] = new Bola(pos.x, pos.y, sizeDeaths, 1);
        deathsCol[i] = color(255, 50, 50, map(valDeaths, minDeaths, maxDeaths, 25, 100));
        countryDeaths[i].setColor(deathsCol[i]);
        countryDeaths[i].setStroke(255, 50, 100, 200, 1);
        countryDeaths[i].show();
        let labelDeaths= data[i].deaths;
        let labelSizeDeaths = map(sqrt(valDeaths), sqrt(minCases), sqrt(maxCases), 6, 100) + myMap.zoom();
        countryDeaths[i].setLabelColor(255, 50, 100, 180);
        countryDeaths[i].showLabel(labelDeaths, labelSizeDeaths, 0, labelSizeCases/2);
      }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
