import React from 'react';
import { useTrainCenter } from '../context/TrainCenterContext';
import {
  LayoutDashboard,
  Users,
  Building2,
  Receipt,
  Calendar,
  Dumbbell,
  Database,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, alerts, alumnos, gastos, eventos } = useTrainCenter();

  // Badges
  const cuotasPendientesCount = alumnos.filter(a => a.estadoCuota === 'Pendiente').length;
  const gastosPendientesCount = gastos.filter(g => g.estado === 'Pendiente').length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Vista General',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'alumnos',
      label: 'Alumnos & Cuotas',
      icon: Users,
      badge: cuotasPendientesCount > 0 ? `${cuotasPendientesCount} pend.` : null,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
    },
    {
      id: 'sucursales',
      label: 'Sucursales',
      icon: Building2,
      badge: null
    },
    {
      id: 'gastos',
      label: 'Registro de Gastos',
      icon: Receipt,
      badge: gastosPendientesCount > 0 ? `${gastosPendientesCount}` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      id: 'eventos',
      label: 'Eventos & Torneos',
      icon: Calendar,
      badge: `${eventos.length}`,
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
    },
    {
      id: 'rutinas',
      label: 'Rutinas & Ejercicios',
      icon: Dumbbell,
      badge: null
    },
    {
      id: 'config',
      label: 'Respaldos & Config',
      icon: Database,
      badge: null
    }
  ];

  return (
    <aside className="w-full lg:w-64 glass-panel border-r border-slate-800 shrink-0 p-4 lg:min-h-[calc(100vh-65px)]">
      <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
        <p className="hidden lg:block text-[11px] font-bold tracking-wider text-slate-400 uppercase px-3 py-2">
          Navegación Principal
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-indigo-600/90 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span className="flex-1 text-left">{item.label}</span>

              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Dynamic Summary Card on sidebar desktop bottom */}
      <div className="hidden lg:block mt-8 p-4 glass-card rounded-2xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none text-indigo-400">
          <TrendingUp className="w-24 h-24" />
        </div>
        <div className="flex items-center gap-2 text-indigo-400 mb-1">
          <AlertCircle className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Estado Global</span>
        </div>
        <p className="text-xs text-slate-300 font-medium leading-relaxed">
          {cuotasPendientesCount === 0
            ? '✅ Todas las cuotas de alumnos están al día.'
            : `⚠️ ${cuotasPendientesCount} alumno(s) con cuota vencida.`}
        </p>
      </div>
    </aside>
  );
};
