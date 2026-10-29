// Pruebas A01–A07 de la reproducción automática. Usa un reloj simulado
// para adelantar el tiempo y cuenta los intervalos de 5 s activos.
// Uso: npm run dev (en otra terminal) y después: node docs/pruebas/autoplay.cjs [url]
const { chromium } = require('playwright');
const url = process.argv[2] || 'http://localhost:5173';

let fallos = 0;
function comprobar(descripcion, obtenido, esperado) {
  if (obtenido === esperado) {
    console.log(`✓ ${descripcion}`);
  } else {
    fallos++;
    console.log(`✗ ${descripcion} | esperado: ${esperado}, obtenido: ${obtenido}`);
  }
}

(async () => {
  const navegador = await chromium.launch();
  const p = await navegador.newPage();
  await p.clock.install();
  await p.addInitScript(() => {
    window.__activos = new Set();
    const crear = window.setInterval, limpiar = window.clearInterval;
    window.setInterval = (fn, ms, ...args) => {
      const id = crear(fn, ms, ...args);
      if (ms === 5000) window.__activos.add(id);
      return id;
    };
    window.clearInterval = id => { window.__activos.delete(id); return limpiar(id); };
  });
  await p.goto(url);

  const contador = () => p.locator('.counter').textContent();
  const intervalos = () => p.evaluate(() => window.__activos.size);
  const boton = texto => p.getByRole('button', { name: texto, exact: true });
  const esperar = ms => p.clock.runFor(ms);

  await esperar(6000);
  comprobar('Inicia pausado: no avanza sin Reanudar', await contador(), 'Testimonio 1 de 8');

  await boton('Reanudar').click();
  await esperar(5000);
  comprobar('A01 Reanudar avanza a los 5 s', await contador(), 'Testimonio 2 de 8');
  await esperar(5000);
  comprobar('A01 segundo avance a los 10 s', await contador(), 'Testimonio 3 de 8');

  await boton('Pausar').click();
  await esperar(12000);
  comprobar('A02 Pausar mantiene la tarjeta 12 s', await contador(), 'Testimonio 3 de 8');

  await boton('Reanudar').click();
  await boton('Siguiente').click();
  await esperar(12000);
  comprobar('A03 Siguiente cambia la tarjeta y pausa', await contador(), 'Testimonio 4 de 8');
  comprobar('A03 el botón vuelve a decir Reanudar', await boton('Reanudar').count(), 1);

  for (let i = 0; i < 6; i++) await boton(i % 2 ? 'Pausar' : 'Reanudar').click();
  comprobar('A07 tras alternar 6 veces no quedan intervalos', await intervalos(), 0);

  await boton('Reanudar').click();
  comprobar('A07 al reproducir solo existe 1 intervalo', await intervalos(), 1);
  await esperar(5000);
  comprobar('A04 reanudar avanza sin acelerar (5 s)', await contador(), 'Testimonio 5 de 8');
  await esperar(4900);
  comprobar('A04 no hay avance antes de 5 s', await contador(), 'Testimonio 5 de 8');
  await esperar(100);

  await boton('Pausar').click();
  while ((await contador()) !== 'Testimonio 8 de 8') await boton('Siguiente').click();
  await boton('Reanudar').click();
  await esperar(5000);
  comprobar('A05 el último vuelve al primero', await contador(), 'Testimonio 1 de 8');

  console.log(fallos === 0 ? '\nTodas las pruebas pasaron' : `\n${fallos} prueba(s) fallaron`);
  await navegador.close();
  process.exitCode = fallos === 0 ? 0 : 1;
})();
