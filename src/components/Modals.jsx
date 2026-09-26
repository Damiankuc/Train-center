import React, { useState, useEffect } from 'react';
import { useTrainCenter } from '../context/TrainCenterContext';
import { X, Plus, Trash2, Video, Play, ExternalLink } from 'lucide-react';

// Wrapper for backdrop and standard modal structure
const ModalBase = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="glass-panel rounded-3xl border border-slate-700/80 w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/60">
          <h3 className="text-base font-extrabold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 glass-card hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

// 1. MODAL SUCURSAL
export const ModalSucursal = ({ isOpen, onClose, editData }) => {
  const { addSucursal, updateSucursal } = useTrainCenter();
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    encargado: '',
    alquilerMensual: 1000000,
    diaVencimientoAlquiler: 10,
    notas: ''
  });

  useEffect(() => {
    if (editData) setFormData(editData);
    else setFormData({
      nombre: '',
      direccion: '',
      telefono: '',
      encargado: '',
      alquilerMensual: 1000000,
      diaVencimientoAlquiler: 10,
      notas: ''
    });
  }, [editData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) updateSucursal(editData.id, formData);
    else addSucursal(formData);
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={editData ? 'Editar Sucursal' : 'Nueva Sucursal'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-slate-300 font-bold mb-1">Nombre de la Sucursal *</label>
          <input
            type="text"
            required
            placeholder="Ej: Sucursal Belgrano Fit"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Dirección *</label>
            <input
              type="text"
              required
              placeholder="Ej: Av. Cabildo 2150"
              value={formData.direccion}
              onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Teléfono de Contacto</label>
            <input
              type="text"
              placeholder="+54 11 4000-0000"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Encargado/a</label>
            <input
              type="text"
              placeholder="Nombre responsable"
              value={formData.encargado}
              onChange={(e) => setFormData({ ...formData, encargado: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Alquiler Mensual ($)</label>
            <input
              type="number"
              required
              value={formData.alquilerMensual}
              onChange={(e) => setFormData({ ...formData, alquilerMensual: Number(e.target.value) })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Día Vencimiento</label>
            <input
              type="number"
              min="1"
              max="31"
              required
              value={formData.diaVencimientoAlquiler}
              onChange={(e) => setFormData({ ...formData, diaVencimientoAlquiler: Number(e.target.value) })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 font-bold">Cancelar</button>
          <button type="submit" className="gradient-bg-accent text-white px-5 py-2 rounded-xl font-bold">Guardar</button>
        </div>
      </form>
    </ModalBase>
  );
};

// 2. MODAL ALUMNO
export const ModalAlumno = ({ isOpen, onClose, editData }) => {
  const { addAlumno, updateAlumno, sucursales, rutinas } = useTrainCenter();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    fechaNacimiento: '2000-01-01',
    contacto: '',
    email: '',
    sucursalId: sucursales[0]?.id || '',
    plan: 'Musculación Pases Libres',
    montoCuota: 30000,
    estadoCuota: 'Al día',
    rutinaAsignadaId: ''
  });

  useEffect(() => {
    if (editData) setFormData(editData);
    else setFormData({
      nombre: '',
      apellido: '',
      dni: '',
      fechaNacimiento: '2000-01-01',
      contacto: '',
      email: '',
      sucursalId: sucursales[0]?.id || '',
      plan: 'Musculación Pases Libres',
      montoCuota: 30000,
      estadoCuota: 'Al día',
      rutinaAsignadaId: ''
    });
  }, [editData, isOpen, sucursales]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) updateAlumno(editData.id, formData);
    else addAlumno(formData);
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={editData ? 'Editar Alumno' : 'Registrar Nuevo Alumno'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Nombre *</label>
            <input
              type="text"
              required
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Apellido *</label>
            <input
              type="text"
              required
              value={formData.apellido}
              onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-bold mb-1">DNI *</label>
            <input
              type="text"
              required
              placeholder="Ej: 40.123.456"
              value={formData.dni}
              onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Fecha de Nacimiento</label>
            <input
              type="date"
              value={formData.fechaNacimiento}
              onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Teléfono / WhatsApp *</label>
            <input
              type="text"
              required
              placeholder="+54 11 5000-0000"
              value={formData.contacto}
              onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Sucursal Asignada *</label>
            <select
              value={formData.sucursalId}
              onChange={(e) => setFormData({ ...formData, sucursalId: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none bg-slate-900"
            >
              {sucursales.map(s => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Plan / Disciplina *</label>
            <input
              type="text"
              required
              placeholder="Ej: Crossfit, Pilates, Funcional"
              value={formData.plan}
              onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Valor Cuota ($)</label>
            <input
              type="number"
              required
              value={formData.montoCuota}
              onChange={(e) => setFormData({ ...formData, montoCuota: Number(e.target.value) })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Estado Inicial</label>
            <select
              value={formData.estadoCuota}
              onChange={(e) => setFormData({ ...formData, estadoCuota: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none bg-slate-900"
            >
              <option value="Al día">Al día</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Rutina Asignada</label>
            <select
              value={formData.rutinaAsignadaId}
              onChange={(e) => setFormData({ ...formData, rutinaAsignadaId: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none bg-slate-900"
            >
              <option value="">Sin rutina asignada</option>
              {rutinas.map(r => (
                <option key={r.id} value={r.id}>{r.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 font-bold">Cancelar</button>
          <button type="submit" className="gradient-bg-accent text-white px-5 py-2 rounded-xl font-bold">Guardar</button>
        </div>
      </form>
    </ModalBase>
  );
};

// 3. MODAL GASTO
export const ModalGasto = ({ isOpen, onClose, editData }) => {
  const { addGasto, updateGasto, sucursales } = useTrainCenter();
  const [formData, setFormData] = useState({
    descripcion: '',
    monto: 50000,
    categoria: 'Servicios',
    sucursalId: sucursales[0]?.id || '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'Pagado',
    recordatorio: true
  });

  useEffect(() => {
    if (editData) setFormData(editData);
    else setFormData({
      descripcion: '',
      monto: 50000,
      categoria: 'Servicios',
      sucursalId: sucursales[0]?.id || '',
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Pagado',
      recordatorio: true
    });
  }, [editData, isOpen, sucursales]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) updateGasto(editData.id, formData);
    else addGasto(formData);
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={editData ? 'Editar Gasto' : 'Registrar Nuevo Gasto'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-slate-300 font-bold mb-1">Concepto / Descripción *</label>
          <input
            type="text"
            required
            placeholder="Ej: Factura Luz, Reparación Polea"
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Monto Total ($) *</label>
            <input
              type="number"
              required
              value={formData.monto}
              onChange={(e) => setFormData({ ...formData, monto: Number(e.target.value) })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Categoría *</label>
            <select
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none bg-slate-900"
            >
              <option value="Alquiler">Alquiler</option>
              <option value="Equipamiento">Equipamiento</option>
              <option value="Servicios">Servicios (Luz, Agua, Gas, Net)</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Sueldos">Sueldos / Instructores</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Sucursal</label>
            <select
              value={formData.sucursalId}
              onChange={(e) => setFormData({ ...formData, sucursalId: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none bg-slate-900"
            >
              <option value="">General / Global</option>
              {sucursales.map(s => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Fecha Limit / Venc.</label>
            <input
              type="date"
              required
              value={formData.fecha}
              onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Estado Pago</label>
            <select
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none bg-slate-900"
            >
              <option value="Pagado">Pagado</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="recordatorio"
            checked={formData.recordatorio}
            onChange={(e) => setFormData({ ...formData, recordatorio: e.target.checked })}
            className="w-4 h-4 rounded text-indigo-600 focus:ring-0"
          />
          <label htmlFor="recordatorio" className="text-slate-300 font-semibold cursor-pointer">
            Activar recordatorio automático en el panel principal
          </label>
        </div>

        <div className="pt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 font-bold">Cancelar</button>
          <button type="submit" className="gradient-bg-accent text-white px-5 py-2 rounded-xl font-bold">Guardar</button>
        </div>
      </form>
    </ModalBase>
  );
};

// 4. MODAL EVENTO
export const ModalEvento = ({ isOpen, onClose, editData }) => {
  const { addEvento, updateEvento, sucursales } = useTrainCenter();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fecha: new Date().toISOString().split('T')[0],
    hora: '10:00',
    ubicacion: '',
    sucursalId: sucursales[0]?.id || '',
    costoInscripcion: 10000,
    gastosEstimados: 100000
  });

  useEffect(() => {
    if (editData) setFormData(editData);
    else setFormData({
      nombre: '',
      descripcion: '',
      fecha: new Date().toISOString().split('T')[0],
      hora: '10:00',
      ubicacion: '',
      sucursalId: sucursales[0]?.id || '',
      costoInscripcion: 10000,
      gastosEstimados: 100000
    });
  }, [editData, isOpen, sucursales]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) updateEvento(editData.id, formData);
    else addEvento(formData);
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={editData ? 'Editar Evento' : 'Crear Nuevo Evento'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-slate-300 font-bold mb-1">Nombre del Evento *</label>
          <input
            type="text"
            required
            placeholder="Ej: Copa Crossfit Open 2026"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-bold mb-1">Descripción / Detalles</label>
          <textarea
            rows="3"
            placeholder="Detalles sobre categorías, premios, programa..."
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Fecha *</label>
            <input
              type="date"
              required
              value={formData.fecha}
              onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Hora *</label>
            <input
              type="text"
              required
              placeholder="09:00"
              value={formData.hora}
              onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Sucursal Anfitriona</label>
            <select
              value={formData.sucursalId}
              onChange={(e) => setFormData({ ...formData, sucursalId: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none bg-slate-900"
            >
              {sucursales.map(s => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Lugar / Ubicación Especifica</label>
            <input
              type="text"
              placeholder="Ej: Predio Exterior / Sector Box"
              value={formData.ubicacion}
              onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Costo Inscripción p/ Alumno ($)</label>
            <input
              type="number"
              required
              value={formData.costoInscripcion}
              onChange={(e) => setFormData({ ...formData, costoInscripcion: Number(e.target.value) })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Presupuesto Gastos ($)</label>
            <input
              type="number"
              value={formData.gastosEstimados}
              onChange={(e) => setFormData({ ...formData, gastosEstimados: Number(e.target.value) })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 font-bold">Cancelar</button>
          <button type="submit" className="gradient-bg-accent text-white px-5 py-2 rounded-xl font-bold">Guardar Evento</button>
        </div>
      </form>
    </ModalBase>
  );
};

// 5. MODAL PARTICIPANTE EVENTO
export const ModalParticipanteEvento = ({ isOpen, onClose, eventoId }) => {
  const { registrarParticipanteEvento, alumnos } = useTrainCenter();
  const [selectedAlumnoId, setSelectedAlumnoId] = useState('');
  const [nombreInvitado, setNombreInvitado] = useState('');
  const [estadoPago, setEstadoPago] = useState('Pagado');

  const handleSubmit = (e) => {
    e.preventDefault();
    let nombreFinal = nombreInvitado;
    let alumId = '';

    if (selectedAlumnoId) {
      const alum = alumnos.find(a => a.id === selectedAlumnoId);
      if (alum) {
        nombreFinal = `${alum.nombre} ${alum.apellido}`;
        alumId = alum.id;
      }
    }

    if (!nombreFinal) return;

    registrarParticipanteEvento(eventoId, {
      alumnoId: alumId,
      nombre: nombreFinal,
      estadoPago,
      fechaInscripcion: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Inscribir Participante al Evento">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-slate-300 font-bold mb-1">Seleccionar Alumno del Sistema</label>
          <select
            value={selectedAlumnoId}
            onChange={(e) => {
              setSelectedAlumnoId(e.target.value);
              if (e.target.value) setNombreInvitado('');
            }}
            className="w-full p-2.5 glass-input rounded-xl focus:outline-none bg-slate-900"
          >
            <option value="">-- O seleccionar de lista de alumnos --</option>
            {alumnos.map(a => (
              <option key={a.id} value={a.id}>{a.nombre} {a.apellido} (DNI: {a.dni})</option>
            ))}
          </select>
        </div>

        {!selectedAlumnoId && (
          <div>
            <label className="block text-slate-300 font-bold mb-1">O Ingresar Nombre de Atleta Externo</label>
            <input
              type="text"
              placeholder="Ej: Marcos Soria (Invitado)"
              value={nombreInvitado}
              onChange={(e) => setNombreInvitado(e.target.value)}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
        )}

        <div>
          <label className="block text-slate-300 font-bold mb-1">Estado de Pago de Inscripción</label>
          <select
            value={estadoPago}
            onChange={(e) => setEstadoPago(e.target.value)}
            className="w-full p-2.5 glass-input rounded-xl focus:outline-none bg-slate-900"
          >
            <option value="Pagado">Pagado ✓</option>
            <option value="No pagado">No pagado ❌</option>
          </select>
        </div>

        <div className="pt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 font-bold">Cancelar</button>
          <button type="submit" className="gradient-bg-accent text-white px-5 py-2 rounded-xl font-bold">Inscribir</button>
        </div>
      </form>
    </ModalBase>
  );
};

// 6. MODAL GASTO EVENTO
export const ModalGastoEvento = ({ isOpen, onClose, eventoId }) => {
  const { addGastoEvento } = useTrainCenter();
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState(25000);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!concepto) return;
    addGastoEvento(eventoId, { concepto, monto: Number(monto) });
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Cargar Gasto al Evento">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-slate-300 font-bold mb-1">Concepto / Rubro *</label>
          <input
            type="text"
            required
            placeholder="Ej: Sonido y Micrófonos, Trofeos, Catering"
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-bold mb-1">Monto ($) *</label>
          <input
            type="number"
            required
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
          />
        </div>

        <div className="pt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 font-bold">Cancelar</button>
          <button type="submit" className="gradient-bg-accent text-white px-5 py-2 rounded-xl font-bold">Guardar Gasto</button>
        </div>
      </form>
    </ModalBase>
  );
};

// 7. MODAL EJERCICIO
export const ModalEjercicio = ({ isOpen, onClose }) => {
  const { addEjercicio } = useTrainCenter();
  const [formData, setFormData] = useState({
    nombre: '',
    grupoMuscular: 'Piernas',
    equipamiento: 'Barra Olímpica',
    dificultad: 'Intermedio',
    descripcion: '',
    videoUrl: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addEjercicio(formData);
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Nuevo Ejercicio">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-slate-300 font-bold mb-1">Nombre del Ejercicio *</label>
          <input
            type="text"
            required
            placeholder="Ej: Peso Muerto Rumano"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Grupo Muscular Principal *</label>
            <select
              value={formData.grupoMuscular}
              onChange={(e) => setFormData({ ...formData, grupoMuscular: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none bg-slate-900"
            >
              <option value="Pecho">Pecho</option>
              <option value="Espalda">Espalda</option>
              <option value="Piernas">Piernas</option>
              <option value="Hombros">Hombros</option>
              <option value="Brazos">Brazos</option>
              <option value="Core/Cardio">Core/Cardio</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Equipamiento</label>
            <input
              type="text"
              placeholder="Ej: Mancuernas, Barra, Polea"
              value={formData.equipamiento}
              onChange={(e) => setFormData({ ...formData, equipamiento: e.target.value })}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 font-bold mb-1">Descripción / Técnica de Ejecución</label>
          <textarea
            rows="2"
            placeholder="Instrucciones para la correcta postura..."
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-bold mb-1">Enlace a Video Demostrativo (YouTube, Vimeo, etc.)</label>
          <input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
          />
        </div>

        <div className="pt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 font-bold">Cancelar</button>
          <button type="submit" className="gradient-bg-accent text-white px-5 py-2 rounded-xl font-bold">Guardar Ejercicio</button>
        </div>
      </form>
    </ModalBase>
  );
};

// 8. MODAL RUTINA
export const ModalRutina = ({ isOpen, onClose }) => {
  const { addRutina, ejercicios } = useTrainCenter();
  const [nombre, setNombre] = useState('');
  const [objetivo, setObjetivo] = useState('Hipertrofia & Fuerza');
  const [nivel, setNivel] = useState('Intermedio');
  const [frecuencia, setFrecuencia] = useState('4 días / semana');

  const [selectedEjercicios, setSelectedEjercicios] = useState([]);

  const handleAddEjercicioRow = () => {
    if (ejercicios.length === 0) return;
    setSelectedEjercicios(prev => [
      ...prev,
      { ejercicioId: ejercicios[0].id, series: 4, repeticiones: '10-12', descanso: '90 seg', notas: '' }
    ]);
  };

  const handleRemoveRow = (index) => {
    setSelectedEjercicios(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleRowChange = (index, field, value) => {
    setSelectedEjercicios(prev => prev.map((item, idx) => idx === index ? { ...item, [field]: value } : item));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre) return;
    addRutina({
      nombre,
      objetivo,
      nivel,
      frecuencia,
      ejercicios: selectedEjercicios
    });
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Crear Nueva Plantilla de Rutina">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-slate-300 font-bold mb-1">Nombre de la Rutina *</label>
          <input
            type="text"
            required
            placeholder="Ej: Rutina Torso / Pierna 4 Días"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-slate-300 font-bold mb-1">Objetivo</label>
            <input
              type="text"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Nivel</label>
            <select
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none bg-slate-900"
            >
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-300 font-bold mb-1">Frecuencia</label>
            <input
              type="text"
              value={frecuencia}
              onChange={(e) => setFrecuencia(e.target.value)}
              className="w-full p-2.5 glass-input rounded-xl focus:outline-none"
            />
          </div>
        </div>

        {/* Exercises Sequence Selector */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <label className="block text-slate-300 font-bold">Secuencia de Ejercicios</label>
            <button
              type="button"
              onClick={handleAddEjercicioRow}
              className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1 rounded-xl cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Agregar Ejercicio
            </button>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {selectedEjercicios.map((item, idx) => (
              <div key={idx} className="p-3 rounded-2xl glass-card border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <select
                    value={item.ejercicioId}
                    onChange={(e) => handleRowChange(idx, 'ejercicioId', e.target.value)}
                    className="flex-1 p-2 glass-input rounded-xl bg-slate-900 font-bold"
                  >
                    {ejercicios.map(e => (
                      <option key={e.id} value={e.id}>{e.nombre} ({e.grupoMuscular})</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(idx)}
                    className="p-2 text-rose-400 hover:bg-rose-900/30 rounded-xl"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    placeholder="Series"
                    value={item.series}
                    onChange={(e) => handleRowChange(idx, 'series', Number(e.target.value))}
                    className="p-2 glass-input rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Reps (ej: 8-10)"
                    value={item.repeticiones}
                    onChange={(e) => handleRowChange(idx, 'repeticiones', e.target.value)}
                    className="p-2 glass-input rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Descanso"
                    value={item.descanso}
                    onChange={(e) => handleRowChange(idx, 'descanso', e.target.value)}
                    className="p-2 glass-input rounded-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 font-bold">Cancelar</button>
          <button type="submit" className="gradient-bg-accent text-white px-5 py-2 rounded-xl font-bold">Guardar Rutina</button>
        </div>
      </form>
    </ModalBase>
  );
};

// 9. MODAL VIDEO PLAYER
export const ModalVideoPlayer = ({ isOpen, onClose, exercise }) => {
  if (!isOpen || !exercise) return null;

  // Convert YouTube link to embed format if applicable
  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(exercise.videoUrl);

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={`Demostración: ${exercise.nombre}`}>
      <div className="space-y-4">
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
          {embedUrl.includes('youtube.com/embed') ? (
            <iframe
              src={embedUrl}
              title={exercise.nombre}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="text-center p-6 space-y-3">
              <Video className="w-12 h-12 text-indigo-400 mx-auto" />
              <p className="text-xs text-slate-300">Este video se encuentra en un enlace externo.</p>
              <a
                href={exercise.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-bg-accent text-white px-4 py-2 rounded-xl font-bold inline-flex items-center gap-2 text-xs"
              >
                <ExternalLink className="w-4 h-4" /> Abrir Video en Nueva Pestaña
              </a>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h4 className="font-bold text-white text-sm">{exercise.nombre} ({exercise.grupoMuscular})</h4>
          <p className="text-xs text-slate-300">{exercise.descripcion}</p>
        </div>
      </div>
    </ModalBase>
  );
};
