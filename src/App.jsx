import React, { useState } from 'react';
import { TrainCenterProvider, useTrainCenter } from './context/TrainCenterContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Sucursales } from './components/Sucursales';
import { Alumnos } from './components/Alumnos';
import { Gastos } from './components/Gastos';
import { Eventos } from './components/Eventos';
import { Rutinas } from './components/Rutinas';
import { ConfigBackup } from './components/ConfigBackup';
import { Toast } from './components/Toast';
import {
  ModalSucursal,
  ModalAlumno,
  ModalGasto,
  ModalEvento,
  ModalParticipanteEvento,
  ModalGastoEvento,
  ModalEjercicio,
  ModalRutina,
  ModalVideoPlayer
} from './components/Modals';

const MainContent = () => {
  const { activeTab, setActiveTab } = useTrainCenter();

  // Modals state
  const [modalState, setModalState] = useState({
    sucursal: false,
    alumno: false,
    gasto: false,
    evento: false,
    participanteEvento: false,
    gastoEvento: false,
    ejercicio: false,
    rutina: false,
    video: false,
    quickSelector: false
  });

  const [editData, setEditData] = useState(null);
  const [targetEventoId, setTargetEventoId] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  const openModal = (type, data = null) => {
    setEditData(data);
    setModalState(prev => ({ ...prev, [type]: true, quickSelector: false }));
  };

  const closeModal = (type) => {
    setModalState(prev => ({ ...prev, [type]: false }));
    setEditData(null);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      {/* Top Bar Header */}
      <Header onOpenNewModal={() => setModalState(prev => ({ ...prev, quickSelector: true }))} />

      {/* Main Layout Container */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Main Content View Area */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && <Dashboard onOpenModal={openModal} />}
          {activeTab === 'sucursales' && (
            <Sucursales
              onOpenModal={openModal}
              onEditSucursal={(suc) => openModal('sucursal', suc)}
            />
          )}
          {activeTab === 'alumnos' && (
            <Alumnos
              onOpenModal={openModal}
              onEditAlumno={(alum) => openModal('alumno', alum)}
              onViewRoutine={(rutina) => {
                setActiveTab('rutinas');
              }}
            />
          )}
          {activeTab === 'gastos' && (
            <Gastos
              onOpenModal={openModal}
              onEditGasto={(gst) => openModal('gasto', gst)}
            />
          )}
          {activeTab === 'eventos' && (
            <Eventos
              onOpenModal={openModal}
              onEditEvento={(evt) => openModal('evento', evt)}
              onOpenAddParticipant={(eventoId) => {
                setTargetEventoId(eventoId);
                setModalState(prev => ({ ...prev, participanteEvento: true }));
              }}
              onOpenAddEventExpense={(eventoId) => {
                setTargetEventoId(eventoId);
                setModalState(prev => ({ ...prev, gastoEvento: true }));
              }}
            />
          )}
          {activeTab === 'rutinas' && (
            <Rutinas
              onOpenModal={openModal}
              onViewVideo={(ej) => {
                setSelectedExercise(ej);
                setModalState(prev => ({ ...prev, video: true }));
              }}
            />
          )}
          {activeTab === 'config' && <ConfigBackup />}
        </main>
      </div>

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-800 text-center py-4 text-xs text-slate-500">
        TrainCenter v2.5 • Sistema de Gestión de Sucursales de Entrenamiento Físico © {new Date().getFullYear()}
      </footer>

      {/* Toast floating notifications */}
      <Toast />

      {/* Quick Registration Selector Dialog */}
      {modalState.quickSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel rounded-3xl border border-slate-700/80 p-6 w-full max-w-md space-y-4 text-center shadow-2xl">
            <h3 className="text-lg font-extrabold text-white">¿Qué deseas registrar?</h3>
            <p className="text-xs text-slate-400">Selecciona el tipo de entidad que deseas dar de alta en el sistema:</p>

            <div className="grid grid-cols-2 gap-3 text-xs font-bold pt-2">
              <button
                onClick={() => openModal('alumno')}
                className="p-4 rounded-2xl glass-card hover:bg-indigo-600 hover:text-white border border-slate-700 transition-all text-slate-200 cursor-pointer"
              >
                👤 Nuevo Alumno
              </button>
              <button
                onClick={() => openModal('gasto')}
                className="p-4 rounded-2xl glass-card hover:bg-emerald-600 hover:text-white border border-slate-700 transition-all text-slate-200 cursor-pointer"
              >
                🧾 Registrar Gasto
              </button>
              <button
                onClick={() => openModal('evento')}
                className="p-4 rounded-2xl glass-card hover:bg-purple-600 hover:text-white border border-slate-700 transition-all text-slate-200 cursor-pointer"
              >
                📅 Crear Evento
              </button>
              <button
                onClick={() => openModal('sucursal')}
                className="p-4 rounded-2xl glass-card hover:bg-blue-600 hover:text-white border border-slate-700 transition-all text-slate-200 cursor-pointer"
              >
                🏢 Nueva Sucursal
              </button>
              <button
                onClick={() => openModal('ejercicio')}
                className="p-4 rounded-2xl glass-card hover:bg-amber-600 hover:text-white border border-slate-700 transition-all text-slate-200 cursor-pointer"
              >
                🏋️ Nuevo Ejercicio
              </button>
              <button
                onClick={() => openModal('rutina')}
                className="p-4 rounded-2xl glass-card hover:bg-teal-600 hover:text-white border border-slate-700 transition-all text-slate-200 cursor-pointer"
              >
                📋 Crear Rutina
              </button>
            </div>

            <button
              onClick={() => closeModal('quickSelector')}
              className="mt-4 text-xs font-bold text-slate-400 hover:text-white py-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Form Modals */}
      <ModalSucursal isOpen={modalState.sucursal} onClose={() => closeModal('sucursal')} editData={editData} />
      <ModalAlumno isOpen={modalState.alumno} onClose={() => closeModal('alumno')} editData={editData} />
      <ModalGasto isOpen={modalState.gasto} onClose={() => closeModal('gasto')} editData={editData} />
      <ModalEvento isOpen={modalState.evento} onClose={() => closeModal('evento')} editData={editData} />
      <ModalParticipanteEvento isOpen={modalState.participanteEvento} onClose={() => closeModal('participanteEvento')} eventoId={targetEventoId} />
      <ModalGastoEvento isOpen={modalState.gastoEvento} onClose={() => closeModal('gastoEvento')} eventoId={targetEventoId} />
      <ModalEjercicio isOpen={modalState.ejercicio} onClose={() => closeModal('ejercicio')} />
      <ModalRutina isOpen={modalState.rutina} onClose={() => closeModal('rutina')} />
      <ModalVideoPlayer isOpen={modalState.video} onClose={() => closeModal('video')} exercise={selectedExercise} />
    </div>
  );
};

export default function App() {
  return (
    <TrainCenterProvider>
      <MainContent />
    </TrainCenterProvider>
  );
}
