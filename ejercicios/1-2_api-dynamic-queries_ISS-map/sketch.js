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

let url = 'http://api.open-notify.org/iss-now.json';
let issX = 0;
let issY = 0;
let loc = "getting ISS location";

function setup() {
  canvas = createCanvas(windowWidth, windowHeight).parent("canvasContainer");

  // Crea una capa de mapa y otra de p5.js sobrepuesta para dibujar
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);



  background(51);
  setInterval(askISS, 500);
  stroke(255,0);



}

function askISS() {
  loadJSON(url, drawData, 'jsonp');
}

function drawData(json) {
  clear();
  data = json;
  let latitude = Number(data.iss_position.latitude);
  let longitude = Number(data.iss_position.latitude);
  const pos = myMap.latLngToPixel(latitude, longitude);
  // let lat = data.iss_position.latitude;
  // let long = data.iss_position.longitude;
  // issX = map(lat, -90, 90, 0, width);
  // issY = map(long, -180, 180, 0, height);
  loc = "(" + latitude + ", " + longitude + ")";
  // console.log(lat + " " + long);
  console.log(loc);
  let size = 24 + myMap.zoom();
  fill(255,150);
  stroke(255,10);
  ellipse(pos.x, pos.y, size, size);
  textSize(16);
  textFont("Overpass Mono");
  text(`ISS at latitude:${latitude}, longitude${longitude}`, 50, 50);

}

function draw() {
  // background(51);
}
