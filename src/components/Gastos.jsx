import React, { useState } from 'react';
import { useTrainCenter } from '../context/TrainCenterContext';
import {
  Receipt,
  Plus,
  Building2,
  DollarSign,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Bell,
  Trash2,
  Edit2,
  Filter,
  Tag
} from 'lucide-react';

export const Gastos = ({ onOpenModal, onEditGasto }) => {
  const {
    gastos,
    sucursales,
    selectedSucursalId,
    toggleGastoEstado,
    deleteGasto,
    searchQuery
  } = useTrainCenter();

  const [categoriaFilter, setCategoriaFilter] = useState('todas');
  const [estadoFilter, setEstadoFilter] = useState('todos');

  const categorias = ['Alquiler', 'Equipamiento', 'Servicios', 'Mantenimiento', 'Sueldos', 'Otros'];

  // Filtering
  const filteredGastos = gastos.filter(g => {
    if (selectedSucursalId !== 'todas' && g.sucursalId !== selectedSucursalId) return false;
    if (categoriaFilter !== 'todas' && g.categoria !== categoriaFilter) return false;
    if (estadoFilter === 'pagado' && g.estado !== 'Pagado') return false;
    if (estadoFilter === 'pendiente' && g.estado !== 'Pendiente') return false;

    if (searchQuery) {
      return g.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    }

    return true;
  });

  // Totals
  const totalMonto = filteredGastos.reduce((acc, g) => acc + Number(g.monto), 0);
  const totalPagado = filteredGastos.filter(g => g.estado === 'Pagado').reduce((acc, g) => acc + Number(g.monto), 0);
  const totalPendiente = filteredGastos.filter(g => g.estado === 'Pendiente').reduce((acc, g) => acc + Number(g.monto), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Receipt className="w-6 h-6 text-indigo-400" />
            Control de Gastos & Recordatorios de Pago
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Administra alquileres, servicios, mantenimiento y compromisos financieros por sucursal.
          </p>
        </div>

        <button
          onClick={() => onOpenModal('gasto')}
          className="gradient-bg-accent text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/25 hover:opacity-90 transition-all cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Registrar Nuevo Gasto
        </button>
      </div>

      {/* Financial Summary Cards for Expenses */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gastos Totales</span>
          <div className="text-2xl font-extrabold text-white mt-1">
            ${totalMonto.toLocaleString('es-AR')}
          </div>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Monto Pagado</span>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">
            ${totalPagado.toLocaleString('es-AR')}
          </div>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-slate-800">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Pendiente de Pago</span>
          <div className="text-2xl font-extrabold text-rose-400 mt-1">
            ${totalPendiente.toLocaleString('es-AR')}
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Categoría:
          </span>
          <button
            onClick={() => setCategoriaFilter('todas')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              categoriaFilter === 'todas' ? 'bg-indigo-600 text-white' : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            Todas
          </button>
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaFilter(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                categoriaFilter === cat ? 'bg-indigo-600 text-white' : 'glass-card text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status filter buttons */}
        <div className="flex items-center gap-1.5 glass-card p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setEstadoFilter('todos')}
            className={`px-3 py-1 rounded-lg font-bold ${estadoFilter === 'todos' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
          >
            Todos
          </button>
          <button
            onClick={() => setEstadoFilter('pagado')}
            className={`px-3 py-1 rounded-lg font-bold ${estadoFilter === 'pagado' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
          >
            Pagados
          </button>
          <button
            onClick={() => setEstadoFilter('pendiente')}
            className={`px-3 py-1 rounded-lg font-bold ${estadoFilter === 'pendiente' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}
          >
            Pendientes
          </button>
        </div>
      </div>

      {/* Expense Items Table / Cards */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-4">Concepto / Descripción</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Sucursal</th>
                <th className="p-4">Monto</th>
                <th className="p-4">Fecha Vencimiento</th>
                <th className="p-4 text-center">Estado Pago</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {filteredGastos.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-400 font-medium">
                    No se encontraron registros de gastos con los filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredGastos.map((gst) => {
                  const suc = sucursales.find(s => s.id === gst.sucursalId);
                  const isPagado = gst.estado === 'Pagado';

                  return (
                    <tr key={gst.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold text-white">
                        <div className="flex items-center gap-2">
                          {gst.recordatorio && (
                            <Bell className="w-3.5 h-3.5 text-amber-400 shrink-0" title="Recordatorio activo" />
                          )}
                          <span>{gst.descripcion}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="bg-slate-800 text-indigo-300 font-semibold px-2.5 py-1 rounded-full text-xs border border-slate-700">
                          {gst.categoria}
                        </span>
                      </td>

                      <td className="p-4 text-slate-300">
                        {suc?.nombre || 'General / Global'}
                      </td>

                      <td className="p-4 font-extrabold text-white">
                        ${Number(gst.monto).toLocaleString('es-AR')}
                      </td>

                      <td className="p-4 text-slate-400">
                        {gst.fecha}
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => toggleGastoEstado(gst.id)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                            isPagado
                              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20'
                          }`}
                        >
                          {isPagado ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
                          {gst.estado}
                        </button>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onEditGasto(gst)}
                            className="p-2 glass-card hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-all"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteGasto(gst.id)}
                            className="p-2 glass-card hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 rounded-xl transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
