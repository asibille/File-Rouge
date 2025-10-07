import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'


export default function ContactCard({ contact, onDeleted }){
const navigate = useNavigate()


async function handleDelete(){
if (!confirm(`Supprimer ${contact.name || contact.email} ?`)) return
try{
await api.request(`/api/contacts/${contact._id || contact.id}`, { method: 'DELETE' })
onDeleted && onDeleted()
}catch(err){
alert('Erreur: ' + (err.message || JSON.stringify(err)))
}
}


return (
<div className="card" style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
<div>
<div style={{fontWeight:600}}>{contact.name || '—'}</div>
<div className="small">{contact.email}</div>
<div className="small">{contact.phone}</div>
{contact.notes && <div style={{marginTop:8}}>{contact.notes}</div>}
</div>
<div style={{display:'flex', flexDirection:'column', gap:8}}>
<button onClick={()=>navigate(`/contacts/${contact._id || contact.id}/edit`)} className="btn" style={{background:'#e2e8f0', color:'#0f172a'}}>Éditer</button>
<button onClick={handleDelete} className="btn" style={{background:'#ef4444'}}>Supprimer</button>
</div>
</div>
)
}