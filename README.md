# 🏋️ TrainCenter - Sistema de Gestión de Sucursales de Entrenamiento Físico

Sistema integral e interactivo para la administración centralizada de redes de gimnasios, centros de entrenamiento, cobro de cuotas, sucursales, gastos, eventos deportivos y rutinas personalizadas.

---

## 🚀 Características Principales

### 1. 👤 Registro y Gestión de Alumnos
- **Ficha Médica y Personal**: Registro completo de Alumnos (Nombre, Apellido, DNI, Fecha de nacimiento, Contacto/WhatsApp, Email, Sucursal asignada).
- **Control de Cuotas**: Seguimiento automático del estado de cuota (*Al día* / *Pendiente / Vencida*).
- **Renovación con 1-Click**: Registro de cobro de cuota recalculando la fecha de vencimiento a 30 días automáticamente.
- **Notificaciones directas por WhatsApp**: Generación de mensajes automáticos formateados para notificar cobros a alumnos con cuotas impagas.
- **Asignación de Rutinas**: Vinculación directa de rutinas personalizadas a cada perfil de alumno.

### 2. 🏢 Gestión de Sucursales (Sedes)
- **Administración Multi-Sede**: Alta, modificación y monitoreo de sucursales (Nombre, Dirección, Teléfono, Encargado/a, Alquiler Mensual, Día de Vencimiento).
- **Métricas Financieras por Sucursal**: Recaudación por cuotas vs. gastos operativos netos y rentabilidad por sede.
- **Control de Pago de Alquiler**: Estado del alquiler (*Al día* / *Pendiente*) con alertas visuales de vencimiento.

### 3. 🧾 Registro de Gastos y Compromisos
- **Categorización de Gastos**: Clasificación por Alquiler, Equipamiento, Servicios (Luz, Agua, Gas, Internet), Mantenimiento, Sueldos y Otros.
- **Vínculo por Sucursal o Global**: Control financiero de egresos generales o específicos de cada sede.
- **Alertas y Recordatorios de Vencimiento**: Panel dinámico con avisos de vencimiento de compromisos de pago.

### 4. 📅 Gestión de Eventos & Competencias
- **Creación de Eventos**: Administración de Torneos, Masterclasses, Clinics de Nutrición y Levantamiento.
- **Inscripción de Participantes**: Registro de alumnos o atletas externos con control de estado de pago de inscripción.
- **Balance Financiero del Evento**: Cálculo en tiempo real de ingresos por inscripciones vs. gastos del evento (Sonido, Trofeos, Catering).

### 5. 🏋️ Banco de Ejercicios & Creador de Rutinas
- **Biblioteca de Ejercicios**: Clasificados por grupo muscular (Pecho, Espalda, Piernas, Hombros, Brazos, Core/Cardio).
- **Demostración en Video**: Enlaces a videos demostrativos (YouTube, Vimeo, redes sociales) con reproductor modal incrustado.
- **Creador de Rutinas Personalizadas**: Configuración de series, repeticiones, descansos e indicaciones técnicas.
- **Impresión / Exportación PDF**: Generación de fichas deportivas imprimibles para los alumnos.

### 6. 🔔 Alertas y Recordatorios Automáticos
- Motor de detección automática en tiempo real que notifica:
  - Cuotas vencidas o por vencer en los próximos 5 días.
  - Alquileres de sucursales pendientes.
  - Gastos próximos con recordatorio activado.
  - Eventos programados en los siguientes 15 días.

### 7. 💾 Respaldo y Gestión de Datos (JSON)
- **Persistencia en LocalStorage**: Todos los cambios se guardan automáticamente.
- **Exportación / Importación JSON**: Copias de seguridad descargables y cargables.
- **Restablecimiento a Datos Demo**: Posibilidad de reiniciar el sistema a su estado inicial.

---

## 🛠️ Tecnologías Utilizadas
- **React 19** + **Vite 6**
- **Tailwind CSS v4** con diseño *Glassmorphism* y modo oscuro premium
- **Lucide React** (iconografía dinámica)
- **JavaScript (ES6+)** con React Context API y hooks optimizados

---

## 📂 Estructura del Proyecto

```
Train-center/
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Barra superior con selector de sucursal, búsqueda y alertas
│   │   ├── Sidebar.jsx          # Menú de navegación principal con contadores
│   │   ├── Dashboard.jsx        # Vista general con métricas e indicadores globales
│   │   ├── Sucursales.jsx       # Gestión de sedes y control de alquileres
│   │   ├── Alumnos.jsx          # Registro de alumnos, cuotas y avisos por WhatsApp
│   │   ├── Gastos.jsx           # Registro y categorización de egresos
│   │   ├── Eventos.jsx          # Administración de torneos, inscriptos y balances
│   │   ├── Rutinas.jsx          # Banco de ejercicios, videos y fichas imprimibles
│   │   ├── ConfigBackup.jsx     # Copias de seguridad en JSON e información del sistema
│   │   ├── Modals.jsx           # Diálogos modales para alta y edición de entidades
│   │   └── Toast.jsx            # Notificaciones flotantes de estado
│   ├── context/
│   │   └── TrainCenterContext.jsx # Estado global y persistencia LocalStorage
│   ├── data/
│   │   └── initialData.js       # Dataset inicial completo con datos de demostración
│   ├── App.jsx                  # Componente principal y enrutador de vistas
│   └── index.css                # Estilos base y tokens de diseño
└── package.json
```

---

## ⚡ Instalación y Ejecución Local

1. **Clonar repositorio e instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Compilar para producción:**
   ```bash
   npm run build
   ```
