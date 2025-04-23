let input;
let slider;
let button;
let dropdown;
let iframe;
let isBouncing = false;

function setup() { //這是一個設定函數，只會執行一次 
  //產生一畫布，充滿整個視窗，背景顏色為#0d3b66
  createCanvas(windowWidth, windowHeight);
  background('#0d3b66');
  
  // 創建輸入文字框
  input = createInput();
  input.position(10, 10);
  input.size(350, 50);
  input.input(updateText);
  
  // 創建滑桿
  slider = createSlider(12, 30, 20);
  slider.position(480, 25);
  slider.style('width', '100px');
  
  // 創建按鈕
  button = createButton('跳動');
  button.position(600, 25);
  button.mousePressed(toggleBounce);
  
  // 創建下拉選單
  dropdown = createSelect();
  dropdown.position(700, 25);
  dropdown.size(100, 30);
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.changed(openWebsite);
  
  // 創建 iframe
  iframe = createElement('iframe');
  iframe.position(100, 200);
  iframe.size(windowWidth - 200, windowHeight - 300);
}

let textContent = "💐🥑🌼 ";

function updateText() {
  textContent = input.value();
}

function toggleBounce() {
  isBouncing = !isBouncing;
}

function openWebsite() {
  let selected = dropdown.value();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '教育科技學系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
    
  }
}

function draw() { //這是一個繪圖函數，會一直執行
  background('#0d3b66'); // 確保每次繪圖前清除畫布
  fill(0);
  textSize(24);
  text("文字大小", 380, 25);
  let textSizeValue = slider.value();
  textSize(textSizeValue);
  textAlign(LEFT, TOP);
  fill(0);
  stroke(0);
  strokeWeight(1);
  let textW = textWidth(textContent);
  let startX = 0;
  let startY = 100;
  for (let y = startY; y < height; y += textSizeValue + 20) {
    for (let x = startX; x < width; x += textW) {
      let bounceOffset = isBouncing ? random(-5, 5) : 0;
      text(textContent, x, y + bounceOffset);
    }
  }
  fill("#ffedd8");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 20, windowHeight - 120);
}