function splitFrase2(frase, ancho) {
  const palabras = frase.split(' ');

  return palabras.reduce((lineas, palabra) => {
    // Si el arreglo de líneas está vacío, iniciamos con la primera palabra
    if (lineas.length === 0) {
      lineas.push(palabra);
    } else {
      const ultimaLinea = lineas[lineas.length - 1];
      
      // Comprobamos si la última línea + espacio + nueva palabra cabe en el ancho máximo
      if (ultimaLinea.length + 1 + palabra.length <= ancho) {
        lineas[lineas.length - 1] += ' ' + palabra;
      } else {
        lineas.push(palabra); // Si no cabe, creamos una nueva línea
      }
    }
    return lineas;
  }, []);
}

// Prueba del ejercicio
const frase = "Hoy es un día de suerte para todos";
const resultado = splitFrase2(frase, 7);

console.log(resultado);
// Salida esperada: ['Hoy es', 'un día', 'de', 'suerte', 'para', 'todos']
