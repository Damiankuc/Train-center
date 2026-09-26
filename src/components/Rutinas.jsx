import React, { useState } from 'react';
import { useTrainCenter } from '../context/TrainCenterContext';
import {
  Dumbbell,
  Plus,
  Play,
  ExternalLink,
  BookOpen,
  Filter,
  Trash2,
  Edit2,
  Printer,
  Share2,
  CheckCircle2,
  Video,
  ChevronDown
} from 'lucide-react';

export const Rutinas = ({ onOpenModal, onViewVideo }) => {
  const {
    ejercicios,
    rutinas,
    deleteEjercicio,
    deleteRutina,
    alumnos,
    searchQuery
  } = useTrainCenter();

  const [activeSubTab, setActiveSubTab] = useState('ejercicios'); // 'ejercicios' or 'rutinas'
  const [selectedMuscle, setSelectedMuscle] = useState('todos');

  const muscleGroups = ['Pecho', 'Espalda', 'Piernas', 'Hombros', 'Brazos', 'Core/Cardio'];

  // Filter ejercicios
  const filteredEjercicios = ejercicios.filter(e => {
    if (selectedMuscle !== 'todos' && !e.grupoMuscular.toLowerCase().includes(selectedMuscle.toLowerCase())) return false;
    if (searchQuery) {
      return e.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
             e.grupoMuscular.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  // Filter rutinas
  const filteredRutinas = rutinas.filter(r => {
    if (searchQuery) {
      return r.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
             r.objetivo.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const handlePrintRoutine = (rutina) => {
    const printWindow = window.open('', '_blank');
    const ejerciciosList = rutina.ejercicios.map(item => {
      const ej = ejercicios.find(e => e.id === item.ejercicioId);
      return `
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 10px; font-weight: bold;">${ej?.nombre || 'Ejercicio'}</td>
          <td style="padding: 10px;">${ej?.grupoMuscular || '-'}</td>
          <td style="padding: 10px; text-align: center;">${item.series}</td>
          <td style="padding: 10px; text-align: center;">${item.repeticiones}</td>
          <td style="padding: 10px; text-align: center;">${item.descanso}</td>
          <td style="padding: 10px; font-size: 12px; color: #555;">${item.notas || '-'}</td>
        </tr>
      `;
    }).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Ficha de Rutina - ${rutina.nombre}</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #111; }
            h1 { color: #4f46e5; margin-bottom: 5px; }
            .header-box { background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th { background: #4f46e5; color: white; padding: 10px; text-align: left; }
          </style>
        </head>
        <body>
          <h1>TrainCenter - Ficha de Entrenamiento</h1>
          <div class="header-box">
            <h2>${rutina.nombre}</h2>
            <p><strong>Objetivo:</strong> ${rutina.objetivo} | <strong>Nivel:</strong> ${rutina.nivel} | <strong>Frecuencia:</strong> ${rutina.frecuencia}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Ejercicio</th>
                <th>Grupo</th>
                <th>Series</th>
                <th>Reps</th>
                <th>Descanso</th>
                <th>Notas / Indicaciones</th>
              </tr>
            </thead>
            <tbody>
              ${ejerciciosList}
            </tbody>
          </table>
          <p style="margin-top: 30px; font-size: 11px; text-align: center; color: #888;">Impreso desde TrainCenter System</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner & Subtab Selector */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-indigo-400" />
            Rutinas & Banco de Ejercicios
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Biblioteca de ejercicios con videos explicativos y creador de rutinas personalizadas.
          </p>
        </div>

        {/* Subtabs Switcher */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 w-full md:w-auto">
          <button
            onClick={() => setActiveSubTab('ejercicios')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeSubTab === 'ejercicios'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" /> Banco Ejercicios ({ejercicios.length})
          </button>
          <button
            onClick={() => setActiveSubTab('rutinas')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeSubTab === 'rutinas'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Plantillas Rutinas ({rutinas.length})
          </button>
        </div>
      </div>

      {/* --- SUBTAB 1: BANCO DE EJERCICIOS --- */}
      {activeSubTab === 'ejercicios' && (
        <div className="space-y-6 animate-fade-in">
          {/* Controls Bar */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Muscle group filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs font-bold text-slate-400 shrink-0">Grupo:</span>
              <button
                onClick={() => setSelectedMuscle('todos')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  selectedMuscle === 'todos' ? 'bg-indigo-600 text-white' : 'glass-card text-slate-400 hover:text-white'
                }`}
              >
                Todos
              </button>
              {muscleGroups.map(m => (
                <button
                  key={m}
                  onClick={() => setSelectedMuscle(m)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                    selectedMuscle === m ? 'bg-indigo-600 text-white' : 'glass-card text-slate-400 hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <button
              onClick={() => onOpenModal('ejercicio')}
              className="gradient-bg-accent text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md hover:opacity-90 transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Nuevo Ejercicio
            </button>
          </div>

          {/* Grid of Exercise Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEjercicios.map((ej) => (
              <div
                key={ej.id}
                className="glass-card rounded-3xl border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                      {ej.grupoMuscular}
                    </span>
                    <button
                      onClick={() => deleteEjercicio(ej.id)}
                      className="p-1.5 glass-card hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 rounded-xl"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-base font-extrabold text-white leading-snug">{ej.nombre}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{ej.descripcion}</p>

                  <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                    <span>🏋️ {ej.equipamiento}</span>
                    <span>•</span>
                    <span>⚡ Nivel: {ej.dificultad || 'Intermedio'}</span>
                  </div>
                </div>

                {/* Video action button */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  {ej.videoUrl ? (
                    <button
                      onClick={() => onViewVideo(ej)}
                      className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-indigo-400 text-indigo-400" /> Ver Demostración en Video
                    </button>
                  ) : (
                    <span className="text-xs text-slate-500 italic">Sin video adjunto</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- SUBTAB 2: PLANTILLAS DE RUTINAS --- */}
      {activeSubTab === 'rutinas' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Biblioteca de Rutinas Programadas</h3>
            <button
              onClick={() => onOpenModal('rutina')}
              className="gradient-bg-accent text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md hover:opacity-90 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Crear Nueva Rutina
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRutinas.map((rut) => (
              <div
                key={rut.id}
                className="glass-card rounded-3xl border border-slate-800 p-6 space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                        {rut.frecuencia}
                      </span>
                      <h3 className="text-lg font-extrabold text-white mt-1.5">{rut.nombre}</h3>
                      <p className="text-xs text-indigo-300 font-medium">🎯 {rut.objetivo}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handlePrintRoutine(rut)}
                        className="p-2 glass-card hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl"
                        title="Imprimir / Exportar Ficha"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteRutina(rut.id)}
                        className="p-2 glass-card hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 rounded-xl"
                        title="Eliminar rutina"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Exercise list in routine */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Secuencia de Ejercicios:</p>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {rut.ejercicios.map((item, idx) => {
                        const ejInfo = ejercicios.find(e => e.id === item.ejercicioId);

                        return (
                          <div key={idx} className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between text-xs">
                            <div>
                              <span className="font-bold text-white">{ejInfo?.nombre || 'Ejercicio'}</span>
                              <span className="text-[11px] text-slate-400 ml-2">({ejInfo?.grupoMuscular})</span>
                              {item.notas && <p className="text-[11px] text-slate-400 italic mt-0.5">{item.notas}</p>}
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-extrabold text-indigo-400">{item.series}x{item.repeticiones}</span>
                              <span className="text-[10px] text-slate-500 block">Descanso: {item.descanso}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">
                    Alumnos asignados: <strong className="text-white">{alumnos.filter(a => a.rutinaAsignadaId === rut.id).length}</strong>
                  </span>
                  <button
                    onClick={() => handlePrintRoutine(rut)}
                    className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                  >
                    Imprimir Ficha PDF →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
