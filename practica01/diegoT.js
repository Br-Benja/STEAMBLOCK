// ==========================================================
// Reto: Frecuencia de caracteres (Diego T)
// Cuenta cuántas veces aparece cada letra o número de una frase,
// sin distinguir mayúsculas ni acentos, y los muestra ordenados.
// ==========================================================

/*El algoritmo sería:
  crear lista-de-objetos (car, veces)
  normalizar frase (todo a min, quitar acentos)
  Para cada caracter de la frase
    leer caracter
    si existe en lista-de-objetos incrementar veces
    si no existe añadir objeto con veces a 1
  ordenar lista-de-objetos
  Devolver la lista-de-objetos
*/
function normalizar(frase){
  let vocales = ['a','e','i','o','u'];
  let vocacent = ['á','é','í','ó','ú'];
  let ind, j;
  let normal = '';
  frase = frase.toLowerCase();
  for(ind = 0; ind < frase.length; ind++){
    j = vocacent.indexOf(frase[ind]);
    if(j >= 0){
      normal += vocales[j];
    }
    else{
      if((frase[ind].match(/[a-z0-9]/i)) != null){
        normal += frase[ind];
      }
    }
  }
  return normal;
}

function cuentaCars(frase){
  let lista = [];
  let ind = 0;
  frase = normalizar(frase);
  for(let c = 0; c < frase.length; c++){
    ind = lista.findIndex((v)=>v.car == frase[c]);
    if(ind >= 0){
      lista[ind].veces++;
    }
    else{
      lista.push({car: frase[c], veces: 1});
    }
  }
  lista.sort((a,b)=>(a.car > b.car)?1:-1);
  return lista;
}

document.getElementById('btn-contar-diegoT').addEventListener('click', function(){
  let frase = document.getElementById('frase-diegoT').value;
  let lista = cuentaCars(frase);
  let tabla = document.getElementById('tabla-diegoT');
  let cuerpo = tabla.querySelector('tbody');
  let sinResultados = document.getElementById('sin-resultados-diegoT');
  cuerpo.innerHTML = '';
  for(let obj of lista){
    let fila = document.createElement('tr');
    let celdaCar = document.createElement('td');
    let celdaVeces = document.createElement('td');
    celdaCar.textContent = obj.car;
    celdaVeces.textContent = obj.veces;
    fila.appendChild(celdaCar);
    fila.appendChild(celdaVeces);
    cuerpo.appendChild(fila);
  }
  tabla.style.display = (lista.length > 0) ? '' : 'none';
  sinResultados.style.display = (lista.length > 0) ? 'none' : '';
});
