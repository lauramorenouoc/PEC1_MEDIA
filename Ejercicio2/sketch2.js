//ejercicio 2 - laura moreno
//este programa muestra una imagen y permite cambiarla con cuatro filtros

let img;
let resultado;

//cargo la imagen antes de empezar
function preload() {
  img = loadImage('imagen.png');
}

//creo el lienzo y escribo las instrucciones en la página
function setup() {
  pixelDensity(1);
  let lienzo = createCanvas(img.width, img.height);
  lienzo.parent('lienzo');
  resultado = img;
  document.getElementById('manual').textContent =
    'M: erosión | O: posterización (4) | R: binarización (130) | E: negativo | otra tecla: original';
  document.getElementById('estado').textContent = 'imagen original';
  noLoop();
}

//dibujo una sola imagen sobre el lienzo
function draw() {
  image(resultado, 0, 0);
}

//compruebo qué tecla se ha pulsado y elijo el filtro
function keyPressed() {
  //hago una copia para no aplicar un filtro sobre otro filtro anterior
  resultado = img.get();
  let nombre = 'imagen original';
  let letra = key.toLowerCase();

  if (letra === 'm') {
    resultado.filter(ERODE);
    nombre = 'erosión';
  } else if (letra === 'o') {
    resultado.filter(POSTERIZE, 4);
    nombre = 'posterización';
  } else if (letra === 'r') {
    resultado.filter(THRESHOLD, 130 / 255);
    nombre = 'binarización';
  } else if (letra === 'e') {
    resultado.filter(INVERT);
    nombre = 'negativo';
  } else {
    //si no es ninguna de las cuatro teclas, recupero la original
    resultado = img;
  }

  //actualizo el texto y vuelvo a dibujar la imagen
  document.getElementById('estado').textContent = nombre;
  redraw();
  return false;
}
