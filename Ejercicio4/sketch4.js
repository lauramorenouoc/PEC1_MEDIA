//ejercicio 4 - laura moreno
//cada clic mueve, gira y cambia el tamaño de la imagen a la vez

let img;
let x;
let y;
let giro = 0;
let tamano = 1;

//cargo la imagen que voy a transformar
function preload() {
  img = loadImage('imagen.png');
}

//creo un lienzo grande y coloco la imagen en el centro
function setup() {
  pixelDensity(1);
  let lienzo = createCanvas(windowWidth, windowHeight - 120);
  lienzo.parent('lienzo');
  imageMode(CENTER);
  x = width / 2;
  y = height / 2;
  document.getElementById('manual').textContent =
    'haz clic en la página para cambiar posición, giro (0 a 360 grados) y tamaño (0,5 a 2 veces)';
  document.getElementById('estado').textContent = 'imagen original';
  noLoop();

  //escucho los clics de toda la página y no solo los del lienzo
  document.addEventListener('click', cambiarImagen);
}

//dibujo una sola imagen aplicando las tres transformaciones
function draw() {
  background(25);
  push();
  translate(x, y);
  rotate(giro);
  scale(tamano);
  image(img, 0, 0);
  pop();
}

//genero nuevos valores aleatorios cada vez que hago clic
function cambiarImagen() {
  x = random(0, width);
  y = random(0, height);
  giro = random(0, TWO_PI);
  tamano = random(0.5, 2);
  document.getElementById('estado').textContent =
    'giro: ' + round(degrees(giro)) + ' grados | tamaño: ' + nf(tamano, 1, 2);
  redraw();
}

//adapto el lienzo si cambia el tamaño de la ventana
function windowResized() {
  resizeCanvas(windowWidth, max(300, windowHeight - 120));
  redraw();
}
