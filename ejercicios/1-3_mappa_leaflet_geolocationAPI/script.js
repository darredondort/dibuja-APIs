let geo;
let lat;
let lon;
if ("geolocation" in navigator) {
  /* geolocation is available */
  console.log("geolocation is available");
  navigator.geolocation.getCurrentPosition(async position => {
    console.log(position.coords);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    geo = position.coords;
    lat = geo.latitude;
    lon = geo.longitude;

    const data = { lat, lon };
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const response = await fetch("/api", options);
    const geoData = await response.json();
    console.log(geoData);
    // fetch("/api", options).then(response => {
    //   console.log(response);
    // });
  });
} else {
  /* geolocation IS NOT available */
  console.log("geolocation IS NOT available");
}

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
// Declara variables globales
let myMap;
let canvas;




function setup() {
  canvas = createCanvas(windowWidth, windowHeight).parent("canvasContainer");
  // Crea una capa de mapa y otra de p5.js sobrepuesta para dibujar
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  drawData();
  // Carga los datos de un .csv local, al terminar, corre la función drawData como callback
  myMap.onChange(drawData);
}

function draw() {

}

async function drawData() {
  clear();
  // console.log(position.coords);
  // asigna colores de relleno y contorno
  fill(255,0,255,20);
  stroke(255,0,255,100);

  const latitude = await lat;
  const longitude = await lon;

  let size = 20 + myMap.zoom();

  // Transform lat/lng to pixel position
  // console.log(geo);
  const pos = myMap.latLngToPixel(latitude, longitude);
  ellipse(pos.x, pos.y, size, size);
}
