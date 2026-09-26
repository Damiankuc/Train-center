import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  INITIAL_SUCURSALES,
  INITIAL_ALUMNOS,
  INITIAL_GASTOS,
  INITIAL_EVENTOS,
  INITIAL_EJERCICIOS,
  INITIAL_RUTINAS
} from '../data/initialData';

const TrainCenterContext = createContext();

export const useTrainCenter = () => {
  const context = useContext(TrainCenterContext);
  if (!context) {
    throw new Error('useTrainCenter must be used within a TrainCenterProvider');
  }
  return context;
};

// Helper for LocalStorage
const getStorageItem = (key, fallback) => {
  try {
    const saved = localStorage.getItem(`traincenter_${key}`);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    console.error(`Error loading ${key} from localStorage`, e);
    return fallback;
  }
};

const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(`traincenter_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
};

export const TrainCenterProvider = ({ children }) => {
  // Main State
  const [sucursales, setSucursales] = useState(() => getStorageItem('sucursales', INITIAL_SUCURSALES));
  const [alumnos, setAlumnos] = useState(() => getStorageItem('alumnos', INITIAL_ALUMNOS));
  const [gastos, setGastos] = useState(() => getStorageItem('gastos', INITIAL_GASTOS));
  const [eventos, setEventos] = useState(() => getStorageItem('eventos', INITIAL_EVENTOS));
  const [ejercicios, setEjercicios] = useState(() => getStorageItem('ejercicios', INITIAL_EJERCICIOS));
  const [rutinas, setRutinas] = useState(() => getStorageItem('rutinas', INITIAL_RUTINAS));

  // UI State
  const [selectedSucursalId, setSelectedSucursalId] = useState('todas');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastNotification, setToastNotification] = useState(null);

  // Auto-Save Effect
  useEffect(() => { setStorageItem('sucursales', sucursales); }, [sucursales]);
  useEffect(() => { setStorageItem('alumnos', alumnos); }, [alumnos]);
  useEffect(() => { setStorageItem('gastos', gastos); }, [gastos]);
  useEffect(() => { setStorageItem('eventos', eventos); }, [eventos]);
  useEffect(() => { setStorageItem('ejercicios', ejercicios); }, [ejercicios]);
  useEffect(() => { setStorageItem('rutinas', rutinas); }, [rutinas]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToastNotification({ id: Date.now(), message, type });
    setTimeout(() => {
      setToastNotification(null);
    }, 4000);
  };

  // --- SUCURSALES CRUD ---
  const addSucursal = (data) => {
    const newSucursal = {
      id: `suc-${Date.now()}`,
      estadoAlquiler: 'Al día',
      ...data
    };
    setSucursales(prev => [...prev, newSucursal]);
    showToast(`Sucursal "${data.nombre}" creada con éxito.`);
  };

  const updateSucursal = (id, data) => {
    setSucursales(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    showToast('Sucursal actualizada correctamente.');
  };

  const deleteSucursal = (id) => {
    const numAlumnos = alumnos.filter(a => a.sucursalId === id).length;
    if (numAlumnos > 0) {
      showToast(`No se puede eliminar la sucursal porque tiene ${numAlumnos} alumnos asignados.`, 'error');
      return false;
    }
    setSucursales(prev => prev.filter(s => s.id !== id));
    if (selectedSucursalId === id) setSelectedSucursalId('todas');
    showToast('Sucursal eliminada.', 'info');
    return true;
  };

  // --- ALUMNOS CRUD & PAYMENTS ---
  const addAlumno = (data) => {
    const today = new Date().toISOString().split('T')[0];
    // Calculate 30 days ahead for initial fee status if paid
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + 30);
    const fechaVencimientoStr = vencimiento.toISOString().split('T')[0];

    const newAlumno = {
      id: `alum-${Date.now()}`,
      fechaUltimoPago: data.estadoCuota === 'Al día' ? today : '',
      fechaVencimiento: data.estadoCuota === 'Al día' ? fechaVencimientoStr : today,
      ...data
    };
    setAlumnos(prev => [newAlumno, ...prev]);
    showToast(`Alumno ${data.nombre} ${data.apellido} registrado.`);
  };

  const updateAlumno = (id, data) => {
    setAlumnos(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
    showToast('Datos de alumno actualizados.');
  };

  const deleteAlumno = (id) => {
    setAlumnos(prev => prev.filter(a => a.id !== id));
    showToast('Alumno eliminado del sistema.', 'info');
  };

  const registrarPagoCuota = (id) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    const nextMonth = new Date(today);
    nextMonth.setDate(nextMonth.getDate() + 30);
    const nextMonthStr = nextMonth.toISOString().split('T')[0];

    setAlumnos(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          estadoCuota: 'Al día',
          fechaUltimoPago: todayStr,
          fechaVencimiento: nextMonthStr
        };
      }
      return a;
    }));
    showToast('Pago de cuota registrado exitosamente (validez 30 días).');
  };

  // --- GASTOS & RECORDATORIOS CRUD ---
  const addGasto = (data) => {
    const newGasto = {
      id: `gst-${Date.now()}`,
      ...data
    };
    setGastos(prev => [newGasto, ...prev]);
    showToast(`Gasto "${data.descripcion}" registrado.`);
  };

  const updateGasto = (id, data) => {
    setGastos(prev => prev.map(g => g.id === id ? { ...g, ...data } : g));
    showToast('Gasto actualizado.');
  };

  const deleteGasto = (id) => {
    setGastos(prev => prev.filter(g => g.id !== id));
    showToast('Gasto eliminado.', 'info');
  };

  const toggleGastoEstado = (id) => {
    setGastos(prev => prev.map(g => {
      if (g.id === id) {
        const nextEstado = g.estado === 'Pagado' ? 'Pendiente' : 'Pagado';
        return { ...g, estado: nextEstado };
      }
      return g;
    }));
    showToast('Estado del gasto actualizado.');
  };

  // --- EVENTOS CRUD & PARTICIPANTS ---
  const addEvento = (data) => {
    const newEvento = {
      id: `evt-${Date.now()}`,
      estado: 'Próximo',
      participantes: [],
      gastos: [],
      ...data
    };
    setEventos(prev => [newEvento, ...prev]);
    showToast(`Evento "${data.nombre}" creado.`);
  };

  const updateEvento = (id, data) => {
    setEventos(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
    showToast('Evento actualizado.');
  };

  const deleteEvento = (id) => {
    setEventos(prev => prev.filter(e => e.id !== id));
    showToast('Evento eliminado.', 'info');
  };

  const registrarParticipanteEvento = (eventoId, participante) => {
    setEventos(prev => prev.map(e => {
      if (e.id === eventoId) {
        const existe = e.participantes.some(p => p.alumnoId && p.alumnoId === participante.alumnoId);
        if (existe) return e;
        return {
          ...e,
          participantes: [...e.participantes, participante]
        };
      }
      return e;
    }));
    showToast('Participante inscripto al evento.');
  };

  const togglePagoParticipanteEvento = (eventoId, alumnoIdOrNombre) => {
    setEventos(prev => prev.map(e => {
      if (e.id === eventoId) {
        return {
          ...e,
          participantes: e.participantes.map(p => {
            if ((p.alumnoId && p.alumnoId === alumnoIdOrNombre) || p.nombre === alumnoIdOrNombre) {
              return { ...p, estadoPago: p.estadoPago === 'Pagado' ? 'No pagado' : 'Pagado' };
            }
            return p;
          })
        };
      }
      return e;
    }));
    showToast('Estado de pago del participante actualizado.');
  };

  const addGastoEvento = (eventoId, gastoItem) => {
    setEventos(prev => prev.map(e => {
      if (e.id === eventoId) {
        const newGasto = {
          id: `eg-${Date.now()}`,
          estado: 'Pendiente',
          ...gastoItem
        };
        return {
          ...e,
          gastos: [...(e.gastos || []), newGasto]
        };
      }
      return e;
    }));
    showToast('Gasto agregado al evento.');
  };

  // --- EJERCICIOS & RUTINAS CRUD ---
  const addEjercicio = (data) => {
    const newEj = { id: `ej-${Date.now()}`, ...data };
    setEjercicios(prev => [...prev, newEj]);
    showToast(`Ejercicio "${data.nombre}" guardado.`);
  };

  const deleteEjercicio = (id) => {
    setEjercicios(prev => prev.filter(e => e.id !== id));
    showToast('Ejercicio eliminado.', 'info');
  };

  const addRutina = (data) => {
    const newRutina = { id: `rut-${Date.now()}`, ...data };
    setRutinas(prev => [...prev, newRutina]);
    showToast(`Rutina "${data.nombre}" guardada.`);
  };

  const deleteRutina = (id) => {
    setRutinas(prev => prev.filter(r => r.id !== id));
    showToast('Rutina eliminada.', 'info');
  };

  // --- DYNAMIC ALERTS CALCULATOR ---
  const alerts = useMemo(() => {
    const list = [];
    const today = new Date();

    // 1. Alumnos con cuota vencida o próxima a vencer (en los próximos 5 días)
    alumnos.forEach(a => {
      if (a.estadoCuota === 'Pendiente') {
        const suc = sucursales.find(s => s.id === a.sucursalId);
        list.push({
          id: `alert-alum-${a.id}`,
          tipo: 'cuota_vencida',
          severidad: 'alta',
          titulo: `Cuota Vencida: ${a.nombre} ${a.apellido}`,
          mensaje: `Alumno de ${suc?.nombre || 'Sucursal'}. Contacto: ${a.contacto}`,
          actionTab: 'alumnos',
          targetId: a.id
        });
      } else if (a.fechaVencimiento) {
        const vDate = new Date(a.fechaVencimiento);
        const diffDays = Math.ceil((vDate - today) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays <= 5) {
          list.push({
            id: `alert-alum-prox-${a.id}`,
            tipo: 'cuota_proxima',
            severidad: 'media',
            titulo: `Cuota por vencer (${diffDays} días): ${a.nombre} ${a.apellido}`,
            mensaje: `Vence el ${a.fechaVencimiento}`,
            actionTab: 'alumnos',
            targetId: a.id
          });
        }
      }
    });

    // 2. Sucursales con alquiler pendiente o próximo
    sucursales.forEach(s => {
      if (s.estadoAlquiler === 'Pendiente') {
        list.push({
          id: `alert-suc-${s.id}`,
          tipo: 'alquiler_pendiente',
          severidad: 'alta',
          titulo: `Alquiler Pendiente: ${s.nombre}`,
          mensaje: `Monto: $${s.alquilerMensual.toLocaleString('es-AR')} - Vence día ${s.diaVencimientoAlquiler}`,
          actionTab: 'sucursales',
          targetId: s.id
        });
      }
    });

    // 3. Gastos pendientes con recordatorio
    gastos.filter(g => g.estado === 'Pendiente' && g.recordatorio).forEach(g => {
      list.push({
        id: `alert-gst-${g.id}`,
        tipo: 'gasto_pendiente',
        severidad: 'media',
        titulo: `Compromiso de Pago: ${g.descripcion}`,
        mensaje: `Monto: $${g.monto.toLocaleString('es-AR')} - Fecha límite: ${g.fecha}`,
        actionTab: 'gastos',
        targetId: g.id
      });
    });

    // 4. Eventos próximos en los siguientes 15 días
    eventos.forEach(e => {
      const eDate = new Date(e.fecha);
      const diffDays = Math.ceil((eDate - today) / (1000 * 60 * 60 * 24));
      if (diffDays >= 0 && diffDays <= 15) {
        list.push({
          id: `alert-evt-${e.id}`,
          tipo: 'evento_proximo',
          severidad: 'info',
          titulo: `Evento Próximo: ${e.nombre}`,
          mensaje: `Fecha: ${e.fecha} - ${e.participantes.length} inscriptos`,
          actionTab: 'eventos',
          targetId: e.id
        });
      }
    });

    return list;
  }, [alumnos, sucursales, gastos, eventos]);

  // --- DEMO UTILITIES ---
  const resetDemoData = () => {
    setSucursales(INITIAL_SUCURSALES);
    setAlumnos(INITIAL_ALUMNOS);
    setGastos(INITIAL_GASTOS);
    setEventos(INITIAL_EVENTOS);
    setEjercicios(INITIAL_EJERCICIOS);
    setRutinas(INITIAL_RUTINAS);
    setSelectedSucursalId('todas');
    showToast('Datos reiniciados a valores por defecto.', 'info');
  };

  const exportBackupJSON = () => {
    const data = {
      timestamp: new Date().toISOString(),
      sucursales,
      alumnos,
      gastos,
      eventos,
      ejercicios,
      rutinas
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TrainCenter_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Respaldo descargado exitosamente.');
  };

  const importBackupJSON = (fileContent) => {
    try {
      const parsed = JSON.parse(fileContent);
      if (parsed.sucursales) setSucursales(parsed.sucursales);
      if (parsed.alumnos) setAlumnos(parsed.alumnos);
      if (parsed.gastos) setGastos(parsed.gastos);
      if (parsed.eventos) setEventos(parsed.eventos);
      if (parsed.ejercicios) setEjercicios(parsed.ejercicios);
      if (parsed.rutinas) setRutinas(parsed.rutinas);
      showToast('Copia de seguridad restaurada correctamente.');
    } catch (e) {
      showToast('Error al importar archivo JSON.', 'error');
    }
  };

  const value = {
    sucursales,
    alumnos,
    gastos,
    eventos,
    ejercicios,
    rutinas,
    selectedSucursalId,
    setSelectedSucursalId,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    toastNotification,
    alerts,
    // Methods
    addSucursal,
    updateSucursal,
    deleteSucursal,
    addAlumno,
    updateAlumno,
    deleteAlumno,
    registrarPagoCuota,
    addGasto,
    updateGasto,
    deleteGasto,
    toggleGastoEstado,
    addEvento,
    updateEvento,
    deleteEvento,
    registrarParticipanteEvento,
    togglePagoParticipanteEvento,
    addGastoEvento,
    addEjercicio,
    deleteEjercicio,
    addRutina,
    deleteRutina,
    resetDemoData,
    exportBackupJSON,
    importBackupJSON
  };

  return (
    <TrainCenterContext.Provider value={value}>
      {children}
    </TrainCenterContext.Provider>
  );
};
