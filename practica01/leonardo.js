// ==========================================================
// Reto: Partir frase por ancho máximo (Leonardo)
// ==========================================================

function splitFrase2(frase, ancho) {  
  let palabras = frase.split(' ');
  return palabras.reduce((pal, act) => { 
    if (pal.length === 0) { 
      pal[0] = act;
    } else {
      if (pal[pal.length - 1].length + 1 + act.length <= ancho) {          
        pal[pal.length - 1] += ' ' + act;
      } else {
        pal.push(act);          
      }
    }
    return pal;
  }, []);
}

function ejecutarRetoLeonardo() {
  const frase = document.getElementById('frase-leo').value;
  const ancho = parseInt(document.getElementById('ancho-leo').value, 10);
  
  if (!frase.trim() || isNaN(ancho) || ancho <= 0) {
    document.getElementById('resultado-leo').innerText = "Por favor ingresa una frase y un ancho válido.";
    return;
  }

  const segmentos = splitFrase2(frase, ancho);
  document.getElementById('resultado-leo').innerHTML = 
    "<strong>Arreglo obtenido:</strong><br>[" + 
    segmentos.map(s => `'${s}'`).join(', ') + 
    "]";
}
