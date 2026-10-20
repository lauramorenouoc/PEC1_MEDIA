//Ejercicio 3 - Laura Moreno
//con la L detecto los bordes de la imagen y con la M los realzo

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

  //La primera matriz detecta los contornos y la segunda aumenta su intensidad
  bordes = aplicarMatriz([0, -1, 0, -1, 4, -1, 0, -1, 0]);
  realzada = aplicarMatriz([0, -1, 0, -1, 5, -1, 0, -1, 0]);
  resultado = img;
  document.getElementById('manual').textContent =
    'Mantener L: detectar contornos | Mantener M: realzar contornos | Soltar: original';
  document.getElementById('estado').textContent = 'imagen original';
  noLoop();
}

//Laa imagen que toca en cada momento
function draw() {
  image(resultado, 0, 0);
}

//Matriz de 3 por 3 sobre cada píxel de la imagen original
function aplicarMatriz(matriz) {
  let salida = createImage(img.width, img.height);
  img.loadPixels();
  salida.loadPixels();

  //recorre la imagen por filas y columnas
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let colores = [0, 0, 0];

      //Se acumulan por separado los valores de rojo, verde y azul para calcular el nuevo color del píxel

      //Miro el píxel y sus ocho vecinos
      for (let fila = -1; fila <= 1; fila++) {
        for (let columna = -1; columna <= 1; columna++) {
          //en los bordes uso el píxel más cercano de la imagen
          let px = constrain(x + columna, 0, img.width - 1);
          let py = constrain(y + fila, 0, img.height - 1);

          //Cada píxel ocupa cuatro posiciones en el array: rojo, verde, azul y transparencia
          let posicion = (py * img.width + px) * 4;
          let valor = matriz[(fila + 1) * 3 + columna + 1];

          //Multiplico cada color por el número de la matriz
          for (let canal = 0; canal < 3; canal++) {
            colores[canal] += img.pixels[posicion + canal] * valor;
          }
        }
      }

      // Se guarda resultado limitando los colores entre 0 y 255
      let destino = (y * img.width + x) * 4;

      //Guardo los tres canales de color calculados y mantengo la transparencia de la imagen original
      for (let canal = 0; canal < 3; canal++) {
        salida.pixels[destino + canal] = constrain(colores[canal], 0, 255);
      }
      salida.pixels[destino + 3] = img.pixels[destino + 3];
    }
  }

  //Se actualizan los píxeles para aplicar los cambios realizados en el array a la imagen
  salida.updatePixels();
  return salida;
}

//Se guarda la tecla que se manteniene pulsada
function keyPressed() {
  //Se pasa la tecla a minúscula para reconocerla independientemente de cómo se escriba
  if (key.toLowerCase() === 'l') teclaL = true;
  if (key.toLowerCase() === 'm') teclaM = true;
  actualizarImagen();
  return false;
}

//Cuando suelto una tecla desactivo ese filtro
function keyReleased() {
  if (key.toLowerCase() === 'l') teclaL = false;
  if (key.toLowerCase() === 'm') teclaM = false;
  actualizarImagen();
  return false;
}

//Elijo qué imagen mostrar según las teclas que siguen pulsadas
function actualizarImagen() {
  let nombre = 'imagen original';
  resultado = img;

  //Si ambas teclas están activadas, tiene prioridad el filtro de detección de contornos
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

//Si cambio de ventana quito los filtros para que no se queden activados
window.addEventListener('blur', function() {
  //Desactivo las teclas si la ventana pierde el foco para evitar que un filtro quede activado accidentalmente
  teclaL = false;
  teclaM = false;
  if (img && resultado) actualizarImagen();
}); 