//Ejercicio 4 - Laura Moreno

//Cada clic mueve, gira y cambia el tamaño de la imagen a la vez

let img;
let x;
let y;
let giro = 0;
let tamano = 1;

//para cargar la imagen generada con la IA
function preload() {
  img = loadImage('imagen.png');
}

//Se crea el lienzo grande para colocar la imagen en el centro
function setup() {
  pixelDensity(1); //Fija la densidad de píxeles para evitar diferencias de resolución
  let lienzo = createCanvas(windowWidth, windowHeight - 120);
  lienzo.parent('lienzo');
  imageMode(CENTER); //Hace que la imagen se dibuje tomando su centro como referencia
  x = width / 2;
  y = height / 2;
  document.getElementById('manual').textContent =
    'Haz clic en la página para cambiar posición, giro (0 a 360 grados) y tamaño (0,5 a 2 veces)';
  document.getElementById('estado').textContent = 'Imagen original';
  noLoop(); //Evita que draw se ejecute continuamente 

  //Detecta los clics de toda la página entera y no solo los del lienzo
  document.addEventListener('click', cambiarImagen);
}

//Se dibuja solo una imagen aplicando las tres transformaciones
function draw() {
  background(25);
  push(); //Guarda el sistema de coordenadas y las transformaciones actuales
  translate(x, y);
  rotate(giro);
  scale(tamano);
  image(img, 0, 0);
  pop(); //restaura el sistema de coordenadas original para evitar que las transformaciones afecten a otros dibujos
}

//Genero nuevos valores aleatorios cada vez que hago clic, tanto de posición, como de tamaño o rotación...
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
