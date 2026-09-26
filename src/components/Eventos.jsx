import React, { useState } from 'react';
import { useTrainCenter } from '../context/TrainCenterContext';
import {
  Calendar,
  Plus,
  Building2,
  Users,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  UserPlus,
  Trash2,
  Edit2,
  MapPin,
  Clock,
  ChevronRight
} from 'lucide-react';

export const Eventos = ({ onOpenModal, onEditEvento, onOpenAddParticipant, onOpenAddEventExpense }) => {
  const {
    eventos,
    sucursales,
    selectedSucursalId,
    togglePagoParticipanteEvento,
    deleteEvento,
    searchQuery
  } = useTrainCenter();

  const [selectedEventoId, setSelectedEventoId] = useState(null);

  // Filtering
  const filteredEventos = eventos.filter(e => {
    if (selectedSucursalId !== 'todas' && e.sucursalId !== selectedSucursalId) return false;
    if (searchQuery) {
      return e.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
             e.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-400" />
            Gestión de Eventos & Competencias
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Organiza torneos, clinics, registra inscriptos y controla la rentabilidad de cada evento.
          </p>
        </div>

        <button
          onClick={() => onOpenModal('evento')}
          className="gradient-bg-accent text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/25 hover:opacity-90 transition-all cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Crear Evento
        </button>
      </div>

      {/* Main Grid: Event Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredEventos.map((evt) => {
          const suc = sucursales.find(s => s.id === evt.sucursalId);
          const totalParticipantes = evt.participantes.length;
          const pagadosCount = evt.participantes.filter(p => p.estadoPago === 'Pagado').length;
          
          const ingresosTotales = pagadosCount * (Number(evt.costoInscripcion) || 0);
          const gastosTotales = (evt.gastos || []).reduce((acc, g) => acc + Number(g.monto), 0);
          const balanceNeto = ingresosTotales - gastosTotales;

          const isExpanded = selectedEventoId === evt.id;

          return (
            <div
              key={evt.id}
              className="glass-card rounded-3xl border border-slate-800 p-6 space-y-5 hover:border-slate-700 transition-all"
            >
              {/* Event Main Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-bold px-3 py-0.5 rounded-full">
                      📅 {evt.fecha} • {evt.hora} hs
                    </span>
                    <span className="text-xs text-slate-400 font-medium">📍 {suc?.nombre || 'General'}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white">{evt.nombre}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">{evt.descripcion}</p>
                </div>

                {/* Event Top Stats */}
                <div className="flex items-center gap-4 bg-slate-900/60 p-3 rounded-2xl border border-slate-800 shrink-0">
                  <div>
                    <div className="text-[11px] text-slate-400 font-bold uppercase">Inscripciones</div>
                    <div className="text-sm font-extrabold text-emerald-400">
                      ${ingresosTotales.toLocaleString('es-AR')}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-slate-800" />
                  <div>
                    <div className="text-[11px] text-slate-400 font-bold uppercase">Gastos Evento</div>
                    <div className="text-sm font-extrabold text-rose-400">
                      ${gastosTotales.toLocaleString('es-AR')}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-slate-800" />
                  <div>
                    <div className="text-[11px] text-slate-400 font-bold uppercase">Balance Neto</div>
                    <div className={`text-sm font-extrabold ${balanceNeto >= 0 ? 'text-indigo-400' : 'text-rose-400'}`}>
                      ${balanceNeto.toLocaleString('es-AR')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Quick Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenAddParticipant(evt.id)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                  >
                    <UserPlus className="w-3.5 h-3.5" /> Inscribir Alumno
                  </button>
                  <button
                    onClick={() => onOpenAddEventExpense(evt.id)}
                    className="glass-card hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Receipt className="w-3.5 h-3.5 text-rose-400" /> Cargar Gasto
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEditEvento(evt)}
                    className="p-2 glass-card hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-all"
                    title="Editar evento"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteEvento(evt.id)}
                    className="p-2 glass-card hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 rounded-xl transition-all"
                    title="Eliminar evento"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setSelectedEventoId(isExpanded ? null : evt.id)}
                    className="glass-card hover:bg-slate-800 text-indigo-300 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                  >
                    {isExpanded ? 'Ocultar Detalle' : `Ver Inscriptos (${totalParticipantes})`}
                  </button>
                </div>
              </div>

              {/* Detailed Participants & Expenses Drawer */}
              {isExpanded && (
                <div className="space-y-5 pt-4 border-t border-slate-800/80 animate-fade-in">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* List of Registered Participants */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Users className="w-4 h-4 text-indigo-400" />
                          Alumnos Inscriptos ({totalParticipantes})
                        </h4>
                        <span className="text-xs text-emerald-400 font-semibold">
                          {pagadosCount} pagados / {totalParticipantes - pagadosCount} pendientes
                        </span>
                      </div>

                      {totalParticipantes === 0 ? (
                        <p className="text-xs text-slate-500 py-3 italic">Aún no hay alumnos inscriptos en este evento.</p>
                      ) : (
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                          {evt.participantes.map((part, idx) => {
                            const isPagado = part.estadoPago === 'Pagado';

                            return (
                              <div
                                key={idx}
                                className="p-3 rounded-2xl glass-card border border-slate-800/80 flex items-center justify-between text-xs"
                              >
                                <div>
                                  <div className="font-bold text-white">{part.nombre}</div>
                                  <div className="text-[11px] text-slate-400">Inscripto: {part.fechaInscripcion || 'Reciente'}</div>
                                </div>

                                <button
                                  onClick={() => togglePagoParticipanteEvento(evt.id, part.alumnoId || part.nombre)}
                                  className={`px-3 py-1 rounded-xl font-bold transition-all text-xs cursor-pointer flex items-center gap-1 ${
                                    isPagado
                                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                                      : 'bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20'
                                  }`}
                                >
                                  {isPagado ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
                                  {part.estadoPago} (${Number(evt.costoInscripcion).toLocaleString('es-AR')})
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* List of Event Specific Expenses */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-rose-400" />
                        Gastos del Evento
                      </h4>

                      {(evt.gastos || []).length === 0 ? (
                        <p className="text-xs text-slate-500 py-3 italic">No hay gastos cargados para este evento.</p>
                      ) : (
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                          {evt.gastos.map((gsto) => (
                            <div
                              key={gsto.id}
                              className="p-3 rounded-2xl glass-card border border-slate-800/80 flex items-center justify-between text-xs"
                            >
                              <div>
                                <div className="font-bold text-white">{gsto.concepto}</div>
                                <div className="text-[11px] text-slate-400">Estado: {gsto.estado}</div>
                              </div>
                              <div className="font-extrabold text-rose-400 text-sm">
                                ${Number(gsto.monto).toLocaleString('es-AR')}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
