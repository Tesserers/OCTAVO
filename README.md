# Octavo web

Rediseño de [mioctavo.com](https://www.mioctavo.com). Copia de trabajo privada.

HTML, CSS y JavaScript sin frameworks ni dependencias. Se publica tal cual en Netlify.

## Arrancar en local

Necesitas Node 18 o superior.

```bash
npm run assets   # descarga una vez el logo y las fotos reales a assets/img/
npm run dev      # http://localhost:5173
```

## Estructura

```
index.html          Portada: casas, cómo funciona, calendario, calculadora, modelo, preguntas, contacto
legal.html          Textos legales (faltan los datos de la sociedad, marcados en rojo)
404.html
css/
  tokens.css        Colores, tipografía, espacios. Todo sale de aquí.
  base.css          Reset, tipografía, botones, controles
  sections.css      Cada bloque de la página, en orden
js/
  data.js           Casas, zonas y preguntas. El contenido se edita aquí.
  allocation.js     Reparto de semanas por rondas (el mismo que describe el pacto de socios)
  main.js           Interacción: menú, año del hero, calendario, calculadora, preguntas, formulario
scripts/
  fetch-assets.mjs  Descarga de imágenes desde la web actual
  serve.mjs         Servidor local sin dependencias
docs/
  AUDITORIA.md      Lo que está mal en la web actual y cómo se ha resuelto
```

## Reglas de diseño

- **El terracota solo marca lo tuyo**: tus semanas, tu octavo, tu precio. Nada más lleva ese color.
- Archivo para todo el texto, con el eje de anchura algo expandido en titulares. Instrument Serif solo para cifras.
- Nada de etiquetas en mayúsculas sobre los títulos, separadores con punto medio, guiones largos ni flechas en botones.
- Una sola animación automática: el año del hero se reparte en el orden real de las rondas al cargar.
- Las fotos van rectas; los controles, redondeados.

## Formularios

El formulario de contacto usa Netlify Forms (`data-netlify="true"`). En local no envía; publicado, llega al panel de formularios de Netlify.

## Subir a GitHub

El repo es `Tesserers/OCTAVO`. Ponlo en **privado** antes del primer push.

```bash
git remote add origin https://github.com/Tesserers/OCTAVO.git
git push -u origin main
```
