let points = [[-3, 5], [3, 7], [1, 5], [2, 4], [4, 3], [5, 2], [6, 2], [8, 4], [8, -1], [6, 0], [0, -3], [2, -6], [-2, -3], [-4, -2], [-5, -1], [-6, 1], [-6, 2]];
let colors = ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF"];
let amplitude;
let song;
let shapes = [];

function preload() {
  song = loadSound('midnight-quirk-255361.mp3'); // 載入音樂檔
}

function setup() {
  createCanvas(windowWidth, windowHeight); //建立畫布，寬高為視窗的寬高
  amplitude = new p5.Amplitude();
  song.loop(); // 音樂循環播放

  for (let j = 0; j < 10; j++) {
    shapes.push({
      x: random(width),
      y: random(height),
      dx: random(-1, 1),
      dy: random(-1, 1),
      color: random(colors)
    });
  }
}

function draw() {
  background("#C1F7DC"); //設定背景顏色為淺綠色

  let level = amplitude.getLevel();
  let sizeFactor = map(level, 0, 1, 0.5, 2); // 根據振幅調整大小

  for (let shape of shapes) {
    push();
    translate(shape.x, shape.y); // 隨機位置
    scale(sizeFactor); // 根據振幅調整大小
    stroke('#5E6472'); //設定畫筆顏色為灰色
    strokeWeight(4); //設定畫筆粗細為4
    fill(shape.color); // 隨機填充馬卡龍色系

    beginShape();
    for (let i = 0; i < points.length; i++) {
      let x = points[i][0] * 20;
      let y = points[i][1] * 20;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();

    shape.x += shape.dx;
    shape.y += shape.dy;

    if (shape.x > width || shape.x < 0) {
      shape.dx *= -1;
    }
    if (shape.y > height || shape.y < 0) {
      shape.dy *= -1;
    }
  }
}
