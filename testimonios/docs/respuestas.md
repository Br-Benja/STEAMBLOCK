# Respuestas a las preguntas de la guía

> Borrador de estudio. La explicación es **individual**: cada integrante debe poder decirlo con sus palabras
> señalando su propio código.

## Sección 3 · Comprobación previa

- **Objeto vs. arreglo de objetos.** Un objeto (`{ id: 1, nombre: 'Ana' }`) agrupa campos de *un* registro
  y se accede por nombre (`persona.nombre`). Un arreglo (`[persona, ...]`) es una lista ordenada de registros
  y se accede por posición (`personas[0]`).
- **Qué exporta `data.js` y qué recibe un import.** `data.js` exporta por defecto el arreglo `testimonios`.
  `import testimonios from './data.js'` recibe ese mismo arreglo; el nombre local puede elegirse porque es exportación por defecto.
- **Por qué `nombre` va entre llaves en JSX.** Las llaves indican "evalúa esta expresión de JavaScript".
  Sin llaves se mostraría el texto literal `nombre`.
- **Qué pasa al pasar otro nombre al mismo componente.** `<Saludo nombre="Luis" />` muestra "Hola, Luis":
  la misma función produce otra salida porque cambió la prop.

## Sección 7 · Detente y explica

- **¿Qué archivo contiene la tarjeta y cuál objeto se muestra?** `src/components/Testimonial.jsx`;
  en la versión estática se muestra `testimonios[0]` (Ana Pérez).
- **¿Qué recibe `item` y por qué el hijo no importa `data.js`?** Recibe un solo objeto testimonio.
  El hijo no decide qué persona mostrar; eso lo decide `App`, que es quien importa los datos y se los pasa por props.
- **Diferencia entre `main.jsx` y `App.jsx`.** `main.jsx` es el punto de entrada: conecta React con `#root`
  y monta `App` una vez. `App.jsx` es el componente raíz de la interfaz: datos, estado y composición de hijos.
- **¿Qué copiarías sin `Testimonial`?** Todo el bloque `<article>` con imagen, `h2`, cargo y `blockquote`
  en cada lugar donde se mostrara una tarjeta; cualquier cambio habría que repetirlo en cada copia.

## Sección 10 · Evidencias de comprensión

- **Qué baja de App a cada hijo.**
  - `App → Testimonial`: `item` = `testimonios[index]` (un objeto con nombre, cargo, texto y foto).
  - `App → Controls`: `onPrev`, `onNext`, `onRandom` (funciones).
- **Recorrido clic → callback → setIndex → renderizado → DOM.** El usuario hace clic en "Siguiente";
  el botón ejecuta `onNext`, que es la función `next` de `App`; `next` llama `setIndex(actual => (actual + 1) % total)`;
  React programa un nuevo renderizado y ejecuta `App` con el nuevo `index`; `App` pasa otro `item` a `Testimonial`;
  React compara y confirma en el DOM solo lo que cambió (texto, foto, contador).
- **Por qué no `testimonios[index + 1]` sin controlar el límite.** En el último registro `index + 1` vale `total`,
  que no existe: el resultado sería `undefined` y `Testimonial` fallaría al desestructurar `item`.
  Con `% total` el índice vuelve a 0.
- **Un error encontrado y cómo se comprobó.** El botón Pausar/Reanudar quedaba pegado a los controles.
  Se agregó la clase `autoplay-toggle` con `margin-top: 10px`, se tomó una nueva captura y se repitieron A01–A07.

## Sección 11 · Preguntas individuales

- **¿Por qué el temporizador va en un efecto y el clic en un evento?** El clic es una acción concreta del usuario:
  se responde en el momento en que ocurre. El temporizador es una sincronización con un sistema externo
  (el reloj del navegador) que debe existir *mientras* se cumpla una condición (`reproduciendo` y `total ≥ 2`);
  eso es justo lo que describe `useEffect`.
- **¿Qué problema evita `clearInterval`?** Que se acumulen intervalos: sin limpieza, cada vez que se reanuda
  (o StrictMode vuelve a montar el efecto) se crearía otro intervalo y el carrusel avanzaría cada vez más rápido,
  además de seguir corriendo con el componente desmontado.
- **¿Por qué no existe un Hook llamado `render`?** Renderizar no es algo que el componente "pida":
  React llama a la función del componente cuando cambia su estado o sus props. El componente solo devuelve JSX;
  `createRoot(...).render(<App />)` es un método de la raíz para el montaje inicial, no un Hook.
- **¿Qué cambiaría si el arreglo llegara de una API?** Los datos pasarían a ser estado (`useState`) que empieza vacío,
  se cargarían en un efecto con `fetch`, habría que mostrar estados de *cargando* y *error*, y si el arreglo cambia
  de tamaño habría que asegurar que `index` siga siendo válido (por ejemplo, volver a 0). La dependencia `total`
  del efecto ya permitiría resincronizar el autoplay.

## Sección 12 · Reflexión individual breve

- **Qué reutilicé.** `Testimonial` se usa para cualquier persona: en el experimento se pusieron tres tarjetas
  con `<Testimonial item={...} />` y un solo cambio en `.testimonial-card` (borde izquierdo) se vio en las tres.
- **Comparación con actualizar el DOM a mano.** Con JavaScript puro habría que buscar cada nodo
  (`querySelector`) y cambiar `src`, `alt`, nombre, cargo, texto y contador en cada clic, y no olvidar ninguno.
  En React describo la interfaz en función de `index` y React calcula qué nodos cambian.
- **Qué depende de mi diseño y qué aporta React.** Mío: separar datos, presentación y coordinación, decidir
  que el estado viva en `App` y nombrar las props. React aporta el modelo de componentes, props, estado,
  el renderizado y la confirmación de cambios en el DOM.
- **Una dificultad o costo de React en una app pequeña.** Requiere Node, npm, Vite, un paso de compilación
  y aprender JSX y Hooks; una página estática con tres testimonios podría resolverse solo con HTML, CSS y JS.
- **Algo que todavía no comprendo (ejemplo).** ¿Cómo decide React exactamente qué nodos del DOM reutilizar
  cuando cambia una lista renderizada con `map`, y por qué la `key` debe ser estable?
