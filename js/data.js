// Contenido real de Octavo, extraído de mioctavo.com y ordenado.
// Una sola fuente para viviendas, zonas y preguntas.

export const CONTACT = {
  phone: '685 046 871',
  phoneHref: 'tel:+34685046871',
  whatsapp: 'https://wa.me/34685046871',
  email: 'info@mioctavo.com'
};

// status: 'abierta' | 'completa' | 'estudio'
// En la web actual las tres casas figuran con 8/8 vendidas, pero su texto
// dice "las ocho fracciones están abiertas". Aquí se respeta el dato (8/8).
export const PROPERTIES = [
  {
    id: 'navahondilla',
    title: 'Villa Serrano',
    town: 'Navahondilla',
    province: 'Ávila',
    zone: 'Sierra de Gredos',
    rooms: 3, baths: 2, m2: 120, m2label: '120 m² en tres plantas',
    total: 98000, share: 18486,
    taken: 8, status: 'completa',
    cover: 'assets/img/navahondilla-01.jpg',
    photos: 13, prefix: 'navahondilla',
    summary: 'Casa de pueblo de tres plantas en el casco de Navahondilla, a una hora de Madrid. Dos terrazas, una cubierta y con vistas abiertas a la sierra.',
    note: 'El nombre está en un azulejo de la terraza, y se queda.'
  },
  {
    id: 'luanco',
    title: 'Ático con terraza',
    town: 'Luanco',
    province: 'Asturias',
    zone: 'Costa Cantábrica',
    rooms: 2, baths: 1, m2: 70, m2label: '70 m² y 100 m² de terraza al sur',
    total: 310000, share: 49044,
    taken: 8, status: 'completa',
    cover: 'assets/img/luanco-01.jpg',
    photos: 11, prefix: 'luanco',
    summary: 'Ático reformado en el centro de Luanco, a cinco minutos andando del puerto y de la playa de la Ribera. Cocina abierta y dos dormitorios exteriores.',
    note: 'La terraza se usa medio año.'
  },
  {
    id: 'luanco2',
    title: 'Planta baja con piscina',
    town: 'Luanco',
    province: 'Asturias',
    zone: 'Costa Cantábrica',
    rooms: 2, baths: 1, m2: 50, m2label: '50 m² y 50 m² de patio privado',
    total: 350000, share: 55044,
    taken: 8, status: 'completa',
    cover: 'assets/img/luanco2-01.jpg',
    photos: 15, prefix: 'luanco2',
    summary: 'Urbanización cerrada con piscina comunitaria, zona infantil y pista de pádel. Garaje y trastero. De casa a la piscina sin cruzar una carretera.',
    note: 'Pensada para ir con niños.'
  }
];

export const ZONES = [
  { name: 'Costa Cantábrica', where: 'Asturias, Cantabria y País Vasco', kind: 'Costa', img: 'assets/img/dest-costaverde.jpg', line: 'Donde empezamos. Acantilados, prados, surf y buena mesa.' },
  { name: 'Sierra de Gredos', where: 'Ávila', kind: 'Montaña', img: 'assets/img/nat-rio.jpg', line: 'Piscinas naturales y Madrid a una hora.' },
  { name: 'Rías Baixas', where: 'Pontevedra y A Coruña', kind: 'Costa', img: 'assets/img/dest-riasbaixas.jpg', line: 'Agua limpia, marisco y un verano corto pero perfecto.' },
  { name: 'Costa Brava', where: 'Girona', kind: 'Costa', img: 'assets/img/dest-costabrava.jpg', line: 'Cala, pino y roca a dos horas de Barcelona.' },
  { name: 'Pirineo', where: 'Huesca y Lleida', kind: 'Montaña', img: 'assets/img/dest-pirineos.jpg', line: 'Nieve en invierno y valles que viven todo el año.' },
  { name: 'Baleares', where: 'Mallorca, Menorca, Ibiza y Formentera', kind: 'Isla', img: 'assets/img/dest-baleares.jpg', line: 'Calas, sierra y vuelos todo el año.' }
];

export const FAQ = [
  {
    cat: 'El modelo',
    items: [
      { q: '¿En qué consiste exactamente la copropiedad de Octavo?', a: ['Cada vivienda se divide en ocho fracciones. Tú compras de una a cuatro, porque nadie puede tener más de la mitad de la casa.', 'Cada fracción da derecho a un mínimo de seis semanas de uso al año. Los gastos se reparten entre los ocho en proporción a lo que tiene cada uno.'] },
      { q: '¿Qué diferencia hay con la multipropiedad?', a: ['Con la multipropiedad no eras propietario de nada: pagabas por un derecho de uso que caducaba y que casi no se podía revender.', 'Aquí eres propietario real de una parte de una vivienda concreta, comprada ante notario en escritura pública, con capacidad de venta libre y derecho a heredarla.'] },
      { q: '¿Por qué ocho fracciones y no más o menos?', a: ['Ocho es el número donde cuadran las dos cosas que importan: que el precio de entrada baje de verdad y que sigas usando la casa lo suficiente como para que sea tuya.', 'Con más propietarios las semanas se quedan en tres o cuatro al año y la casa deja de ser una segunda residencia. Con menos, el ahorro no compensa el trabajo de coordinarse.'] },
      { q: '¿Qué es la reserva de 500 € y qué pasa si la casa no se completa?', a: ['La reserva te guarda tu octavo mientras reunimos al grupo y se descuenta del precio el día de la firma. Vale cuatro meses y se puede renovar mientras la casa siga abierta.', 'Te la devolvemos íntegra si no compramos la casa en plazo. La pierdes si, dentro del plazo, te pedimos tu parte de las arras y decides no seguir. En los catorce días siguientes a reservar puedes desistir sin dar explicaciones.'] },
      { q: '¿Y si llego cuando ya hay ocho reservas?', a: ['Entras en la lista de espera de esa casa por 100 €, que te devolvemos cuando quieras. Si alguno de los ocho no llega a firmar, eres el primero al que llamamos, por orden de llegada.'] },
      { q: '¿Puedo comprar con mi pareja, un amigo o mis hermanos?', a: ['Sí. Una fracción puede estar a nombre de varias personas, igual que una vivienda normal. Solo pedimos un interlocutor único para el calendario y las comunicaciones.'] }
    ]
  },
  {
    cat: 'Lo legal',
    items: [
      { q: '¿A nombre de quién queda la vivienda?', a: ['De una sociedad limitada creada solo para esa casa. Los copropietarios sois los socios, en proporción a vuestras fracciones.', 'Octavo no es propietaria de la vivienda. Actúa como administradora y gestora, y esa función la podéis revocar.'] },
      { q: '¿Qué pasa si Octavo desaparece o quiebra?', a: ['La vivienda no se ve afectada, porque no está en nuestro balance. Cada casa tiene su propia cuenta y su propia contabilidad. Si dejáramos de operar, podríais nombrar otro administrador y seguir funcionando.'] },
      { q: '¿Puedo ver los estatutos antes de firmar?', a: ['Sí, y te recomendamos leerlos con tu abogado. Regulan el calendario, los gastos, las mayorías, el impago, la venta y la herencia. No firmamos con nadie que no los haya tenido delante el tiempo suficiente.'] },
      { q: '¿Está esto regulado en España?', a: ['La copropiedad de inmuebles está reconocida en el Código Civil y la compraventa de participaciones sociales la regula la Ley de Sociedades de Capital. No es una figura nueva ni un vacío legal.'] }
    ]
  },
  {
    cat: 'El uso',
    items: [
      { q: '¿Cuántas semanas puedo usar al año?', a: ['Al menos seis por octavo. Se reparten cincuenta y una de las cincuenta y dos semanas; la que menos quieren los ocho se reserva para el mantenimiento de la casa.'] },
      { q: '¿Cómo se eligen las fechas?', a: ['Cada otoño los ocho ordenáis las semanas del año siguiente de la que más queréis a la que menos. Se reparten por rondas, y en cada ronda elige primero quien peor lleva el reparto hasta ese momento.', 'La primera ronda sigue un orden que rota un puesto cada año, así que en ocho años todos habéis abierto el reparto una vez. Después podéis intercambiar semanas entre vosotros.'] },
      { q: '¿Puedo prestar mis semanas o alquilarlas?', a: ['Prestarlas a familia o amigos, sí y sin coste; solo necesitamos saber quién va a estar en la casa. Alquilarlas, también, dentro del programa de alquiler y si la vivienda tiene licencia. Lo que no se puede es subarrendar por tu cuenta.'] },
      { q: '¿Puedo dejar cosas mías en la casa?', a: ['Sí. Cada vivienda tiene armarios cerrados asignados por fracción para tu ropa de cama, material deportivo o lo que necesites.'] }
    ]
  },
  {
    cat: 'El dinero',
    items: [
      { q: '¿Qué incluye el precio de la fracción?', a: ['La parte proporcional de la vivienda, los impuestos y gastos de la compra, la constitución de la sociedad y la casa amueblada y lista para usar. No hay costes que aparezcan en la firma, salvo la notaría de la escritura de tu propia fracción.'] },
      { q: '¿Qué cubre la cuota anual?', a: ['IBI, seguro, suministros, comunidad si la hay, limpieza entre estancias, mantenimiento ordinario, pequeñas reparaciones, calendario, contabilidad de la sociedad y nuestra gestión. Se calcula por vivienda, con sus gastos reales, y la ves partida a partida antes de firmar.'] },
      { q: 'Si alquilo mis semanas, ¿qué se queda Octavo?', a: ['El 20 % del ingreso bruto de cada reserva. El portal cobra aparte en torno al 15 %. El resto, alrededor del 65 %, es tuyo. Si un año no alquilas, no pagas nada.'] },
      { q: '¿Puedo financiar la compra?', a: ['La casa no se hipoteca nunca, para que la deuda de uno no ponga en riesgo la casa de ocho familias. Financiarte por tu cuenta sí funciona: préstamo personal, ampliar la hipoteca de tu vivienda habitual, una garantía sobre otro inmueble o un crédito contra tu cartera. Te orientamos sin cobrarte nada, aunque no intermediamos préstamos.'] },
      { q: '¿Hay que pagar ITP al vender mi fracción?', a: ['No. Lo que vendes son participaciones de la sociedad, y esa transmisión está exenta del impuesto de transmisiones. Quien compra tu octavo no paga ese 6 a 10 %, y eso es margen de precio para ti.'] }
    ]
  },
  {
    cat: 'La salida',
    items: [
      { q: '¿Puedo vender mi fracción cuando quiera?', a: ['Sí, al precio que decidas. Primero tiene derecho de tanteo Octavo y después el resto de copropietarios. Si nadie la quiere, la vendes libremente.'] },
      { q: '¿Octavo me recompra la fracción?', a: ['Solo en caso de impago. No garantizamos recompra en ningún otro supuesto, y desconfía de quien te la garantice. Lo que sí hacemos es ayudarte a venderla, porque tenemos la lista de gente esperando entrar en cada zona.'] },
      { q: '¿Cuánto se tarda en vender una fracción?', a: ['Todavía no tenemos histórico propio de reventas, y no vamos a inventarlo. Lo razonable es pensar en plazos parecidos a vender un inmueble: de unas semanas a varios meses.'] },
      { q: '¿Qué pasa si un copropietario deja de pagar?', a: ['Hay una cascada escrita con plazos. El fondo de reserva cubre la cuota desde el primer día, así que la casa sigue funcionando y los demás no ponen nada. Si el impago sigue, pierde el uso, sus semanas se alquilan para cubrir la deuda y, el día 90, empieza la venta de su fracción.'] }
    ]
  }
];
