//ejercicio 3 - laura moreno
//con la l detecto los bordes y con la m los realzo

let img;
let bordes;
let realzada;
let resultado;
let teclaL = false;
let teclaM = false;

//cargo la imagen original
function preload() {
  img = loadImage('imagen.png');
}

//creo el lienzo y calculo las dos imágenes filtradas una sola vez
function setup() {
  pixelDensity(1);
  let lienzo = createCanvas(img.width, img.height);
  lienzo.parent('lienzo');
  bordes = aplicarMatriz([0, -1, 0, -1, 4, -1, 0, -1, 0]);
  realzada = aplicarMatriz([0, -1, 0, -1, 5, -1, 0, -1, 0]);
  resultado = img;
  document.getElementById('manual').textContent =
    'mantener L: detectar contornos | mantener M: realzar contornos | soltar: original';
  document.getElementById('estado').textContent = 'imagen original';
  noLoop();
}

//dibujo la imagen que toca en cada momento
function draw() {
  image(resultado, 0, 0);
}

//aplico una matriz de 3 por 3 sobre cada píxel de la imagen original
function aplicarMatriz(matriz) {
  let salida = createImage(img.width, img.height);
  img.loadPixels();
  salida.loadPixels();

  //recorro la imagen por filas y columnas
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let colores = [0, 0, 0];

      //miro el píxel y sus ocho vecinos
      for (let fila = -1; fila <= 1; fila++) {
        for (let columna = -1; columna <= 1; columna++) {
          //en los bordes uso el píxel más cercano de la imagen
          let px = constrain(x + columna, 0, img.width - 1);
          let py = constrain(y + fila, 0, img.height - 1);
          let posicion = (py * img.width + px) * 4;
          let valor = matriz[(fila + 1) * 3 + columna + 1];

          //multiplico cada color por el número de la matriz
          for (let canal = 0; canal < 3; canal++) {
            colores[canal] += img.pixels[posicion + canal] * valor;
          }
        }
      }

      //guardo el resultado limitando los colores entre 0 y 255
      let destino = (y * img.width + x) * 4;
      for (let canal = 0; canal < 3; canal++) {
        salida.pixels[destino + canal] = constrain(colores[canal], 0, 255);
      }
      salida.pixels[destino + 3] = img.pixels[destino + 3];
    }
  }

  salida.updatePixels();
  return salida;
}

//guardo qué tecla estoy manteniendo pulsada
function keyPressed() {
  if (key.toLowerCase() === 'l') teclaL = true;
  if (key.toLowerCase() === 'm') teclaM = true;
  actualizarImagen();
  return false;
}

//cuando suelto una tecla desactivo ese filtro
function keyReleased() {
  if (key.toLowerCase() === 'l') teclaL = false;
  if (key.toLowerCase() === 'm') teclaM = false;
  actualizarImagen();
  return false;
}

//elijo qué imagen mostrar según las teclas que siguen pulsadas
function actualizarImagen() {
  let nombre = 'imagen original';
  resultado = img;
  if (teclaL) {
    resultado = bordes;
    nombre = 'detección de contornos';
  } else if (teclaM) {
    resultado = realzada;
    nombre = 'realce de contornos';
  }
  document.getElementById('estado').textContent = nombre;
  redraw();
}

//si cambio de ventana quito los filtros para que no se queden activados
window.addEventListener('blur', function() {
  teclaL = false;
  teclaM = false;
  if (img && resultado) actualizarImagen();
});
