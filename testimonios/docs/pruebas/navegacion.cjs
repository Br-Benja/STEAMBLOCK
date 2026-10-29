// Pruebas de navegación sobre la versión final (8 registros).
// Uso: npm run dev (en otra terminal) y después: node docs/pruebas/navegacion.cjs [url]
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
  const errores = [];
  p.on('pageerror', e => errores.push(e.message));
  p.on('console', m => { if (m.type() === 'error') errores.push(m.text()); });
  await p.goto(url);

  // Si la tarjeta desaparece (página en blanco), se obtiene null y la prueba falla.
  const leer = selector => p.locator(selector).textContent({ timeout: 2000 }).catch(() => null);
  const nombre = () => leer('h2');
  const contador = () => leer('.counter');
  const clic = texto => p.getByRole('button', { name: texto, exact: true })
    .click({ timeout: 2000 }).catch(() => {});

  comprobar('P01 inicio muestra Ana', await nombre(), 'Ana Pérez');
  comprobar('P01 inicio muestra 1 de 8', await contador(), 'Testimonio 1 de 8');
  await clic('Siguiente');
  comprobar('P02 Siguiente muestra Luis', await nombre(), 'Luis García');
  comprobar('P02 Siguiente muestra 2 de 8', await contador(), 'Testimonio 2 de 8');
  await clic('Anterior');
  await clic('Anterior');
  comprobar('P04 Anterior desde Ana muestra el último', await contador(), 'Testimonio 8 de 8');
  await clic('Siguiente');
  comprobar('P03 Siguiente desde el último muestra Ana', await nombre(), 'Ana Pérez');

  let repetidos = 0;
  for (let i = 0; i < 10; i++) {
    const antes = await nombre();
    await clic('Aleatorio');
    if ((await nombre()) === antes) repetidos++;
  }
  comprobar('P05 Aleatorio cambia en 10 de 10 intentos', repetidos, 0);

  const vistos = new Set();
  for (let i = 0; i < 8; i++) {
    vistos.add(await nombre());
    await clic('Siguiente');
  }
  comprobar('P08 se recorren 8 testimonios distintos', vistos.size, 8);

  for (const ancho of [320, 768, 1280]) {
    await p.setViewportSize({ width: ancho, height: 800 });
    const desborda = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    comprobar(`P09 sin desplazamiento horizontal a ${ancho} px`, desborda, false);
  }
  comprobar('P10 consola sin errores de aplicación', errores.length, 0);

  console.log(fallos === 0 ? '\nTodas las pruebas pasaron' : `\n${fallos} prueba(s) fallaron`);
  await navegador.close();
  process.exitCode = fallos === 0 ? 0 : 1;
})();
