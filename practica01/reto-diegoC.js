function esAnagramaDiegoC(a, b) {
  a = a.trim().toLowerCase();
  b = b.trim().toLowerCase();
  if (a === "" || b === "") return false;   // vacías no son anagramas
  if (a === b) return false;                // iguales no son anagramas
  if (a.length !== b.length) return false;  // distinta longitud, no
  return a.split("").sort().join("") === b.split("").sort().join("");
}

document.getElementById("diegoC-boton").addEventListener("click", function () {
  const p1 = document.getElementById("diegoC-palabra1").value;
  const p2 = document.getElementById("diegoC-palabra2").value;
  const resultado = document.getElementById("diegoC-resultado");
  resultado.textContent = esAnagramaDiegoC(p1, p2)
    ? "Sí son anagramas"
    : "No son anagramas";
});