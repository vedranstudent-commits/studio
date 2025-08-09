'use client';
import { useEffect } from 'react';

export default function AutoCloseModal({
  open, onClose, title, children, onSave, saving
}:{
  open:boolean; onClose:()=>void; title:string;
  children:React.ReactNode; onSave:()=>void|Promise<void>; saving?:boolean;
}){
  useEffect(()=>{
    function onEsc(e:KeyboardEvent){ if(e.key==='Escape') onClose(); }
    if(open) document.addEventListener('keydown', onEsc);
    return ()=> document.removeEventListener('keydown', onEsc);
  },[open,onClose]);
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
      <div className="w-full max-w-lg card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-slate-100">✕</button>
        </div>
        <div className="space-y-4">{children}</div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-md border px-3 py-2">Odustani</button>
          <button onClick={async()=>{ await onSave(); onClose(); }} className="btn" disabled={saving}>
            {saving? 'Spremam…' : 'Spremi'}
          </button>
        </div>
      </div>
    </div>
  );
}
