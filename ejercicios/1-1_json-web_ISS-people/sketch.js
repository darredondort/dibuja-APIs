let boliza = [];
let data;
let num;

const starsX = [];
const starsY = [];
const starsNum = 600;

let colors = [[96,168,98],
              [196,92,162],
              [180,148,62],
              [119,122,205],
              [203,90,76]];

function setup() {
  loadJSON('http://api.open-notify.org/astros.json', gotData, 'jsonp');
  // createCanv.as(600, 600);
  createCanvas(windowWidth, windowHeight);

  // llenar array con posición x,y de estrellas
  for(let i=0; i < starsNum; i++) {
    starsX.push(round(random(width)));
    starsY.push(round(random(height)));
  }
  console.log(starsX);
  console.log(starsY);

}

function gotData(json) {
  data = json.people;
  num = data.length;
  createCanvas(windowWidth, windowHeight);

  let size = 50;
  let speed = 5;
  let x = width/2-size;
  let y = height/2;
  for (let i = 0; i<num; i++) {
    boliza[i] = new Bola(x, y, size, speed);
    // boliza[i].randomColor(random(200),random(100),random(200),80);
    boliza[i].setColor(colors[i]);
    boliza[i].setLabelColor(220,220,220,255);
    x+=size;
    y+=random(-size*3, size*3)
  }
}


function draw() {
  background(0,10,20);

  let title = "Personas en el espacio en este momento";
  let subtitle = "Fuente: http://api.open-notify.org/";

  textFont("Overpass Mono");
  fill(220);
  textSize(24);
  textAlign(CENTER);
  text(title, width/2, 50);

  textSize(16);
  fill(150);
  textAlign(CENTER);
  text(subtitle, width/2, 75);


  // dibujar estrellas en posiciones de array starsX y starsY
  for(let i=0; i < 500; i++) {
      stroke(255);
      strokeWeight(random(0.5,3));
      point(starsX[i], starsY[i]);
  }

  // dibuja ISS
  fill(150);
  let issX = width/2;
  let issY = height/2;
  let issW = width/2;
  let issH = height/3;

  stroke(255);
  strokeWeight(10);
  rectMode(CENTER);
  rect(issX, issY, issW, issH, 20);

  noStroke();
  for (let i = 0; i<num; i++) {
    boliza[i].show();
    boliza[i].bounce(width/2-issW/2, width/2+issW/2, height/2-issH/2, height/2+issH/2);
    boliza[i].moveRandom(random(0.7),random(0.5));
    boliza[i].showLabel(data[i].name, 16, 0, 0);
  }
  for (let i = 0; i<num; i++) {
    boliza[i].highlight(mouseX, mouseY, 220, colors[i]);
    boliza[i].showTooltip(mouseX, mouseY, 200, 100, colors[i], data[i].name, "craft: " + data[i].craft);
  }
}
