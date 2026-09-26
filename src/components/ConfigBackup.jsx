import React, { useRef } from 'react';
import { useTrainCenter } from '../context/TrainCenterContext';
import {
  Database,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  Building2,
  Users,
  Receipt,
  Calendar,
  Dumbbell
} from 'lucide-react';

export const ConfigBackup = () => {
  const {
    sucursales,
    alumnos,
    gastos,
    eventos,
    ejercicios,
    rutinas,
    resetDemoData,
    exportBackupJSON,
    importBackupJSON
  } = useTrainCenter();

  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      importBackupJSON(event.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Banner Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
          <Database className="w-6 h-6 text-indigo-400" />
          Administración del Sistema & Copias de Seguridad
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Exporta tu base de datos a formato JSON, restaura respaldos previos o reinicia la demostración.
        </p>
      </div>

      {/* Database Statistics */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">Estado y Estadísticas de Almacenamiento</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <div className="text-slate-400 flex items-center gap-1.5 font-bold">
              <Building2 className="w-4 h-4 text-indigo-400" /> Sucursales
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">{sucursales.length}</div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <div className="text-slate-400 flex items-center gap-1.5 font-bold">
              <Users className="w-4 h-4 text-indigo-400" /> Alumnos Total
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">{alumnos.length}</div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <div className="text-slate-400 flex items-center gap-1.5 font-bold">
              <Receipt className="w-4 h-4 text-emerald-400" /> Gastos Cargados
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">{gastos.length}</div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <div className="text-slate-400 flex items-center gap-1.5 font-bold">
              <Calendar className="w-4 h-4 text-purple-400" /> Eventos
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">{eventos.length}</div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <div className="text-slate-400 flex items-center gap-1.5 font-bold">
              <Dumbbell className="w-4 h-4 text-amber-400" /> Ejercicios
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">{ejercicios.length}</div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800">
            <div className="text-slate-400 flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 text-teal-400" /> Rutinas Guardadas
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">{rutinas.length}</div>
          </div>
        </div>
      </div>

      {/* Backup and Restore Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Exportar Respaldo Completo</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Descarga un archivo JSON con la información actualizada de sucursales, cuotas, gastos, eventos y ejercicios.
            </p>
          </div>

          <button
            onClick={exportBackupJSON}
            className="w-full gradient-bg-accent text-white py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 hover:opacity-90 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" /> Descargar Copia JSON
          </button>
        </div>

        {/* Import Card */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Restaurar desde Archivo</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Carga un archivo JSON previamente exportado para recuperar todos tus datos y configuraciones.
            </p>
          </div>

          <input
            type="file"
            accept=".json"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4 text-emerald-400" /> Cargar Archivo JSON
          </button>
        </div>
      </div>

      {/* Danger Zone: Reset Data */}
      <div className="glass-panel p-6 rounded-3xl border border-rose-900/40 bg-rose-950/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-rose-300">Restablecer Datos de Demostración</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Reinicia toda la base de datos a los valores iniciales predeterminados de TrainCenter.
            </p>
          </div>

          <button
            onClick={resetDemoData}
            className="bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reiniciar a Demo
          </button>
        </div>
      </div>
    </div>
  );
};
