
/***************** BOLA *******************/
class Bola {
  constructor(x, y, size, speed) {
    this.category = "bola";
    this.col = 200;
    this.strokeCol = 200;
    this.labelCol = 0;
    this.labelFont = "Monospace";
    this.light = 200;
    this.speed = speed;
    this.speedX = speed;
    this.speedY = speed;
    this.x = x;
    this.y = y;
    this.size = size;
    this.strokeWeight = 1;
    this.sym = Symbol();
    this.high = false;
  };

  show() {
    noStroke();
    fill(this.col);
    stroke(this.strokeCol);
    strokeWeight(this.strokeWeight);
    ellipse(this.x, this.y, this.size, this.size);
  };
  moveRandom(randX, randY) {
    this.x = this.x + randX*this.speed;
    this.y = this.y + randY*this.speed;
  };
  move(speedX, speedY){
    this.speedX = speedX;
    this.speedY = speedY;
    this.x+=this.speedX;
    this.y+=this.speedY;
  };
  bounce(minW, maxW, minH, maxH) {
    if (this.x >= maxW || this.x <= minW) {
      this.speed = this.speed* -1;
    }
    if (this.y >= maxH || this.y <= minH) {
      this.speed*=-1;
    }
  };
  setColor(r,g,b,a) {
    this.col = color(r, g, b, a);
  };
  setStroke(r, g, b, a, weight) {
    this.strokeCol = color(r, g, b, a);
    this.strokeWeight = weight;
  };
  randomColor(r,g,b,a) {
    this.col = color(random(this.light, r), random(this.light, g), random(this.light,b), a);
  };
  showLabel(label, labelSize, offLabelX, offLabelY) {
    textSize(labelSize);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(this.labelCol)
    text(label, this.x+offLabelX, this.y+offLabelY);
  };
  setLabelColor(r,g,b,a){
    this.labelCol = color(r, g, b, a);
  };
  labelRandomColor(r,g,b,a) {
    this.labelCol = color(random(this.light, r), random(this.light, g), random(this.light,b), a);
  };
  highlight(px, py, highCol, normCol) {
    const pCol = this.col;
    let r = dist(px, py, this.x, this.y);
    if (r < this.size) {
      this.high = true;
      this.col = highCol;
      this.labelCol = normCol;
      // console.log("over");
    } else {
      this.high = false;
      this.col = normCol;
      this.labelCol = highCol;
    }
  };
  highlightMap(px, py, x, y, highCol, normCol) {
    const pCol = this.col;
    let r = dist(px, py, x, y);
    if (r < this.size) {
      this.high = true;
      this.col = highCol;
      this.labelCol = normCol;
      console.log("over");
    } else {
      this.high = false;
      this.col = normCol;
      this.labelCol = highCol;
    }
  };
  showTooltip(x, y, tw, th, tcol, name, info) {
    if (this.high) {
      fill(220,100);
      rectMode(CORNER);
      rect(x, y, tw, th, 20);
      fill(tcol);
      textFont(this.labelFont);
      textAlign(CENTER, CENTER);
      textSize(16);
      text(name + "\n" + info, x+tw/2, y+th/2);
    }
  }
  // showTooltipDiv(x, y, tw, th, tcol, name, info) {
  showTooltipDiv() {
    if (this.high) {
      let labelDiv = createDiv("holi").class("tooltip");

      //
      // fill(220,100);
      // rectMode(CORNER);
      // rect(x, y, tw, th, 20);
      // fill(tcol);
      // textFont(this.labelFont);
      // textAlign(CENTER, CENTER);
      // textSize(16);
      // text(name + "\n" + info, x+tw/2, y+th/2);
    }
  }
  showTooltipLayer(x, y, tw, th, tcol, name, info, layer) {
    if (this.high) {
      push();
        translate(-tw/2, -th/2);
        fill(220,100);
        rectMode(CORNER);
        layer.rect(x, y, tw, th, 20);
        fill(tcol);
        textFont(this.labelFont);
        textAlign(CENTER, CENTER);
        textSize(16);
        layer.text(name + "\n" + info, x+tw/2, y+th/2);
      pop();
    }
  }
}



/***************** BARRA *******************/
class Barra {
  constructor(x, y, sizeX, sizeY, speed, mode) {
    this.category = "cuadro";
    this.col = 0;
    this.labelCol = 0;
    this.labelFont = "Monospace";
    this.light = 220;
    this.speed = speed;
    this.speedX = speed;
    this.speedY = speed;
    this.mode = mode;
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.rot = 0;
    this.sym = Symbol();
  };

  show() {
    noStroke();
    fill(this.col)
    rectMode(this.mode);
    if (this.rot!=0) {
      push();
        rotate(this.rot);
        rect(this.x, this.y, this.sizeX, this.sizeY);
      pop();
    } else {
      rect(this.x, this.y, this.sizeX, this.sizeY);
    }
  };
  moveRandom(randX, randY) {
    this.x = this.x + randX*this.speed;
    this.y = this.y + randY*this.speed;
  };
  move(){
    this.x+=this.speedX;
    this.y+=random(-this.speedY, this.speedY);
  };
  bounce(minW, maxW, minH, maxH) {
    if (this.x >= maxW || this.x<=minW) {
      this.speed = this.speed* -1;
    }

    if (this.y > maxH || this.y<=minH) {
      this.speed*=-1;
    }

  };
  setColor(r,g,b,a) {
    this.col = color(r, g, b, a);
  };
  randomColor(r,g,b,a) {
    this.col = color(random(this.light, r), random(this.light, g), random(this.light,b), a);
  };
  showLabel(label, labelSize, offLabelX, offLabelY) {
    textSize(labelSize);
    textFont(this.labelFont);
    fill(this.labelCol)
    if (this.mode == CENTER) {
      textAlign(CENTER, CENTER);
      text(label, this.x+offLabelX, this.y+offLabelY);
    } else if (this.mode == CORNER) {
      textAlign(CENTER, BOTTOM);
      text(label, this.x+this.sizeX/2+offLabelX, this.y+offLabelY);
    }
    // if (this.rot!=0) {
    //   push();
    //     rotate(this.rot);
    //     text(label, this.x+offLabelX, this.y+offLabelY);
    //   pop();
    // } else {
    //   text(label, this.x+this.sizeX/2+offLabelX, this.y+offLabelY);
    // }
  };
  setLabelColor(r,g,b,a){
    this.labelCol = color(r, g, b, a);
  };
  labelRandomColor(r,g,b,a) {
    this.labelCol = color(random(this.light, r), random(this.light, g), random(this.light,b), a);
  };
  rotation(degrees) {
    this.rot = radians(degrees);
    console.log(this.rot)
  };
  highlight(px, py, highCol, normCol) {
    const pCol = this.col;


    if (this.mode == CENTER) {
      let l = dist(px, py, this.x, this.y);
      let h = dist(px, py, this.x, this.y);
      if (l < this.sizeX && h < this.sizeY) {
        this.high = true;
        this.col = highCol;
        this.labelCol = normCol;
        console.log("over");
      } else {
        this.high = false;
        this.col = normCol;
        this.labelCol = highCol;
      }

    } else if (this.mode == CORNER) {
      let l = dist(px, py, this.x+this.sizeX/2, this.y+this.sizeY/2);
      let h = dist(px, py, this.x+this.sizeX/2, this.y+this.sizeY/2);
      if (l < this.sizeX && h < this.sizeY) {
        this.high = true;
        this.col = highCol;
        this.labelCol = normCol;
        console.log("over");
      } else {
        this.high = false;
        this.col = normCol;
        this.labelCol = highCol;
      }
    }
  };
  showTooltip(x, y, tw, th, tcol, name, info) {
    if (this.high) {
      fill(220,100);
      rectMode(CORNER);
      rect(x, y, tw, th, 20);
      fill(tcol);
      textFont(this.labelFont);
      textAlign(CENTER, CENTER);
      textSize(16);
      text(name + "\n" + info, x+tw/2, y+th/2);
    }
  }
};
