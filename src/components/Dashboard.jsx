import React from 'react';
import { useTrainCenter } from '../context/TrainCenterContext';
import {
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Receipt,
  UserCheck,
  UserX,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Plus
} from 'lucide-react';

export const Dashboard = ({ onOpenModal }) => {
  const {
    sucursales,
    alumnos,
    gastos,
    eventos,
    selectedSucursalId,
    setActiveTab,
    alerts,
    registrarPagoCuota
  } = useTrainCenter();

  // Filter based on selected branch
  const filteredSucursales = selectedSucursalId === 'todas'
    ? sucursales
    : sucursales.filter(s => s.id === selectedSucursalId);

  const filteredAlumnos = selectedSucursalId === 'todas'
    ? alumnos
    : alumnos.filter(a => a.sucursalId === selectedSucursalId);

  const filteredGastos = selectedSucursalId === 'todas'
    ? gastos
    : gastos.filter(g => g.sucursalId === selectedSucursalId);

  const filteredEventos = selectedSucursalId === 'todas'
    ? eventos
    : eventos.filter(e => e.sucursalId === selectedSucursalId);

  // Financial Metrics Calculation
  const totalAlumnos = filteredAlumnos.length;
  const alumnosAlDia = filteredAlumnos.filter(a => a.estadoCuota === 'Al día').length;
  const alumnosPendientes = filteredAlumnos.filter(a => a.estadoCuota === 'Pendiente').length;

  const ingresosEstimadosCuotas = filteredAlumnos.reduce((acc, a) => acc + (Number(a.montoCuota) || 0), 0);
  const ingresosCobrados = filteredAlumnos
    .filter(a => a.estadoCuota === 'Al día')
    .reduce((acc, a) => acc + (Number(a.montoCuota) || 0), 0);

  const totalGastos = filteredGastos.reduce((acc, g) => acc + (Number(g.monto) || 0), 0);
  const gastosPagados = filteredGastos.filter(g => g.estado === 'Pagado').reduce((acc, g) => acc + (Number(g.monto) || 0), 0);

  const balanceNeto = ingresosCobrados - totalGastos;

  const selectedSucursalNombre = selectedSucursalId === 'todas'
    ? 'Todas las Sucursales'
    : sucursales.find(s => s.id === selectedSucursalId)?.nombre || 'Sucursal Seleccionada';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner / Welcome */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Panel de Control & Resumen</h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm font-medium">
            Visualizando métricas e indicadores de: <span className="text-indigo-400 font-bold">{selectedSucursalNombre}</span>
          </p>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10 w-full md:w-auto">
          <button
            onClick={() => onOpenModal('alumno')}
            className="gradient-bg-accent text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 hover:opacity-90 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Nuevo Alumno
          </button>
          <button
            onClick={() => onOpenModal('gasto')}
            className="glass-card hover:bg-slate-800 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Receipt className="w-4 h-4 text-emerald-400" /> Registrar Gasto
          </button>
          <button
            onClick={() => onOpenModal('evento')}
            className="glass-card hover:bg-slate-800 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-purple-400" /> Crear Evento
          </button>
        </div>
      </div>

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Alumnos */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alumnos Registrados</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">{totalAlumnos}</div>
            <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-800">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" /> {alumnosAlDia} al día
              </span>
              <span className="text-rose-400 font-semibold flex items-center gap-1">
                <UserX className="w-3.5 h-3.5" /> {alumnosPendientes} pend.
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Ingresos Recaudados */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ingresos por Cuotas</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
              ${ingresosCobrados.toLocaleString('es-AR')}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 mt-2 pt-2 border-t border-slate-800">
              <span>Potencial total:</span>
              <span className="font-semibold text-slate-300">${ingresosEstimadosCuotas.toLocaleString('es-AR')}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Total Gastos */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gastos Totales</span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-400">
              ${totalGastos.toLocaleString('es-AR')}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 mt-2 pt-2 border-t border-slate-800">
              <span>Pagados:</span>
              <span className="font-semibold text-slate-300">${gastosPagados.toLocaleString('es-AR')}</span>
            </div>
          </div>
        </div>

        {/* Card 4: Balance Neto */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Balance Operativo</span>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              balanceNeto >= 0 ? 'bg-indigo-500/10 text-indigo-400' : 'bg-rose-500/10 text-rose-400'
            }`}>
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className={`text-2xl sm:text-3xl font-extrabold flex items-center gap-1 ${
              balanceNeto >= 0 ? 'text-indigo-400' : 'text-rose-400'
            }`}>
              {balanceNeto >= 0 ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />}
              ${balanceNeto.toLocaleString('es-AR')}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 mt-2 pt-2 border-t border-slate-800">
              <span>Sucursales activas:</span>
              <span className="font-semibold text-slate-300">{filteredSucursales.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Grid: Financial Breakdown by Branch & Urgent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Branch Balance Comparison */}
        <div className="lg:col-span-2 glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-400" />
                Desglose Financiero por Sucursal
              </h3>
              <p className="text-xs text-slate-400">Comparativa de recaudación por cuotas vs gastos generales</p>
            </div>
            <button
              onClick={() => setActiveTab('sucursales')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              Ver todas →
            </button>
          </div>

          <div className="space-y-4 pt-2">
            {filteredSucursales.map((suc) => {
              const sucAlumnos = alumnos.filter(a => a.sucursalId === suc.id);
              const sucIngresos = sucAlumnos.filter(a => a.estadoCuota === 'Al día').reduce((acc, a) => acc + (Number(a.montoCuota) || 0), 0);
              const sucGastos = gastos.filter(g => g.sucursalId === suc.id).reduce((acc, g) => acc + (Number(g.monto) || 0), 0);
              const totalOp = sucIngresos + sucGastos || 1;
              const ingresosPercent = Math.min(100, Math.round((sucIngresos / totalOp) * 100));

              return (
                <div key={suc.id} className="glass-card p-4 rounded-2xl border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      {suc.nombre}
                    </div>
                    <div className="text-slate-400 text-xs">
                      {sucAlumnos.length} alumnos • Alquiler: <span className={suc.estadoAlquiler === 'Al día' ? 'text-emerald-400' : 'text-rose-400'}>{suc.estadoAlquiler}</span>
                    </div>
                  </div>

                  {/* Progress bar visual */}
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800">
                    <div
                      style={{ width: `${ingresosPercent}%` }}
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500"
                      title={`Ingresos: $${sucIngresos.toLocaleString('es-AR')}`}
                    />
                    <div
                      style={{ width: `${100 - ingresosPercent}%` }}
                      className="bg-gradient-to-r from-rose-500 to-amber-500 h-full transition-all duration-500"
                      title={`Gastos: $${sucGastos.toLocaleString('es-AR')}`}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 text-slate-300">
                    <span className="text-emerald-400 font-semibold">
                      Ingresos: ${sucIngresos.toLocaleString('es-AR')}
                    </span>
                    <span className="text-rose-400 font-semibold">
                      Gastos: ${sucGastos.toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Urgent Alerts & Reminders */}
        <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Alertas Prioritarias
              </h3>
              <span className="text-xs bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full font-bold">
                {alerts.length}
              </span>
            </div>

            {alerts.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-80" />
                <p className="text-sm font-semibold">¡Todo al día!</p>
                <p className="text-xs text-slate-500 mt-1">No hay vencimientos de cuotas ni pagos atrasados.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                {alerts.slice(0, 5).map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-2xl border text-xs space-y-1.5 transition-all ${
                      alert.severidad === 'alta'
                        ? 'bg-rose-950/20 border-rose-800/40 text-rose-200'
                        : 'bg-amber-950/20 border-amber-800/40 text-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span>{alert.titulo}</span>
                      {alert.tipo === 'cuota_vencida' && alert.targetId && (
                        <button
                          onClick={() => registrarPagoCuota(alert.targetId)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-0.5 rounded text-[10px] font-bold"
                        >
                          Cobrar
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] opacity-80">{alert.mensaje}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveTab('alumnos')}
            className="w-full py-2.5 glass-card hover:bg-slate-800 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer mt-4"
          >
            Gestionar Cuotas de Alumnos →
          </button>
        </div>
      </div>

      {/* Bottom Grid: Quick Upcoming Events */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              Próximos Eventos & Torneos
            </h3>
            <p className="text-xs text-slate-400">Eventos programados con registro de participantes y balance</p>
          </div>
          <button
            onClick={() => setActiveTab('eventos')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
          >
            Ver todos ({eventos.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {filteredEventos.map((evt) => {
            const suc = sucursales.find(s => s.id === evt.sucursalId);
            const totalPagados = evt.participantes.filter(p => p.estadoPago === 'Pagado').length;
            const recaudado = totalPagados * (Number(evt.costoInscripcion) || 0);

            return (
              <div key={evt.id} className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                      {evt.fecha} • {evt.hora} hs
                    </span>
                    <span className="text-xs text-slate-400">{suc?.nombre}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-tight">{evt.nombre}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{evt.descripcion}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="text-slate-300 font-medium">
                    👥 Inscriptos: <span className="font-bold text-white">{evt.participantes.length}</span> ({totalPagados} pagados)
                  </div>
                  <div className="text-emerald-400 font-bold">
                    Recaudado: ${recaudado.toLocaleString('es-AR')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
