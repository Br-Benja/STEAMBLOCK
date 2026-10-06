// ==========================================================
// Reto: Calculadora de MCM (Andrés)
// ==========================================================

function mcm(a, b) {
  let mul = Math.max(a, b);
  let inc = mul;
  while (mul % a !== 0 || mul % b !== 0) {
    mul += inc;
  }
  return mul;
}

// Conectar con el HTML usando los IDs
const input1 = document.getElementById('andres-num1');
const input2 = document.getElementById('andres-num2');
const boton = document.getElementById('andres-btn');
const resultadoTexto = document.getElementById('andres-resultado');

// Eventos
boton.addEventListener('click', function() {
  
  let numA = parseInt(input1.value);
  let numB = parseInt(input2.value);
  let resultadoMCM = mcm(numA, numB);
  resultadoTexto.textContent = resultadoMCM;
});
