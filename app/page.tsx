'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ClientCreate from '@/components/ClientCreate';
import ChatWidget from '@/components/ChatWidget';

export default function HomePage(){
  const [metrics, setMetrics] = useState({ tasks: 0, posts: 0, shoots: 0 });

  useEffect(()=>{
    (async()=>{
      const t = await supabase.from('tasks').select('id', { count:'exact', head:true });
      setMetrics(m => ({...m, tasks: t.count||0}));
    })();
  },[]);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <section className="lg:col-span-2 space-y-4">
        <div className="card p-4">
          <h2 className="text-lg font-semibold mb-2">Dobrodošli u ured</h2>
          <div className="text-sm text-slate-600">Brzi pregled i dodavanje klijenata.</div>
          <div className="mt-4 flex items-center gap-3">
            <ClientCreate />
            <div className="badge">Zadataka: {metrics.tasks}</div>
          </div>
        </div>

        <div className="card p-4">
          <h3 className="text-lg font-semibold mb-3">Tim chat</h3>
          <ChatWidget />
        </div>
      </section>

      <aside className="lg:col-span-1 space-y-4">
        <div className="card p-4">
          <h3 className="font-semibold mb-2">Kratke upute</h3>
          <ol className="list-decimal pl-4 space-y-1 text-sm">
            <li>Dodaj klijenta</li>
            <li>Kreiraj zadatak</li>
            <li>Podesi usluge/pakete (Admin)</li>
          </ol>
        </div>
      </aside>
    </div>
  );
}
