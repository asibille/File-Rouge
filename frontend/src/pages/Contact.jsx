import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Contacts() {
  const { user, logout } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      const res = await api.get('/contacts');
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  function validatePhone(number) {
    const digits = number.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 20;
  }

  async function handleAdd(e) {
    e.preventDefault();
    setError('');

    if (!firstName.trim() || !name.trim()) {
      setError('Le prénom et le nom sont obligatoires.');
      return;
    }

    if (!validatePhone(phone)) {
      setError('Le numéro doit contenir entre 10 et 20 chiffres.');
      return;
    }

    try {
      const res = await api.post('/contacts', { firstName, name, phone });
      setContacts([...contacts, res.data]);
      setFirstName('');
      setName('');
      setPhone('');
    } catch (err) {
      setError('Erreur lors de l’ajout du contact.');
      console.error(err);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setError('');

    if (!firstName.trim() || !name.trim()) {
      setError('Le prénom et le nom sont obligatoires.');
      return;
    }

    if (!validatePhone(phone)) {
      setError('Le numéro doit contenir entre 10 et 20 chiffres.');
      return;
    }

    try {
      const res = await api.patch(`/contacts/${editingId}`, { firstName, name, phone });
      setContacts(contacts.map(c => (c._id === editingId ? res.data : c)));
      setEditingId(null);
      setFirstName('');
      setName('');
      setPhone('');
    } catch (err) {
      setError('Erreur lors de la mise à jour.');
      console.error(err);
    }
  }

  function startEdit(contact) {
    setEditingId(contact._id);
    setFirstName(contact.firstName || '');
    setName(contact.name || '');
    setPhone(contact.phone || '');
    setError('');
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/contacts/${id}`);
      setContacts(contacts.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container">
      <h2>Mes contacts</h2>
      <p>Connecté en tant que <strong>{user?.email}</strong></p>

      <button className="form-btn logout-btn" onClick={logout}>Déconnexion</button>

      <form onSubmit={editingId ? handleUpdate : handleAdd}>
        <input
          placeholder="Prénom"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <input
          placeholder="Nom"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          placeholder="Téléphone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
        {error && <div style={{ color: 'red', fontSize: '0.85rem' }}>{error}</div>}
        <div className="contact-form-buttons">
          <button type="submit" className="contact-form-btn">
            {editingId ? 'Mettre à jour' : 'Ajouter'}
          </button>
          {editingId && (
            <button
              type="button"
              className="contact-form-btn cancel-btn"
              onClick={() => {
                setEditingId(null);
                setFirstName('');
                setName('');
                setPhone('');
                setError('');
              }}
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <ul className="contacts-container">
        {contacts.map(c => (
          <li key={c._id} className="contact-card">
            <div className="contact-card-info">
              {c.firstName} — {c.name} — {c.phone}
            </div>
            <div className="contact-card-buttons">
              <button className="edit-btn" onClick={() => startEdit(c)}>Éditer</button>
              <button className="delete-btn" onClick={() => handleDelete(c._id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
