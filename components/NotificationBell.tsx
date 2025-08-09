'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function NotificationBell(){
  const [count, setCount] = useState(0);

  useEffect(()=>{
    async function load(){
      const { data, error, count } = await supabase
        .from('notifications')
        .select('id', { count:'exact', head:true })
        .eq('is_read', false);
      if(!error) setCount(count||0);
    }
    load();
    const ch = supabase.channel('noti')
      .on('postgres_changes', { event:'INSERT', schema:'public', table:'notifications' }, () => setCount(c=>c+1))
      .subscribe();
    return ()=> { supabase.removeChannel(ch); };
  }, []);

  return (
    <button className="relative rounded p-2 hover:bg-slate-200" aria-label="Notifikacije">
      <span>🔔</span>
      {count>0 && <span className="absolute -right-1 -top-1 rounded-full bg-[color:var(--brand)] px-1.5 text-xs font-semibold text-white">{count}</span>}
    </button>
  );
}
