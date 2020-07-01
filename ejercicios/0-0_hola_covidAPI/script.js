let data;
let num;
let casesCol;
let deathsCol;

let globalTodayCases = 0;
let globalTodayDeaths = 0;
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
  loadJSON('https://corona.lmao.ninja/v2/countries', gotData);
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
      minCases = min(todayCases);
      maxCases = max(todayCases);
      minDeaths = min(todayDeaths);
      maxDeaths = max(todayDeaths);
      console.log("min/max cases: " + minCases + "/" + maxCases);
      console.log("min/max deaths: " + minDeaths + "/" + maxDeaths);
    drawData();
}

function drawData() {
  clear();
  for (let i = 0; i<num; i++) {
      let valCases = data[i].todayCases;
      globalTodayCases +=valCases;
      sizeCases = map(sqrt(valCases), sqrt(minCases), sqrt(maxCases), 0, 100);
      casesCol = color(150, 255, 0);

      if (data[i].todayDeaths) {
        let valDeaths = data[i].todayDeaths;
        globalTodayDeaths +=valDeaths;
        deathsCol = color(255, 50, 50);
      }
  }
  sizeCases = map(sqrt(globalTodayCases), sqrt(minCases), sqrt(maxCases), 0, 100);
  sizeDeaths = map(sqrt(globalTodayDeaths), sqrt(minCases), sqrt(maxCases), 0, 100);

  textFont("monospace");
  console.log("global cases today:" + globalTodayCases);
  textSize(14);
  fill(casesCol);
  text("Global covid-19 cases today:", width/5, height/2);
  textSize(sizeCases);
  text(globalTodayCases, width/2, height/2);

  console.log("global deaths today:" + globalTodayDeaths);
  fill(deathsCol);
  textSize(16);
  text("Global covid-19 deaths today:", width/5, height-height/4);
  textSize(sizeDeaths);
  text(globalTodayDeaths, width/2, height-height/4);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
