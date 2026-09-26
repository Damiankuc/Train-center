import React, { useState } from 'react';
import { useTrainCenter } from '../context/TrainCenterContext';
import {
  Dumbbell,
  Building2,
  Bell,
  Search,
  Plus,
  RefreshCw,
  Download,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  DollarSign
} from 'lucide-react';

export const Header = ({ onOpenNewModal }) => {
  const {
    sucursales,
    selectedSucursalId,
    setSelectedSucursalId,
    searchQuery,
    setSearchQuery,
    alerts,
    activeTab,
    setActiveTab,
    resetDemoData,
    exportBackupJSON
  } = useTrainCenter();

  const [showAlertsMenu, setShowAlertsMenu] = useState(false);

  const highAlertsCount = alerts.filter(a => a.severidad === 'alta').length;

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800 px-4 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
      {/* Brand logo & title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-bg-accent flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
          <Dumbbell className="w-5 h-5 transform -rotate-45" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold tracking-tight text-white m-0">Train<span className="gradient-text-primary">Center</span></h1>
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs px-2 py-0.5 rounded-full font-medium">v2.5 Pro</span>
          </div>
          <p className="text-xs text-slate-400 font-medium">Red de Sucursales & Gestión Deportiva</p>
        </div>
      </div>

      {/* Global Controls: Branch Selector & Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl mx-auto">
        {/* Branch Selector */}
        <div className="relative min-w-[160px] sm:min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Building2 className="w-4 h-4" />
          </div>
          <select
            value={selectedSucursalId}
            onChange={(e) => setSelectedSucursalId(e.target.value)}
            className="w-full pl-9 pr-8 py-2 glass-input text-xs sm:text-sm rounded-xl appearance-none font-medium cursor-pointer transition-all hover:border-slate-600 focus:outline-none"
          >
            <option value="todas" className="bg-slate-900 text-white">🏢 Todas las sucursales ({sucursales.length})</option>
            {sucursales.map(s => (
              <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                📍 {s.nombre}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 text-xs">
            ▼
          </div>
        </div>

        {/* Global Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Buscar alumno (DNI, nombre), gasto, evento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 glass-input text-xs sm:text-sm rounded-xl focus:outline-none transition-all placeholder:text-slate-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Quick Actions & Notifications */}
      <div className="flex items-center gap-2.5">
        {/* Quick New Modal Launcher */}
        {onOpenNewModal && (
          <button
            onClick={onOpenNewModal}
            className="gradient-bg-accent text-white hover:opacity-90 font-semibold px-3.5 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-indigo-600/25 transition-all transform active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nuevo Registro</span>
          </button>
        )}

        {/* Notifications Dropdown Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowAlertsMenu(!showAlertsMenu)}
            className="relative p-2.5 glass-card hover:bg-slate-800/80 rounded-xl text-slate-300 transition-all border border-slate-700/60 cursor-pointer"
            title="Recordatorios y Alertas Automáticas"
          >
            <Bell className="w-4 h-4" />
            {alerts.length > 0 && (
              <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white shadow-sm ${
                highAlertsCount > 0 ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'
              }`}>
                {alerts.length}
              </span>
            )}
          </button>

          {/* Alerts Popup Card */}
          {showAlertsMenu && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-panel rounded-2xl shadow-2xl border border-slate-700/80 p-4 z-50 animate-fade-in max-h-[480px] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-sm font-bold text-white">Recordatorios y Alertas</h3>
                </div>
                <span className="text-xs bg-indigo-500/20 text-indigo-300 font-semibold px-2 py-0.5 rounded-full">
                  {alerts.length} activas
                </span>
              </div>

              {alerts.length === 0 ? (
                <div className="text-center py-6 text-slate-400">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
                  <p className="text-xs font-medium">¡Sin alertas pendientes!</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Todas las cuotas y alquileres están al día.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      onClick={() => {
                        setActiveTab(alert.actionTab);
                        setShowAlertsMenu(false);
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer hover:translate-x-0.5 ${
                        alert.severidad === 'alta'
                          ? 'bg-rose-950/30 border-rose-800/50 hover:border-rose-700 text-rose-200'
                          : alert.severidad === 'media'
                          ? 'bg-amber-950/30 border-amber-800/50 hover:border-amber-700 text-amber-200'
                          : 'bg-indigo-950/30 border-indigo-800/50 hover:border-indigo-700 text-indigo-200'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${
                          alert.severidad === 'alta' ? 'text-rose-400' : 'text-amber-400'
                        }`} />
                        <div>
                          <p className="text-xs font-semibold leading-tight">{alert.titulo}</p>
                          <p className="text-[11px] opacity-80 mt-1">{alert.mensaje}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Utility Tools Dropdown / Export */}
        <button
          onClick={exportBackupJSON}
          className="p-2.5 glass-card hover:bg-slate-800/80 rounded-xl text-slate-300 transition-all border border-slate-700/60 cursor-pointer hidden sm:flex"
          title="Exportar Respaldo JSON"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
