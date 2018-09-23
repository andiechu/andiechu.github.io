var textStr = "CAD";
var textGraphic;
var myFont;

var particleMesh = [];
var particleNum = 3000;

var toff = 0.0;
var aoff = 100.0;
var tInc = 0.0001;
var aInc = 0.0001;
var offset = 30;

function preload() {
}

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("home")

    background(0);
    rectMode(CENTER);

    textGraphic = createGraphics(width, height);
    textGraphic.background(0);
    // textGraphic.textFont("Arial Black");
    textGraphic.textSize(288);
    textGraphic.textStyle(BOLD);
    textGraphic.textAlign(RIGHT, CENTER);
    textGraphic.fill(255);
    textGraphic.text(textStr, width-50, height/2);
    createMesh();
    // console.log(red(particleMesh[1].c));
}

function draw() {
    background(0);

    console.log("toff: ", toff)
    toff += tInc;
    aoff += aInc;
    var poff = 0.0;

    // image(textGraphic, 0, 0);
    for (var i = 0; i < particleMesh.length; i++) {
        var dist = noise(i, toff+=tInc) * offset;
        var angle = noise(i, aoff+=tInc) * TWO_PI;
        particleMesh[i].shake(dist, angle);
        particleMesh[i].update();
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    textGraphic = createGraphics(width, height);
    textGraphic.background(0);
    // textGraphic.textFont("Arial Black");
    textGraphic.textSize(288);
    textGraphic.textStyle(BOLD);
    textGraphic.textAlign(RIGHT, CENTER);
    textGraphic.fill(255);
    textGraphic.text(textStr, width-50, height/2);
    createMesh();
}

function createMesh() {
    particleMesh.length = 0;
    textGraphic.loadPixels();

    var density = textGraphic.pixelDensity();  // 2

    for (var i = 0; i < particleNum; i++) {
        var x = Math.floor(random(0, width));
        var y = Math.floor(random(0, height));
        if (isWhite(textGraphic.get(x, y))) {
            append(particleMesh, new Particle(x, y));
        }
    }
}

function isWhite(arr) {
    if (arr[0] == 255 && arr[1] == 255 && arr[2] == 255) {
        return true;
    } else {
        return false;
    }
}

function Particle(x, y) {
    this.pos = createVector(x, y);
    this.oriPos = this.pos.copy();
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.c = color(190, 190, 190, 100);
    this.size = 3;

    this.lineLength = 20;
    this.maxSpeed = 20;

    this.update = function() {
        this.move();
        this.draw();
        this.drawLines();
    }

    this.move = function() {
        if (this.vel.mag() > this.maxSpeed) {
            this.acc.set(0, 0);
        }
        this.vel.add(this.acc);
        this.pos = p5.Vector.add(this.oriPos, this.vel);
    }

    this.shake = function(dist, angle) {
        this.vel.set(dist*cos(angle), dist*sin(angle));
    }

    this.draw = function() {
        noStroke();
        // fill(c);
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    this.drawLines = function() {
        console.log(this.c);
        for (var i = 0; i < particleMesh.length; i++) {
            var other = particleMesh[i];
            var dist = this.pos.dist(other.pos);  // calculating the distance between this particle and another one
            if (dist < this.lineLength) {
                // stroke(this.c);
                stroke(255);
                strokeWeight(1);
                line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            }
        }
    }
}