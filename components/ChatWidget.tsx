'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ChatWidget(){
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');

  useEffect(()=>{
    let mounted = true;
    (async()=>{
      // ensure chat exists
      let { data: chat } = await supabase.from('chats').select('id').limit(1).maybeSingle();
      if(!chat){
        const ins = await supabase.from('chats').insert({}).select('id').single();
        chat = ins.data;
      }
      // load messages
      const { data } = await supabase.from('messages').select('*').eq('chat_id', chat!.id).order('created_at', {ascending:true});
      if(mounted) setMessages(data||[]);
      // realtime
      const ch = supabase.channel('chat')
        .on('postgres_changes', { event:'INSERT', schema:'public', table:'messages', filter:`chat_id=eq.${chat!.id}` },
          payload => setMessages(m=>[...m, payload.new]))
        .subscribe();
      return ()=> supabase.removeChannel(ch);
    })();
    return ()=>{ mounted=false; };
  }, []);

  async function send(){
    if(!text.trim()) return;
    const { data: { user }} = await supabase.auth.getUser();
    const { data: chat } = await supabase.from('chats').select('id').limit(1).maybeSingle();
    await supabase.from('messages').insert({ chat_id: chat!.id, author_id: user?.id, body: text.trim() });
    setText('');
  }

  return (
    <div className="flex h-80 flex-col">
      <div className="mb-3 flex-1 space-y-2 overflow-y-auto rounded bg-slate-800 p-2 text-slate-50">
        {messages.map((m)=> (
          <div key={m.id} className="rounded bg-slate-700 px-3 py-2 text-sm">{m.body}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="input" placeholder="Napiši poruku…" value={text} onChange={e=>setText(e.target.value)} />
        <button onClick={send} className="btn">Pošalji</button>
      </div>
    </div>
  );
}
