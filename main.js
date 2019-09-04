var draw;
var draw2;
var draw3;
var draw4;
var drawe;
var drawt;
var drawr;
var art;
var text, rec, cir, ram, era, tex, bow; //繪圖物件
var end = 0;
var lastX = 0;
var lastY = 0;
var hue = 0;

var cPushArray = new Array();
var cStep = -1;

var font = '14px sans-serif';
var hasInput = false;
var font_name = 'Arial';
var font_size=2;


function cPush() {
    cStep++;
    if (cStep < cPushArray.length) {
       cPushArray.length = cStep; 
    }
    cPushArray.push(document.getElementById('art').toDataURL());
}
function cUndo() {
    if (cStep > 0) {
        cStep--;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { 
          ctx.drawImage(canvasPic, 0, 0); 
        }
    }
}
function cRedo() {
    if (cStep < cPushArray.length-1) {
        cStep++;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { 
          ctx.drawImage(canvasPic, 0, 0); 
        }
    }
}
function init() {
    art = document.getElementById("art");
    ctx = art.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 800, 550);
    cPush();
}
function down() {
    if(draw==true && !drawe && !draw2 && !draw3 && !draw4 && !drawr && !drawt){
      text = ctx;
      text.moveTo(event.offsetX, event.offsetY);
      //draw = true;
      text.beginPath();
      //art.style.cursor = "url('pen1.png'), auto";
    }
    else if(draw2==true && !draw && !draw3 && !draw4 && !drawe && !drawt  && !drawr){
      rec = ctx;
      rec.moveTo(event.offsetX, event.offsetY);

      //draw2 = true;
      rec.beginPath();
      rec.rect(event.offsetX, event.offsetY, 100, 100);
      //art.style.cursor = "url('rectan1.png'), auto";
    }
    else if(draw3==true && !draw && !draw2 && !draw4 && !drawe && !drawt && !drawr){
      cir = ctx;
      cir.moveTo(event.offsetX, event.offsetY);
      //draw3 = true;
      cir.beginPath();
      cir.arc(event.offsetX, event.offsetY, 50, 0, 2*Math.PI, false);
      //art.style.cursor = "url('circle1.png'), auto";
    }
    else if(draw4==true && !draw && !draw2 && !draw3 && !drawe && !drawt && !drawr){
      ram = ctx;
      ram.beginPath();
      ram.moveTo(event.offsetX, event.offsetY);
      //draw4 = true;
      ram.lineTo(event.offsetX-100, event.offsetY);
      ram.lineTo(event.offsetX-50, event.offsetY-50);
      ram.lineTo(event.offsetX, event.offsetY);

      //art.style.cursor = "url('trian1.png'), auto";
    }
    else if(drawe==true && !draw && !draw2 && !draw3 && !draw4 && !drawt && !drawr){
      era = ctx;
      era.strokeStyle = "rgb(255,255,255)"; 
      era.moveTo(event.offsetX, event.offsetY);
      era.beginPath();
      //art.style.cursor = "url('eraser1.png'), auto";
    }
    else if(drawt==true && !drawe && !draw && !draw2 && !draw3 && !draw4 && !drawr){
      tex = ctx;
      hasinput = false;
      
      text();
    }
    else if(drawr==true && !drawe && !draw && !draw2 && !draw3 && !draw4 && !drawt){
      bow = ctx;
      bow.moveTo(lastX, lastY);
      bow.beginPath();
    }
}

function move() {
    if (draw) {   
        text.lineTo(event.offsetX, event.offsetY);
        text.lineJoin = 'round';
        text.lineCap = 'round';
        text.stroke();     
    }
    else if(draw2){
      //rec.rect(event.offsetX, event.offsetY, 100, 100);
      //rec.strokeRect(event.offsetX, event.offsetY, 100, 100);
      rec.stroke();
      //rec.fillRect(event.offsetX, event.offsetY, 100, 100);
    }
    else if(draw3){
      //cir.arc(event.offsetX, event.offsetY, 50, 0, 2*Math.PI, false);
      cir.stroke();
    }
    else if(draw4){
      //ram.lineTo(event.offsetX-40, event.offsetY+50);
      //ram.lineTo(event.offsetX+40, event.offsetY+50);
      //ram.lineTo(event.offsetX, event.offsetY);
      ram.stroke();
    }
    else if(drawe){
      era.lineTo(event.offsetX, event.offsetY);
      era.stroke();
    }
    else if(drawt){
      hasinput = false;
    }
    else if(drawr){ 
      bow.lineTo(event.offsetX, event.offsetY);
      bow.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      bow.lineJoin = 'round';
      bow.lineCap = 'round';
      bow.stroke();
      [lastX, lastY] = [event.offsetX, event.offsetY];
      hue++;
        if (hue >= 360) {
          hue = 0;
      }

    }
}
function up() {
  hasinput = true;
    if(draw){
      draw = true;
      text.closePath();
      text = end;
      cPush();
    }
    else if(draw2){
      draw2 = true;
      //rec.fillRect(event.offsetX, event.offsetY, 100, 100);
      //rec.clearRect(event.offsetX, event.offsetY, 100, 100);
      rec.closePath();
      rec = end;
      cPush();
    }
    else if(draw3){
      draw3 = true;
      cir.closePath();
      cir = end;
      cPush();
    }
    else if(draw4){
      draw4 = true;
      ram.closePath();
      ram = end;
      cPush();
    }
    else if(drawe){
      drawe = true;
      era.closePath();
      era = end;
      cPush();
    }
    else if(drawt){
      tex = end;
      drawt = true;
    }
    else if(drawr){
      drawr = true;
      bow.closePath();
      bow = end;
      cPush();
    }
}

function text(){
  //art.style.cursor="url('textt1.png'), auto";
  hasInput = false;
  //document.title = cStep + ":" + cPushArray.length;
  if(draw || draw2 || draw3 || draw4 || drawe || drawr){
    hasInput = true;
  }
  art.onclick = function(event) {
    if (hasInput) return;
    addInput(event.offsetX, event.offsetY);
  }
}

function addInput(x, y) {

  var input = document.createElement('input');
  font = 8*font_size+'px '+font_name;
  input.type = 'text';
  input.style.position = 'static';
  input.style.left = (x + 4)+ 'px ';
  input.style.top = (y - 4) + 'px ';
  input.style.font = font;
  input.style.color = ctx.strokeStyle;
  input.onkeydown = handleEnter;
  document.body.appendChild(input);
  input.focus();
  hasInput = true;
  
}

function handleEnter(event) {
  var keyCode = event.keyCode;
  if (keyCode === 13) {
      drawText(this.value, parseInt(this.style.left, 10), parseInt(this.style.top, 10));
      document.body.removeChild(this);
      hasInput = false;
  }
}

function drawText(txt, x, y) {
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.fillStyle = ctx.strokeStyle;
  ctx.font = font;
  ctx.fillText(txt, x-4, y-4);
  cPush();
}

function setFont(f) {
  if (f == 0) {
    font_name = 'Arial';
  } else if (f == 1) {
    font_name = 'Verdana';
  }else if (f == 2) {
    font_name = 'sans-serif';
  } else if (f == 3) {
    font_name = '新細明體';
  } else if (f == 4) {
    font_name = '標楷體';
  } else if (f == 5) {
    font_name = '微軟正黑體';
  }
}

function setFont_size(value) {
  font_size = Math.round(parseInt(value) / 10);
  if (font_size == 0){
    font_size = 1;
  }
}

function bow_onclick(){
  art.style.cursor = "url('sun1.png'), auto";
  hasInput = true;
  if(drawe==true){
    ctx.strokeStyle = "rgb(0,0,0)";
  }
  ctx.strokeStyle = "rgb(65,105,255)";
  drawt = false;
  drawr = true;
  draw2 = false;
  draw = false;
  drawe = false;
  draw3 = false;
  draw4 = false;

}
function ctext(){
  art.style.cursor = "url('textt1.png'), auto";
  hasInput = false;
  if(drawe==true){
    ctx.strokeStyle = "rgb(0,0,0)";
  }
  ctx.strokeStyle = "rgb(0,0,0)";
  drawe = false;
  drawt = true;
  drawr = false;
  draw2 = false;
  draw = false;
  drawe = false;
  draw3 = false;
  draw4 = false;
  text();
  //text.strokeStyle = "rgb(0,0,0)";
}
function text_onclick(){
  art.style.cursor = "url('pencil1.png'), auto";
  hasInput = true;
  if(drawe==true){
    ctx.strokeStyle = "rgb(0,0,0)";
  }
  drawt = false;
  drawr = false;
  draw2 = false;
  draw = true;
  drawe = false;
  draw3 = false;
  draw4 = false;
  text();
  text.strokeStyle = "rgb(0,0,0)";
}
function rec_onclick(){
  art.style.cursor = "url('rectan1.png'), auto";
  hasInput = true;
  if(drawe==true){
    ctx.strokeStyle = "rgb(0,0,0)";
  }
  drawt = false;
  drawr = false;
  draw2 = true;
  draw = false;
  draw3 = false;
  draw4 = false;
  drawe = false;
  text();
  rec.strokeStyle = "rgb(0,0,0)";
}
function cir_onclick(){
  art.style.cursor = "url('circle1.png'), auto";
  hasInput = true;
  if(drawe==true){
    ctx.strokeStyle = "rgb(0,0,0)";
  }
  drawt = false;
  drawr = false;
  draw2 = false;
  draw = false;
  draw3 = true;
  draw4 = false;
  drawe = false;
  text();
  cir.strokeStyle = "rgb(0,0,0)";
}
function ram_onclick(){
  art.style.cursor = "url('trian1.png'), auto";
  hasInput = true;
  if(drawe==true){
    ctx.strokeStyle = "rgb(0,0,0)";
  }
  drawt = false;
  drawr = false;
  draw2 = false;
  draw = false;
  draw3 = false;
  draw4 = true;
  drawe = false;
  text();
  ram.strokeStyle = "rgb(0,0,0)";
}
function white_onclick() { 
  art.style.cursor = "url('eraser1.png'), auto";
  hasInput = true;
  drawt = false;
  draw2 = false;
  drawr = false;
  draw = false;
  draw3 = false;
  draw4 = false;
  drawe = true;
  ctx.strokeStyle = "rgb(255,255,255)"; 
  //text();
}

function red_onclick() { 
  if(drawe){
    ctx.strokeStyle = "rgb(255,255,255)";
  }
  else{
    ctx.strokeStyle = "rgb(255,0,0)";
  }
}
function green_onclick() { 
  if(drawe){
    ctx.strokeStyle = "rgb(255,255,255)";
  }
  else{
    ctx.strokeStyle = "rgb(0,255,0)"; 
  }
}
function blue_onclick() { 
  if(drawe){
    ctx.strokeStyle = "rgb(255,255,255)";
  }
  else{
    ctx.strokeStyle = "rgb(0,0,255)"; 
  }
}
function yellow_onclick() { 
  if(drawe){
    ctx.strokeStyle = "rgb(255,255,255)";
  }
  else{
    ctx.strokeStyle = "rgb(255,255,0)"; 
  }
}
function orenge_onclick() { 
  if(drawe){
    ctx.strokeStyle = "rgb(255,255,255)";
  }
  else{
    ctx.strokeStyle = "rgb(255,137,0)"; 
  }
}
function pink_onclick() { 
  if(drawe){
    ctx.strokeStyle = "rgb(255,255,255)";
  }
  else{
    ctx.strokeStyle = "rgb(255,105,180)"; 
  }
}
function black_onclick() {
  if(drawe){
    ctx.strokeStyle = "rgb(255,255,255)";
  }
  else{
    ctx.strokeStyle = "rgb(0,0,0)"; 
  }
}
function gain_onclick() {
  if(drawe){
    ctx.strokeStyle = "rgb(255,255,255)";
  }
  else{
    ctx.strokeStyle = "rgb(220,220,220)"; 
  }
}

function text1_onclick() { 
  ctx.lineWidth = 1; 
}
function text2_onclick() { 
  ctx.lineWidth = 2; 
}
function text3_onclick() { 
  ctx.lineWidth = 3; 
}
function text5_onclick() { 
  ctx.lineWidth = 5; 
}
function text10_onclick() { 
  ctx.lineWidth = 10; 
}
function text30_onclick() { 
  ctx.lineWidth = 30; 
}
function text99_onclick() { 
  ctx.lineWidth = 99; 
}
function Button1_onclick() {
  location.reload(); 
}
function loadFile(input){
  var file = input.files[0];
  var src = URL.createObjectURL(file);
  var img = new Image();
  img.src = src;
  img.onload=function(){
    ctx.drawImage(this, 0, 0, 800, 500);
  }
}
function download(){ 
  var link = document.getElementById("download");
  link.download = "your_image.jpg";
  link.href = art.toDataURL("your_image/jpeg");
  link.click();
}


