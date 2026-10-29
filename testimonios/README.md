# Práctica inicial de React — Testimonios

TecNM Celaya · Ingeniería de Software · Unidad 3 · AGO–DIC 2026

Aplicación que muestra testimonios de uno en uno con navegación **Anterior / Siguiente / Aleatorio**
y una ampliación con **reproducción automática** (Pausar / Reanudar).
Los testimonios y fotografías son datos ficticios de demostración.

**Etapa terminada:** etapa básica (P01–P10) y ampliación con reproducción automática (A01–A07).

## Integrantes

| Integrante | Rol inicial | Rol después del cambio |
| --- | --- | --- |
| _Nombre 1_ | Conductor | Observador |
| _Nombre 2_ | Observador | Conductor |

Pareja revisora: _nombres de la otra pareja_.

## Versiones

| Herramienta | Versión |
| --- | --- |
| Node.js (`node -v`) | v22.22.0 |
| npm (`npm -v`) | 10.9.4 |
| Vite | 8.3.5 |
| React / React DOM | 19.3.1 |

## Instalación y ejecución

```bash
git clone https://github.com/br-benja/steamblock.git
cd steamblock/testimonios
npm install
npm run dev        # servidor de desarrollo (abrir la dirección Local)
npm run build      # versión de producción en dist/
npm run preview    # revisar localmente la compilación
```

## Estructura

```
testimonios/
  public/                  favicon e íconos de la plantilla
  src/
    components/
      Testimonial.jsx      presenta una tarjeta (recibe item)
      Controls.jsx         botones; avisa al padre con callbacks
    App.jsx                conserva el estado (index, reproduciendo)
    main.jsx               crea la raíz de React en #root y monta App
    data.js                arreglo de 8 testimonios ficticios
    styles.css             estilos de toda la aplicación
  docs/capturas/           evidencias de pruebas
  index.html               contiene <div id="root">
  package.json             dependencias y comandos
  package-lock.json        versiones resueltas
  vite.config.js
```

Recorrido: `index.html` carga `main.jsx` → `main.jsx` crea la raíz en `#root` y monta `App`
→ `App` importa los datos y renderiza `Testimonial` y `Controls` → `styles.css` se importa una vez en `main.jsx`.

## Decisiones principales

- **El estado vive en App.** `index` decide qué testimonio se muestra; `Testimonial` solo presenta
  el objeto que recibe y `Controls` solo comunica intenciones (`onPrev`, `onNext`, `onRandom`).
- **Datos separados en `data.js`.** Agregar un testimonio no obliga a tocar componentes.
- **Operador `%` para los extremos.** `(actual + 1) % total` regresa del último al primero;
  en `prev` se suma `total` para no obtener un índice negativo.
- **Aleatorio sin repetir.** Se elige un salto entre 1 y `total − 1`, así nunca cae en el actual.
- **Arreglo vacío.** Si `total === 0` se muestra un mensaje y no se accede a campos de un objeto inexistente.
- **Se eliminaron `App.css`, `index.css` y `src/assets`** de la plantilla; se usa solo `styles.css`.
- **Autoplay con `useEffect`** y limpieza con `clearInterval`; inicia pausado para permitir leer.
  Se retiró `aria-live` del contador para evitar anuncios repetitivos cada cinco segundos.
- **Fotos remotas (pravatar.cc).** Dependen de conexión; `width` y `height` reservan el espacio mientras cargan.

## Registro de pruebas — etapa básica

Pruebas P01–P07 con los 3 registros iniciales; P08–P10 con los 8 registros.
P06 y P07 se hicieron modificando `data.js` temporalmente y restaurándolo después.

| Prueba | Acción y resultado esperado | Resultado obtenido | Estado |
| --- | --- | --- | --- |
| P01 Inicio | Se muestra Ana y la posición 1 de 3 | Ana Pérez, "Testimonio 1 de 3" | Aprobada |
| P02 Siguiente | Desde Ana, Siguiente muestra Luis y 2 de 3 | Luis García, "Testimonio 2 de 3" | Aprobada |
| P03 Límite superior | Desde María, Siguiente muestra Ana | Ana Pérez, "1 de 3" | Aprobada |
| P04 Límite inferior | Desde Ana, Anterior muestra María | María López, "3 de 3" | Aprobada |
| P05 Aleatorio | Cambia a otra posición válida (10 veces) | 10/10 cambios a un registro distinto; la lógica `1 + floor(random·(total−1))` garantiza que el salto nunca es 0 | Aprobada |
| P06 Un registro | Los controles mantienen el registro sin errores | Anterior, Siguiente y Aleatorio dejan "1 de 1"; consola sin errores | Aprobada |
| P07 Sin registros | Aparece el mensaje y no hay controles | "No hay testimonios disponibles."; 0 botones | Aprobada |
| P08 Ampliación de datos | Navegación completa y contador de ocho | 8 testimonios distintos; tras el 8 regresa a Ana "1 de 8" | Aprobada |
| P09 Presentación | Tres anchos, textos largos y teclado | Sin desplazamiento horizontal en 320, 768 y 1280 px; el texto largo (Sofía) se ajusta; Tab recorre Anterior → Siguiente → Aleatorio; Enter y Espacio activan; foco visible de 3 px | Aprobada |
| P10 Compilación | `npm run build` sin errores de aplicación | Compilación correcta; consola sin errores | Aprobada |

Capturas: [320 px](docs/capturas/p09-320px.png) · [768 px](docs/capturas/p09-768px.png) ·
[1280 px](docs/capturas/p09-1280px.png) · [foco con teclado](docs/capturas/p09-foco-teclado.png)

## Registro de pruebas — reproducción automática

| Prueba | Resultado esperado | Resultado obtenido | Estado |
| --- | --- | --- | --- |
| A01 Activación | Reanudar inicia avances cada ~5 s | 1 → 2 → 3 → 4, un avance cada 5 s; sin Reanudar no avanza | Aprobada |
| A02 Pausa | Pausar mantiene el testimonio más de 5 s | Se mantuvo en 4 de 8 durante 12 s | Aprobada |
| A03 Acción manual | Anterior/Siguiente/Aleatorio cambian y dejan pausado | Siguiente pasó a 5 de 8, el botón volvió a "Reanudar" y no avanzó en 12 s | Aprobada |
| A04 Reanudación | Nuevos avances sin aceleración | Tras varias pausas: 5 → 6 → 7, uno cada 5 s | Aprobada |
| A05 Límites | El último vuelve al primero | Desde 8 de 8 avanzó a 1 de 8 | Aprobada |
| A06 Pocos datos | Con 0 o 1 registro no se crea intervalo | 1 registro: sin botón Reanudar, 0 intervalos; 0 registros: solo mensaje, 0 intervalos | Aprobada |
| A07 Limpieza | Sin intervalos acumulados al alternar | Tras 6 clics en Pausar/Reanudar: 0 intervalos activos en pausa y 1 al reproducir | Aprobada |

Captura: [autoplay activo](docs/capturas/a01-autoplay.png)

### Corrección registrada

Al agregar el botón Pausar/Reanudar quedó pegado a la fila de controles porque es un botón suelto
fuera de `.controls`. Se le agregó `className="autoplay-toggle"` y la regla
`.autoplay-toggle { margin-top: 10px; }`. Se comprobó con una nueva captura y repitiendo A01–A07.

## Experimento de reutilización

Se agregaron temporalmente dos tarjetas más con el mismo componente y se cambió **una sola regla**
de `.testimonial-card` (`border-left: 6px solid #125ca3`). Las tres tarjetas recibieron el cambio.
Después se restauró el código ([captura](docs/capturas/experimento-reutilizacion.png)).

| Cambio solicitado | Lugar principal del cambio |
| --- | --- |
| Agregar un testimonio | `data.js` |
| Modificar la tarjeta de todas las personas | `Testimonial.jsx` y sus estilos |
| Cambiar los textos de los controles | `Controls.jsx` |
| Cambiar el comportamiento de navegación | `App.jsx` |
| Modificar apariencia sin cambiar navegación | `styles.css` |

## Cómo funciona `useEffect` en la ampliación

El temporizador es un sistema externo al cálculo del JSX. El efecto lo crea solo cuando
`reproduciendo` es verdadero y hay al menos dos registros. La función que regresa
(`() => clearInterval(intervalo)`) elimina el intervalo antes de la siguiente ejecución del efecto
y al desmontar el componente, por eso nunca se acumulan. Las dependencias `[reproduciendo, total]`
indican cuándo hay que volver a sincronizar. `setIndex(actual => ...)` usa el valor pendiente y evita
capturar un índice antiguo. En desarrollo, `StrictMode` monta, limpia y vuelve a montar el efecto;
como la limpieza es correcta, no se duplica el intervalo.

## Tablero y tareas (Scrum / XP)

| Tarea | Puntos | Responsable | Estado |
| --- | --- | --- | --- |
| Entorno (Node, Vite, proyecto) | 1 | | Terminado |
| Datos (`data.js`) | 1 | | Terminado |
| Tarjeta (`Testimonial.jsx`) | 2 | | Terminado |
| Navegación (`Controls.jsx`, estado) | 3 | | Terminado |
| Estilos y accesibilidad | 2 | | Terminado |
| Verificación P01–P10 | 2 | | Terminado |
| Ampliación autoplay y A01–A07 | 3 | | Terminado |

Revisión por otra pareja: _fecha, nombres y observaciones_.
