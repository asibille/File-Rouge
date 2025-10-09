import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function ContactForm({ initial = null, onSaved }) {
  const [firstName, setFirstName] = useState(initial?.firstName || '')
  const [name, setName] = useState(initial?.name || '')
  const [phone, setPhone] = useState(initial?.phone || '')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setFirstName(initial?.firstName || '')
    setName(initial?.name || '')
    setPhone(initial?.phone || '')
  }, [initial])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      if (initial && (initial._id || initial.id)) {
        
        await api.patch(`/contacts/${initial._id || initial.id}`, { firstName, name, phone })
      } else {
        
        await api.post('/contacts', { firstName, name, phone })
      }

      onSaved && onSaved()
      navigate('/contacts')
    } catch (err) {
      alert('Erreur: ' + (err.response?.data?.error || err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div style={{ display: 'grid', gap: 8 }}>
        <label>
          Prénom
          <input
            className="input"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </label>

        <label>
          Nom
          <input
            className="input"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Téléphone
          <input
            className="input"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
        </label>

        <div>
          <button className="btn" disabled={loading}>
            {loading ? '...' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </form>
  )
}
