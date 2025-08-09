'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TaskChecklist({taskId}:{taskId:string}){
  const [items, setItems] = useState<any[]>([]);

  useEffect(()=>{
    supabase.from('task_checkpoints').select('id,label,is_done').eq('task_id', taskId).order('position')
      .then(({data})=> setItems(data||[]));
  },[taskId]);

  async function toggle(id:string, is_done:boolean){
    await supabase.from('task_checkpoints').update({ is_done, done_at: is_done? new Date().toISOString() : null }).eq('id', id);
    setItems(s=> s.map(i=> i.id===id? {...i, is_done} : i));
    await supabase.from('tasks').update({ updated_at: new Date().toISOString() }).eq('id', taskId);
  }

  const done = items.filter(i=>i.is_done).length;
  const pct = items.length ? Math.round(done*100/items.length) : 0;

  return (
    <div className="card p-3">
      <div className="mb-2 text-sm text-slate-600">Napredak: {pct}%</div>
      <div className="mb-3 h-2 w-full rounded bg-slate-200">
        <div className="h-2 rounded bg-[color:var(--brand)]" style={{ width: `${pct}%` }} />
      </div>
      <ul className="space-y-2">
        {items.map(i=> (
          <li key={i.id} className="flex items-center gap-2">
            <input type="checkbox" checked={i.is_done} onChange={e=>toggle(i.id, e.target.checked)} />
            <span>{i.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
