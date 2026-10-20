//Ejercicio 2 - Laura Moreno

//Este programa muestra una imagen y permite cambiarla con cuatro filtros

let img;
let resultado;

//Cargo la imagen antes de empezar.
function preload() {
  img = loadImage('imagen.png');
}

//Creo el lienzo y escribo las instrucciones en la página.
function setup() {
  pixelDensity(1); //Fijo la densidad de píxeles para trabajar con las dimensiones reales de la imagen
  let lienzo = createCanvas(img.width, img.height);
  lienzo.parent('lienzo');
  resultado = img;
  document.getElementById('manual').textContent =
    'M: erosión | O: posterización (4) | R: binarización (130) | E: negativo | Otra tecla: original';
  document.getElementById('estado').textContent = 'imagen original';
  noLoop(); //Evitar que la imagen se dibuje continuamente, ya que solo cambia al pulsar una tecla
}

//Se dibuja una sola imagen sobre el lienzo.
function draw() {
  image(resultado, 0, 0); //Coloco la imagen seleccionada desde la esquina superior izquierda del lienzo
}

//Se comprueba qué tecla se ha pulsado y se elige el filtro.
function keyPressed() {
  //Hago una copia para no aplicar un filtro sobre otro filtro anterior, que salga uno cada vez.
  resultado = img.get(); //Se hace copia de la imagen original para aplicar cada filtro por separado
  let nombre = 'imagen original';
  let letra = key.toLowerCase(); //La tecla se convierte en minúscula para reconocerla independientemente de cómo se escriba

  if (letra === 'm') {
    resultado.filter(ERODE); //Aplico la erosión para reducir las zonas claras y los detalles pequeños
    nombre = 'erosión';
  } else if (letra === 'o') {
    resultado.filter(POSTERIZE, 4); //Se reducen los niveles de color para crear una imagen con menos tonos
    nombre = 'posterización';
  } else if (letra === 'r') {
    resultado.filter(THRESHOLD, 130 / 255); //Imagen se convierte en blanco y negro usando un umbral de 130 sobre 255
    nombre = 'binarización';
  } else if (letra === 'e') {
    resultado.filter(INVERT); //Invierto los valores de los colores para obtener el negativo de la imagen
    nombre = 'negativo';
  } else {
    //Si no es ninguna de las cuatro teclas, se recupera la original
    resultado = img;
  }

  //Actualizar el texto y volver a dibujar la imagen
  document.getElementById('estado').textContent = nombre; //Se muestra el nombre del filtro aplicado en la página
  redraw(); //Actualizo el lienzo para mostrar el resultado sin ejecutar draw de manera continua
  return false; //Se evita el comportamiento predeterminado de la tecla cuando corresponda
}
