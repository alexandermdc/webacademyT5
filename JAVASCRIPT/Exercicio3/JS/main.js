// set up canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// function to generate random RGB color value
function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

function Triangulo(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Triangulo.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    ctx.moveTo(this.x, this.y - this.size);
    ctx.lineTo(this.x - this.size, this.y + this.size);
    ctx.lineTo(this.x + this.size, this.y + this.size);
    ctx.closePath();
    ctx.fill();
};

Triangulo.prototype.update = function () {
    if (this.x + this.size >= width || this.x - this.size <= 0) {
        this.velX = -this.velX;
    }
    if (this.y + this.size >= height || this.y - this.size <= 0) {
        this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
};

Triangulo.prototype.collisionDetect = function () {
    for (const triangulo of triangulos) {
        if (this !== triangulo) {
            const dx = this.x - triangulo.x;
            const dy = this.y - triangulo.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.size + triangulo.size) {
                triangulo.color = this.color = colorPicker.value;
            }
        }
    }
};

const triangulos = [];

while (triangulos.length < 25) {
    let size = random(10, 20);
    let triangulo = new Triangulo(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
        random(size, width - size),
        random(size, height - size),
        random(-7, 7),
        random(-7, 7),
        colorPicker.value,
        size
    );
    triangulos.push(triangulo);
}

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < triangulos.length; i++) {
        triangulos[i].draw();
        triangulos[i].update();
        triangulos[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();
