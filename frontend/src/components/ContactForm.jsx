import React, { useState, useEffect } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'


export default function ContactForm({ initial = null, onSaved }){
const [name, setName] = useState(initial?.name || '')
const [email, setEmail] = useState(initial?.email || '')
const [phone, setPhone] = useState(initial?.phone || '')
const [notes, setNotes] = useState(initial?.notes || '')
const [loading, setLoading] = useState(false)
const navigate = useNavigate()


useEffect(()=>{
setName(initial?.name || '')
setEmail(initial?.email || '')
setPhone(initial?.phone || '')
setNotes(initial?.notes || '')
}, [initial])


async function handleSubmit(e){
e.preventDefault(); setLoading(true)
try{
if (initial && (initial._id || initial.id)){
await api.request(`/api/contacts/${initial._id || initial.id}`, { method: 'PUT', body: { name, email, phone, notes } })
} else {
await api.request('/api/contacts', { method: 'POST', body: { name, email, phone, notes } })
}
onSaved && onSaved()
navigate('/contacts')
}catch(err){
alert('Erreur: ' + (err.message || JSON.stringify(err)))
}finally{ setLoading(false) }
}


return (
<form onSubmit={handleSubmit} className="card">
<div style={{display:'grid', gap:8}}>
<label>Nom <input className="input" value={name} onChange={e=>setName(e.target.value)} required/></label>
<label>Email <input className="input" value={email} onChange={e=>setEmail(e.target.value)} type="email"/></label>
<label>Téléphone <input className="input" value={phone} onChange={e=>setPhone(e.target.value)}/></label>
<label>Notes <textarea className="input" value={notes} onChange={e=>setNotes(e.target.value)} rows={4}/></label>
<div>
<button className="btn" disabled={loading}>{loading? '...' : 'Enregistrer'}</button>
</div>
</div>
</form>
)
}