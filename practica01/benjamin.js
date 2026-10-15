// ==========================================================
// Reto: Filtrar tabla (Benjamin)
// Filtra las filas de la tabla mientras se escribe, en cualquier
// columna y sin distinguir mayúsculas. Todo va dentro de una función
// para que, al juntar los retos de todos, no choquen los nombres
// de las variables.
// ==========================================================

function initFiltroTabla() {
  const filtro = document.getElementById("filtro-benjamin");
  const filas = document.querySelectorAll("#tabla-benjamin tbody tr");
  const mensaje = document.getElementById("sin-resultados-benjamin");

  // Si falta algún elemento, no hacemos nada (evita errores en consola)
  if (!filtro || filas.length === 0 || !mensaje) return;

  filtro.addEventListener("input", () => {
    const texto = filtro.value.trim().toLowerCase();
    let visibles = 0;

    filas.forEach((fila) => {
      const contenido = fila.textContent.toLowerCase();
      const coincide = contenido.includes(texto);

      fila.style.display = coincide ? "" : "none";
      if (coincide) visibles++;
    });

    mensaje.style.display = visibles === 0 ? "block" : "none";
  });
}

initFiltroTabla();
