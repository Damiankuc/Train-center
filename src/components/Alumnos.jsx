import React, { useState } from 'react';
import { useTrainCenter } from '../context/TrainCenterContext';
import {
  Users,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Building2,
  Calendar,
  Phone,
  Mail,
  Edit2,
  Trash2,
  MessageCircle,
  Dumbbell,
  FileText
} from 'lucide-react';

export const Alumnos = ({ onOpenModal, onEditAlumno, onViewRoutine }) => {
  const {
    alumnos,
    sucursales,
    rutinas,
    selectedSucursalId,
    registrarPagoCuota,
    deleteAlumno,
    searchQuery
  } = useTrainCenter();

  const [statusFilter, setStatusFilter] = useState('todos'); // 'todos', 'aldia', 'pendiente'
  const [localSearch, setLocalSearch] = useState('');

  const activeSearch = localSearch || searchQuery;

  // Multi-level Filtering
  const filteredAlumnos = alumnos.filter(a => {
    // Branch filter
    if (selectedSucursalId !== 'todas' && a.sucursalId !== selectedSucursalId) return false;

    // Status filter
    if (statusFilter === 'aldia' && a.estadoCuota !== 'Al día') return false;
    if (statusFilter === 'pendiente' && a.estadoCuota !== 'Pendiente') return false;

    // Search query filter
    if (activeSearch) {
      const q = activeSearch.toLowerCase();
      const fullName = `${a.nombre} ${a.apellido}`.toLowerCase();
      const dni = a.dni ? a.dni.toLowerCase() : '';
      const email = a.email ? a.email.toLowerCase() : '';
      return fullName.includes(q) || dni.includes(q) || email.includes(q);
    }

    return true;
  });

  const getWhatsAppLink = (alumno) => {
    const cleanPhone = alumno.contacto.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hola ${alumno.nombre}, te saludamos de TrainCenter (${sucursales.find(s => s.id === alumno.sucursalId)?.nombre || 'Sucursal'}). Te recordamos que el pago de tu cuota de ${alumno.plan} venció el ${alumno.fechaVencimiento}. Podés realizar la transferencia o acercarte a la sucursal. ¡Muchas gracias!`
    );
    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Controls Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-400" />
              Registro de Alumnos & Estado de Cuotas
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Consulta, filtra y administra la información personal y pagos de alumnos.
            </p>
          </div>

          <button
            onClick={() => onOpenModal('alumno')}
            className="gradient-bg-accent text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 hover:opacity-90 transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Registrar Alumno
          </button>
        </div>

        {/* Filter bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Filtrar por nombre, apellido, DNI..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 glass-input text-xs sm:text-sm rounded-xl focus:outline-none"
            />
          </div>

          {/* Fee Status filter */}
          <div className="flex items-center gap-1.5 glass-card p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setStatusFilter('todos')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                statusFilter === 'todos' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos ({alumnos.length})
            </button>
            <button
              onClick={() => setStatusFilter('aldia')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                statusFilter === 'aldia' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Al día
            </button>
            <button
              onClick={() => setStatusFilter('pendiente')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                statusFilter === 'pendiente' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pendientes
            </button>
          </div>

          {/* Results count pill */}
          <div className="flex items-center justify-end text-xs text-slate-400 px-2 font-medium">
            Mostrando <strong className="text-white mx-1">{filteredAlumnos.length}</strong> de {alumnos.length} alumnos
          </div>
        </div>
      </div>

      {/* Alumnos Cards / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAlumnos.map((alum) => {
          const suc = sucursales.find(s => s.id === alum.sucursalId);
          const rutina = rutinas.find(r => r.id === alum.rutinaAsignadaId);
          const isAlDia = alum.estadoCuota === 'Al día';

          return (
            <div
              key={alum.id}
              className={`glass-card rounded-3xl border p-5 flex flex-col justify-between transition-all hover:border-slate-700 relative overflow-hidden ${
                isAlDia ? 'border-slate-800' : 'border-rose-900/40 bg-rose-950/10'
              }`}
            >
              <div className="space-y-3.5">
                {/* Header: Name, DNI, Fee badge */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <h3 className="text-base font-extrabold text-white">
                      {alum.nombre} {alum.apellido}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span>DNI: <strong className="text-slate-300">{alum.dni}</strong></span>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold border flex items-center gap-1.5 shrink-0 ${
                    isAlDia
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-300 border-rose-500/20 animate-pulse'
                  }`}>
                    {isAlDia ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
                    {alum.estadoCuota}
                  </span>
                </div>

                {/* Info Fields */}
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Sucursal: <strong className="text-white">{suc?.nombre || 'No asignada'}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Plan: <strong className="text-indigo-300">{alum.plan}</strong> (${Number(alum.montoCuota).toLocaleString('es-AR')})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Contacto: <strong>{alum.contacto}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Vencimiento cuota: <strong className={isAlDia ? 'text-emerald-400' : 'text-rose-400'}>{alum.fechaVencimiento || 'N/A'}</strong></span>
                  </div>

                  {/* Routine linked pill */}
                  {rutina && (
                    <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Dumbbell className="w-3.5 h-3.5 text-purple-400" /> Rutina:
                      </span>
                      <button
                        onClick={() => onViewRoutine(rutina)}
                        className="text-purple-300 font-bold hover:underline"
                      >
                        {rutina.nombre}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                {/* WhatsApp button for pending fees */}
                {!isAlDia && (
                  <a
                    href={getWhatsAppLink(alum)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
                    title="Enviar recordatorio por WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                )}

                {/* Register Fee payment button */}
                <button
                  onClick={() => registrarPagoCuota(alum.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isAlDia
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30'
                  }`}
                >
                  {isAlDia ? 'Renovar Pago' : 'Registrar Pago ✓'}
                </button>

                {/* Edit / Delete Buttons */}
                <div className="flex items-center gap-1 ml-auto">
                  <button
                    onClick={() => onEditAlumno(alum)}
                    className="p-2 glass-card hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-all"
                    title="Editar datos de alumno"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteAlumno(alum.id)}
                    className="p-2 glass-card hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 rounded-xl transition-all"
                    title="Eliminar alumno"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
