export const INITIAL_SUCURSALES = [
  {
    id: 'suc-1',
    nombre: 'Palermo Central',
    direccion: 'Av. Santa Fe 3420, CABA',
    telefono: '+54 11 4512-8900',
    encargado: 'Marcelo Rossi',
    alquilerMensual: 1200000,
    diaVencimientoAlquiler: 10,
    estadoAlquiler: 'Al día',
    notas: 'Sucursal principal con zona outdoor y rack de potencia.'
  },
  {
    id: 'suc-2',
    nombre: 'Belgrano Fit',
    direccion: 'Cabildo 2150, CABA',
    telefono: '+54 11 4788-3411',
    encargado: 'Valeria Gómez',
    alquilerMensual: 950000,
    diaVencimientoAlquiler: 5,
    estadoAlquiler: 'Pendiente',
    notas: 'Especializada en clases funcionales y estudio de Pilates.'
  },
  {
    id: 'suc-3',
    nombre: 'San Isidro Training',
    direccion: 'Av. del Libertador 14200, San Isidro',
    telefono: '+54 11 4743-9922',
    encargado: 'Santiago Peralta',
    alquilerMensual: 1100000,
    diaVencimientoAlquiler: 12,
    estadoAlquiler: 'Al día',
    notas: 'Espacio de 600m² con box de Crossfit y estacionamiento.'
  }
];

export const INITIAL_ALUMNOS = [
  {
    id: 'alum-1',
    nombre: 'Camila',
    apellido: 'Fernández',
    dni: '41.238.910',
    fechaNacimiento: '1998-05-14',
    contacto: '+54 11 6123-4567',
    email: 'camila.f@gmail.com',
    sucursalId: 'suc-1',
    plan: 'Crossfit & Funcional',
    montoCuota: 35000,
    estadoCuota: 'Al día',
    fechaUltimoPago: '2026-09-02',
    fechaVencimiento: '2026-10-02',
    rutinaAsignadaId: 'rut-1'
  },
  {
    id: 'alum-2',
    nombre: 'Gonzalo',
    apellido: 'Martínez',
    dni: '38.912.404',
    fechaNacimiento: '1995-11-20',
    contacto: '+54 11 5890-1122',
    email: 'gonza.mtz@hotmail.com',
    sucursalId: 'suc-1',
    plan: 'Musculación Pases Libres',
    montoCuota: 28000,
    estadoCuota: 'Pendiente',
    fechaUltimoPago: '2026-08-15',
    fechaVencimiento: '2026-09-15',
    rutinaAsignadaId: 'rut-2'
  },
  {
    id: 'alum-3',
    nombre: 'Sofía',
    apellido: 'Benítez',
    dni: '43.109.876',
    fechaNacimiento: '2001-03-08',
    contacto: '+54 11 3412-7788',
    email: 'sofi.benitez@outlook.com',
    sucursalId: 'suc-2',
    plan: 'Pilates & Funcional',
    montoCuota: 32000,
    estadoCuota: 'Al día',
    fechaUltimoPago: '2026-09-10',
    fechaVencimiento: '2026-10-10',
    rutinaAsignadaId: 'rut-3'
  },
  {
    id: 'alum-4',
    nombre: 'Lucas',
    apellido: 'Ríos',
    dni: '39.554.120',
    fechaNacimiento: '1996-08-25',
    contacto: '+54 11 6901-4433',
    email: 'lucas.rios@gmail.com',
    sucursalId: 'suc-2',
    plan: 'Powerlifting & Musculación',
    montoCuota: 30000,
    estadoCuota: 'Pendiente',
    fechaUltimoPago: '2026-08-20',
    fechaVencimiento: '2026-09-20',
    rutinaAsignadaId: 'rut-2'
  },
  {
    id: 'alum-5',
    nombre: 'Lucía',
    apellido: 'Alvarez',
    dni: '42.871.309',
    fechaNacimiento: '2000-01-18',
    contacto: '+54 11 4012-9988',
    email: 'lucia.alvarez@gmail.com',
    sucursalId: 'suc-3',
    plan: 'Crossfit Avanzado',
    montoCuota: 38000,
    estadoCuota: 'Al día',
    fechaUltimoPago: '2026-09-18',
    fechaVencimiento: '2026-10-18',
    rutinaAsignadaId: 'rut-1'
  },
  {
    id: 'alum-6',
    nombre: 'Nicolás',
    apellido: 'Herrera',
    dni: '37.409.112',
    fechaNacimiento: '1993-07-04',
    contacto: '+54 11 5567-2234',
    email: 'nicolas.herrera@yahoo.com',
    sucursalId: 'suc-3',
    plan: 'Musculación Pases Libres',
    montoCuota: 30000,
    estadoCuota: 'Al día',
    fechaUltimoPago: '2026-09-05',
    fechaVencimiento: '2026-10-05',
    rutinaAsignadaId: 'rut-3'
  }
];

export const INITIAL_GASTOS = [
  {
    id: 'gst-1',
    descripcion: 'Alquiler Local Septiembre',
    monto: 1200000,
    fecha: '2026-09-05',
    categoria: 'Alquiler',
    sucursalId: 'suc-1',
    estado: 'Pagado',
    recordatorio: true
  },
  {
    id: 'gst-2',
    descripcion: 'Compra de Discos Olímpicos 20kg (x4)',
    monto: 240000,
    fecha: '2026-09-12',
    categoria: 'Equipamiento',
    sucursalId: 'suc-1',
    estado: 'Pagado',
    recordatorio: false
  },
  {
    id: 'gst-3',
    descripcion: 'Factura Luz & Climatización Central',
    monto: 185000,
    fecha: '2026-09-28',
    categoria: 'Servicios',
    sucursalId: 'suc-2',
    estado: 'Pendiente',
    recordatorio: true
  },
  {
    id: 'gst-4',
    descripcion: 'Mantenimiento Preventivo Cintas de Correr',
    monto: 95000,
    fecha: '2026-09-15',
    categoria: 'Mantenimiento',
    sucursalId: 'suc-3',
    estado: 'Pagado',
    recordatorio: false
  },
  {
    id: 'gst-5',
    descripcion: 'Servicio de Internet Fibra Óptica 500M',
    monto: 38000,
    fecha: '2026-09-29',
    categoria: 'Servicios',
    sucursalId: 'suc-1',
    estado: 'Pendiente',
    recordatorio: true
  }
];

export const INITIAL_EVENTOS = [
  {
    id: 'evt-1',
    nombre: 'Copa TrainCenter Crossfit Open 2026',
    descripcion: 'Torneo inter-sucursales de Crossfit y Endurance con premios y medallas para todas las categorías.',
    fecha: '2026-10-15',
    hora: '09:00',
    ubicacion: 'Sucursal San Isidro Training (Predio Exterior)',
    costoInscripcion: 15000,
    gastosEstimados: 350000,
    sucursalId: 'suc-3',
    estado: 'Próximo',
    participantes: [
      { alumnoId: 'alum-1', nombre: 'Camila Fernández', estadoPago: 'Pagado', fechaInscripcion: '2026-09-10' },
      { alumnoId: 'alum-5', nombre: 'Lucía Alvarez', estadoPago: 'Pagado', fechaInscripcion: '2026-09-12' },
      { alumnoId: 'alum-2', nombre: 'Gonzalo Martínez', estadoPago: 'No pagado', fechaInscripcion: '2026-09-15' },
      { alumnoId: 'ext-1', nombre: 'Marcos Soria (Invitado)', estadoPago: 'Pagado', fechaInscripcion: '2026-09-20' }
    ],
    gastos: [
      { id: 'eg-1', concepto: 'Alquiler de Cronómetro & Sonido Profesional', monto: 180000, estado: 'Pagado' },
      { id: 'eg-2', concepto: 'Medallas y Trofeos Personalizados', monto: 120000, estado: 'Pagado' },
      { id: 'eg-3', concepto: 'Hidratación y Frutas para Atletas', monto: 50000, estado: 'Pendiente' }
    ]
  },
  {
    id: 'evt-2',
    nombre: 'Masterclass de Levantamiento Olímpico',
    descripcion: 'Seminario teórico y práctico de Snatch y Clean & Jerk impartido por entrenadores certificados.',
    fecha: '2026-10-22',
    hora: '18:30',
    ubicacion: 'Sucursal Palermo Central',
    costoInscripcion: 12000,
    gastosEstimados: 150000,
    sucursalId: 'suc-1',
    estado: 'Próximo',
    participantes: [
      { alumnoId: 'alum-4', nombre: 'Lucas Ríos', estadoPago: 'Pagado', fechaInscripcion: '2026-09-21' },
      { alumnoId: 'alum-6', nombre: 'Nicolás Herrera', estadoPago: 'No pagado', fechaInscripcion: '2026-09-22' }
    ],
    gastos: [
      { id: 'eg-4', concepto: 'Honorarios Disertante Externo', monto: 120000, estado: 'Pendiente' },
      { id: 'eg-5', concepto: 'Catering & Coffee Break', monto: 30000, estado: 'Pendiente' }
    ]
  }
];

export const INITIAL_EJERCICIOS = [
  {
    id: 'ej-1',
    nombre: 'Sentadilla Trasera con Barra',
    grupoMuscular: 'Piernas',
    equipamiento: 'Barra y Discos',
    dificultad: 'Intermedio',
    descripcion: 'Movimiento fundamental para desarrollo de cuádriceps, glúteos y core. Mantener la espalda neutra y bajar rompiendo el paralelo.',
    videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8'
  },
  {
    id: 'ej-2',
    nombre: 'Press de Banca Plano',
    grupoMuscular: 'Pecho',
    equipamiento: 'Banco Plano y Barra',
    dificultad: 'Intermedio',
    descripcion: 'Empuje horizontal para desarrollo de pectoral mayor, tríceps y deltoides anterior con retracción escapular.',
    videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg'
  },
  {
    id: 'ej-3',
    nombre: 'Dominadas Pronas (Pull-ups)',
    grupoMuscular: 'Espalda',
    equipamiento: 'Barra de Dominadas',
    dificultad: 'Avanzado',
    descripcion: 'Tracción vertical para dorsal ancho, bíceps y activadores escapulares con rango completo de movimiento.',
    videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g'
  },
  {
    id: 'ej-4',
    nombre: 'Peso Muerto Convencional',
    grupoMuscular: 'Espalda/Piernas',
    equipamiento: 'Barra Olímpica',
    dificultad: 'Avanzado',
    descripcion: 'Levantamiento desde el suelo involucrando cadena posterior completa (isquios, glúteos, espinales).',
    videoUrl: 'https://www.youtube.com/watch?v=op9kVnSso6Q'
  },
  {
    id: 'ej-5',
    nombre: 'Press Militar con Mancuernas',
    grupoMuscular: 'Hombros',
    equipamiento: 'Mancuernas',
    dificultad: 'Principiante',
    descripcion: 'Empuje vertical en postura de pie o sentado para deltoides y trapecio superior.',
    videoUrl: 'https://www.youtube.com/watch?v=B-aVuyhvLHU'
  },
  {
    id: 'ej-6',
    nombre: 'Kettlebell Swings',
    grupoMuscular: 'Core/Cardio',
    equipamiento: 'Pesa Rusa (Kettlebell)',
    dificultad: 'Principiante',
    descripcion: 'Bisagra de cadera explosiva para potencia de glúteos, isquios y condición metabólica.',
    videoUrl: 'https://www.youtube.com/watch?v=YSxHifyI6s8'
  }
];

export const INITIAL_RUTINAS = [
  {
    id: 'rut-1',
    nombre: 'Rutina Fuerza & Hipertrofia A',
    objetivo: 'Ganancia muscular general y fuerza base',
    nivel: 'Intermedio',
    frecuencia: '4 días / semana',
    ejercicios: [
      { ejercicioId: 'ej-1', series: 4, repeticiones: '8-10', descanso: '90 seg', notas: 'Aumentar peso paulatinamente' },
      { ejercicioId: 'ej-2', series: 4, repeticiones: '8-10', descanso: '90 seg', notas: 'Tocar pecho sin rebotar la barra' },
      { ejercicioId: 'ej-3', series: 3, repeticiones: 'Al fallo (-1 RIR)', descanso: '120 seg', notas: 'Usar banda asistida si no llega a 8' }
    ]
  },
  {
    id: 'rut-2',
    nombre: 'Rutina Powerbuilding 5x5',
    objetivo: 'Desarrollo máximo de fuerza en levantamientos básicos',
    nivel: 'Avanzado',
    frecuencia: '3 días / semana',
    ejercicios: [
      { ejercicioId: 'ej-1', series: 5, repeticiones: '5', descanso: '3 min', notas: 'Peso 80% 1RM' },
      { ejercicioId: 'ej-4', series: 5, repeticiones: '5', descanso: '3 min', notas: 'Mantener tensión lumbar y traba de cadera' }
    ]
  },
  {
    id: 'rut-3',
    nombre: 'Condicionamiento Funcional & Core',
    objetivo: 'Acondicionamiento físico y quema calórica',
    nivel: 'Principiante',
    frecuencia: '3 días / semana',
    ejercicios: [
      { ejercicioId: 'ej-6', series: 4, repeticiones: '20', descanso: '45 seg', notas: 'Mantener ritmo constante' },
      { ejercicioId: 'ej-5', series: 3, repeticiones: '12-15', descanso: '60 seg', notas: 'Mancuernas moderadas (10kg-14kg)' }
    ]
  }
];
