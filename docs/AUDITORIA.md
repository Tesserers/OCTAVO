# Auditoría de mioctavo.com (30 de octubre de 2026)

## Urgente

- **Política de privacidad sin rellenar.** Aparece literalmente `[RAZÓN SOCIAL], S.L.`, `NIF [NIF]` y `[DOMICILIO]`. Con reservas de 500 € y datos de prevención del blanqueo, esto incumple el RGPD y la LSSI. En `legal.html` está marcado en rojo para que no se publique así.
- **El repositorio de GitHub es público.** Ponerlo en privado.
- **Cifras a cero en el HTML.** La comparativa, el ejemplo de costes y el panel de colaborador muestran "0 €" hasta que corre la animación. Google y las vistas previas ven ceros. En la nueva versión las cifras están escritas en el HTML.

## Contenido contradictorio

- Las tres casas figuran con 8 de 8 fracciones vendidas, pero su texto dice "las ocho fracciones están abiertas".
- El panel de colaborador de ejemplo da por cerradas tres operaciones, y una pregunta frecuente dice "todavía no hemos comprado la primera casa".
- El octavo de la casa tipo de 350.000 € vale 55.948 € en las preguntas frecuentes y 55.044 € en la ficha de la casa de La Ñora, que cuesta lo mismo.
- Financiación: un bloque dice "te orientamos" y las condiciones dicen "Octavo no ofrece ni gestiona financiación". Se ha unificado: orientamos, no intermediamos.
- Persona gramatical mezclada: "firmáis" (vosotros) y "te enseño la casa" (yo) en una web escrita en "nosotros" y "tú".
- "Quinientos euros" y "500 €" en el mismo bloque.

## Código

- El espacio de nombres global se llama `window.VIVERA`: restos de otro proyecto.
- Quince archivos JavaScript bloqueantes, 198 KB solo de textos en `data.js`, cargados en todas las páginas.
- Toda la web es una sola página con anclas que simulan rutas. Cada sección no tiene su URL, su título ni su descripción para buscadores.
- Bloques duplicados ("¿Quieres una casa en esta zona?" aparece dos veces en el mismo documento).
- Imagen de logo de 2200 px de ancho para mostrarse a 22 px de alto.

## Diseño

- Menú con quince entradas y otro bloque de botones en la cabecera.
- Tres botones flotantes a la vez (teléfono, WhatsApp, chat) más una barra fija abajo en móvil.
- Una foto que cambia al pasar el ratón a otra sin relación con el contenido.
- Tarjetas con los botones fuera, sombras iguales en todo, etiquetas en mayúsculas sobre cada título.
- Calendario de ejemplo plano, sin fechas ni explicación de lo que se ve.

## Qué hace la nueva versión

- Navegación de cinco entradas y un único botón de contacto.
- Un hilo conductor: el año de 52 semanas. Aparece en el hero y se convierte en el calendario interactivo, con el reparto por rondas real.
- Una sola comparativa con números escritos, en tabla.
- Casas como filas editoriales, con el estado real (8 de 8) y la acción que toca: lista de espera.
- Calculadora calibrada con los ejemplos publicados. **Pendiente**: validar la fórmula con el equipo.
- Preguntas por temas, con el contenido real resumido.
- Formulario único que se rellena solo según desde dónde se pulse.

## Pendiente

- Ficha individual de cada casa con galería, plano y presupuesto partida a partida.
- Páginas de zona y blog, con URL propia.
- Área privada (hoy es una maqueta con datos de ejemplo).
- Textos legales completos y revisados.
- Versión en inglés.
