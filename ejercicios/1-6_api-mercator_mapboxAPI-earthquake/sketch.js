// Based on Coding Challenge by Daniel Shiffman
// http://codingtra.in
// Coding Challenge #57: Ma Earthquake Data
// Video: https://youtu.be/ZiYdOwOrGyc
let mapimg;

let clat = 0;
let clon = 0;

let ww = 1024;
let hh = 512;

let zoom = 1;
let earthquakes;

function preload() {
  // The clon and clat in this url are edited to be in the correct order.
  mapimg = loadImage(
    'https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
      clon +
      ',' +
      clat +
      ',' +
      zoom +
      '/' +
      ww +
      'x' +
      hh +
      '?access_token=MAPBOX_TOKEN'
  );
  // earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
  earthquakes = loadStrings(
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv'
  );
}

function mercX(lon) {
  lon = radians(lon);
  let a = (256 / PI) * pow(2, zoom);
  let b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  let a = (256 / PI) * pow(2, zoom);
  let b = tan(PI / 4 + lat / 2);
  let c = PI - log(b);
  return a * c;
}

function setup() {
  createCanvas(ww, hh);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  let cx = mercX(clon);
  let cy = mercY(clat);

  for (let i = 1; i < earthquakes.length; i++) {
    let data = earthquakes[i].split(/,/);
    //console.log(data);
    let lat = data[1];
    let lon = data[2];
    let mag = data[4];
    let x = mercX(lon) - cx;
    let y = mercY(lat) - cy;
    // This addition fixes the case where the longitude is non-zero and
    // points can go off the screen.
    if (x < -width / 2) {
      x += width;
    } else if (x > width / 2) {
      x -= width;
    }
    mag = pow(10, mag);
    mag = sqrt(mag);
    let magmax = sqrt(pow(10, 10));
    let d = map(mag, 0, magmax, 0, 180);
    stroke(255, 0, 255);
    fill(255, 0, 255, 200);
    ellipse(x, y, d, d);
  }
}
