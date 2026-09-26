import React from 'react';
import { useTrainCenter } from '../context/TrainCenterContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toastNotification } = useTrainCenter();

  if (!toastNotification) return null;

  const { message, type } = toastNotification;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-500/40 bg-emerald-950/80 text-emerald-200',
    error: 'border-rose-500/40 bg-rose-950/80 text-rose-200',
    info: 'border-sky-500/40 bg-sky-950/80 text-sky-200'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in max-w-md">
      <div className={`p-4 rounded-2xl border backdrop-blur-md shadow-2xl flex items-center gap-3 ${borders[type] || borders.success}`}>
        {icons[type] || icons.success}
        <p className="text-xs sm:text-sm font-semibold flex-1">{message}</p>
      </div>
    </div>
  );
};
