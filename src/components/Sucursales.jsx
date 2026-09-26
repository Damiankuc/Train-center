import React, { useState } from 'react';
import { useTrainCenter } from '../context/TrainCenterContext';
import {
  Building2,
  MapPin,
  Phone,
  UserCheck,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Users,
  Search
} from 'lucide-react';

export const Sucursales = ({ onOpenModal, onEditSucursal }) => {
  const {
    sucursales,
    alumnos,
    gastos,
    updateSucursal,
    deleteSucursal,
    setSelectedSucursalId,
    setActiveTab,
    searchQuery
  } = useTrainCenter();

  const [filterSearch, setFilterSearch] = useState('');

  // Filter sucursales based on search query or header query
  const query = filterSearch || searchQuery;
  const filteredSucursales = sucursales.filter(s =>
    s.nombre.toLowerCase().includes(query.toLowerCase()) ||
    s.direccion.toLowerCase().includes(query.toLowerCase()) ||
    s.encargado.toLowerCase().includes(query.toLowerCase())
  );

  const handleToggleAlquiler = (suc) => {
    const nextEstado = suc.estadoAlquiler === 'Al día' ? 'Pendiente' : 'Al día';
    updateSucursal(suc.id, { estadoAlquiler: nextEstado });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header section */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-400" />
            Gestión de Sucursales
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Administra tus sedes de entrenamiento, cobro de alquileres y alumnos asignados.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar sucursal..."
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 glass-input text-xs rounded-xl focus:outline-none"
            />
          </div>
          <button
            onClick={() => onOpenModal('sucursal')}
            className="gradient-bg-accent text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20 hover:opacity-90 transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Nueva Sucursal
          </button>
        </div>
      </div>

      {/* Grid of Sucursal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSucursales.map((suc) => {
          // Calculations per branch
          const sucAlumnos = alumnos.filter(a => a.sucursalId === suc.id);
          const alumnosAlDia = sucAlumnos.filter(a => a.estadoCuota === 'Al día').length;
          const ingresosCobrados = sucAlumnos
            .filter(a => a.estadoCuota === 'Al día')
            .reduce((acc, a) => acc + (Number(a.montoCuota) || 0), 0);

          const sucGastos = gastos.filter(g => g.sucursalId === suc.id);
          const totalGastos = sucGastos.reduce((acc, g) => acc + (Number(g.monto) || 0), 0);
          const balance = ingresosCobrados - totalGastos;

          return (
            <div
              key={suc.id}
              className="glass-card rounded-3xl border border-slate-800 p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-all group"
            >
              <div className="space-y-4">
                {/* Title & Actions */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                      Sede Activa
                    </span>
                    <h3 className="text-lg font-extrabold text-white mt-1.5">{suc.nombre}</h3>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditSucursal(suc)}
                      className="p-2 glass-card hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-all"
                      title="Editar sucursal"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteSucursal(suc.id)}
                      className="p-2 glass-card hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 rounded-xl transition-all"
                      title="Eliminar sucursal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Branch Metadata Info */}
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{suc.direccion}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{suc.telefono}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Encargado: <strong className="text-white">{suc.encargado}</strong></span>
                  </div>
                </div>

                {/* Rent Status Widget */}
                <div className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs transition-all ${
                  suc.estadoAlquiler === 'Al día'
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                    : 'bg-rose-950/20 border-rose-800/40 text-rose-300'
                }`}>
                  <div>
                    <div className="font-bold flex items-center gap-1.5">
                      {suc.estadoAlquiler === 'Al día' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                      )}
                      Alquiler: ${suc.alquilerMensual.toLocaleString('es-AR')}
                    </div>
                    <p className="text-[11px] opacity-80 mt-0.5">
                      Vence día {suc.diaVencimientoAlquiler} de cada mes
                    </p>
                  </div>

                  <button
                    onClick={() => handleToggleAlquiler(suc)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                      suc.estadoAlquiler === 'Al día'
                        ? 'bg-emerald-800/40 hover:bg-emerald-700/60 text-emerald-200 border border-emerald-600/40'
                        : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30'
                    }`}
                  >
                    {suc.estadoAlquiler === 'Al día' ? 'Al día ✓' : 'Marcar Pagado'}
                  </button>
                </div>

                {/* Branch Stats summary grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                  <div className="glass-card p-3 rounded-xl border border-slate-800">
                    <div className="text-slate-400 flex items-center gap-1 text-[11px]">
                      <Users className="w-3.5 h-3.5 text-indigo-400" /> Alumnos
                    </div>
                    <div className="text-base font-extrabold text-white mt-1">
                      {sucAlumnos.length} <span className="text-[11px] text-emerald-400 font-semibold">({alumnosAlDia} al día)</span>
                    </div>
                  </div>

                  <div className="glass-card p-3 rounded-xl border border-slate-800">
                    <div className="text-slate-400 flex items-center gap-1 text-[11px]">
                      <Receipt className="w-3.5 h-3.5 text-rose-400" /> Gastos Sede
                    </div>
                    <div className="text-base font-extrabold text-rose-400 mt-1">
                      ${totalGastos.toLocaleString('es-AR')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer action: view filtered students */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className={`text-xs font-extrabold ${balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  Neto: ${balance.toLocaleString('es-AR')}
                </span>
                <button
                  onClick={() => {
                    setSelectedSucursalId(suc.id);
                    setActiveTab('alumnos');
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  Ver Alumnos →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
