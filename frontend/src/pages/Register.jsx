import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("L'email est requis.");
    if (password.length < 6) return setError("Le mot de passe doit faire au moins 6 caractères.");

    setLoading(true);
    try {
      await register(email.trim().toLowerCase(), password);
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || "Erreur lors de l’inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 480 }}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </label>

        <label>
          Mot de passe
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}

        <button type="submit" className="form-btn">
          {loading ? "..." : "S'inscrire"}
        </button>

        <p style={{ marginTop: 12 }}>
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </form>
    </div>
  );
}
