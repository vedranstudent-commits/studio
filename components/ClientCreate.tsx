'use client';
import { useState } from 'react';
import AutoCloseModal from './AutoCloseModal';
import { supabase } from '@/lib/supabase';

export default function ClientCreate(){
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  async function save(){
    setSaving(true);
    await supabase.from('clients').insert({ name, contact: { email, phone }, notes });
    setSaving(false);
    setName(''); setEmail(''); setPhone(''); setNotes('');
  }

  return (
    <>
      <button onClick={()=>setOpen(true)} className="btn">+ Novi klijent</button>
      <AutoCloseModal open={open} onClose={()=>setOpen(false)} title="Novi klijent" onSave={save} saving={saving}>
        <div className="space-y-2">
          <div><div className="label">Naziv</div><input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Restoran Kalimero" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><div className="label">Email</div><input className="input" value={email} onChange={e=>setEmail(e.target.value)} /></div>
            <div><div className="label">Telefon</div><input className="input" value={phone} onChange={e=>setPhone(e.target.value)} /></div>
          </div>
          <div><div className="label">Bilješke</div><textarea className="input" value={notes} onChange={e=>setNotes(e.target.value)} /></div>
        </div>
      </AutoCloseModal>
    </>
  );
}
