# Checkpoint antes de Jest y del ToDo

**1. ¿Por qué `porcentaje.js` y `probarPorcentaje.js` están separados?**
Para separar el código que hace el trabajo (la función) del código que lo comprueba. Así la función se puede reutilizar en cualquier parte y las pruebas se pueden cambiar o ampliar sin tocar la lógica.

**2. ¿Qué hace `module.exports`?**
Hace pública la función `calcularDescuento` para que otros archivos del proyecto puedan importarla. La función sigue viviendo en `porcentaje.js`; no se copia.

**3. ¿Qué hace `require("./porcentaje")`?**
Carga lo que `porcentaje.js` exportó. El `./` indica "en esta misma carpeta" y Node agrega la extensión `.js` automáticamente.

**4. ¿Cuál es la diferencia entre ejecutar la función y comprobarla?**
Ejecutarla sólo produce un resultado (por ejemplo, imprime `90`) y una persona tiene que mirarlo. Comprobarla significa comparar ese resultado con un valor esperado y que el programa decida por sí mismo si pasó o falló.

**5. ¿Por qué `/10` fue un error lógico que Node no reportó?**
Porque `precio * porcentaje / 10` es una expresión válida en JavaScript: no hay error de sintaxis ni de ejecución. El programa corre, pero la fórmula ya no calcula un porcentaje, así que los resultados (0, -300, -900) son incorrectos. Sólo una comprobación contra valores esperados lo detecta.

**6. ¿Qué trabajo realizará Jest que hoy realiza `comprobar()`?**
Comparar lo obtenido con lo esperado (`expect(obtenido).toBe(esperado)`) y reportar PASS/FAIL, además de buscar los archivos de prueba, agruparlos, contar cuántos pasan o fallan y mostrar reportes detallados con `npm test`.
