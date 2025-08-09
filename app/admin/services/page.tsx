'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ServicesAdminPage(){
  const [services, setServices] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [pkgName, setPkgName] = useState('');
  const [pkgPrice, setPkgPrice] = useState(0);

  async function load(){
    const s = await supabase.from('services').select('*').order('name');
    const p = await supabase.from('service_packages').select('*, services(name)').order('package_name');
    setServices(s.data||[]);
    setPackages(p.data||[]);
  }
  useEffect(()=>{ load(); }, []);

  async function addService(){
    if(!name.trim()) return;
    await supabase.from('services').insert({ name, is_active: true });
    setName(''); load();
  }
  async function addPackage(serviceId:string){
    if(!pkgName.trim()) return;
    await supabase.from('service_packages').insert({ service_id: serviceId, package_name: pkgName, price_cents: Number(pkgPrice||0) });
    setPkgName(''); setPkgPrice(0); load();
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-semibold">Usluge & paketi (admin)</h1>

      <div className="card p-4 space-y-3">
        <div className="label">Nova usluga</div>
        <div className="flex gap-2 max-w-xl">
          <input className="input" placeholder="npr. Vjenčanja" value={name} onChange={e=>setName(e.target.value)} />
          <button className="btn" onClick={addService}>Dodaj</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {services.map(s=> (
          <div key={s.id} className="card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-medium">{s.name}</div>
              <span className="badge">{s.is_active? 'aktivno':'neaktivno'}</span>
            </div>
            <div className="space-y-2">
              <div className="label">Dodaj paket</div>
              <div className="flex gap-2">
                <input className="input" placeholder="mini/midi/maxi..." value={pkgName} onChange={e=>setPkgName(e.target.value)} />
                <input className="input" type="number" placeholder="cijena (centi)" value={pkgPrice} onChange={e=>setPkgPrice(Number(e.target.value))} />
                <button className="btn" onClick={()=>addPackage(s.id)}>Spremi</button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="label">Paketi</div>
              {(packages.filter(p=>p.service_id===s.id)).map(p=> (
                <div key={p.id} className="flex items-center justify-between border rounded p-2">
                  <div>{p.package_name}</div>
                  <div className="text-sm text-slate-600">{(p.price_cents||0)/100:.2f} €</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
