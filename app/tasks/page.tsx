'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import TaskChecklist from '@/components/TaskChecklist';
import AutoCloseModal from '@/components/AutoCloseModal';

export default function TasksPage(){
  const [tasks, setTasks] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [due, setDue] = useState('');

  async function load(){
    const { data } = await supabase.from('tasks').select('*').order('created_at', {ascending:false});
    setTasks(data||[]);
  }
  useEffect(()=>{ load(); }, []);

  async function createTask(){
    await supabase.from('tasks').insert({ title, due_date: due||null });
    setTitle(''); setDue('');
    await load();
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Zadaci</h1>
        <button className="btn" onClick={()=>setOpen(true)}>+ Novi zadatak</button>
      </div>

      <AutoCloseModal open={open} onClose={()=>setOpen(false)} title="Novi zadatak" onSave={createTask}>
        <div className="space-y-2">
          <div><div className="label">Naslov</div><input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Obrada svadbe..." /></div>
          <div><div className="label">Rok</div><input className="input" type="date" value={due} onChange={e=>setDue(e.target.value)} /></div>
        </div>
      </AutoCloseModal>

      <div className="grid gap-4">
        {tasks.map(t=> (
          <div key={t.id} className="card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-medium">{t.title}</div>
              <span className="badge">{t.status}</span>
            </div>
            <TaskChecklist taskId={t.id} />
          </div>
        ))}
        {tasks.length===0 && <div className="text-slate-600">Nema zadataka još.</div>}
      </div>
    </div>
  );
}
