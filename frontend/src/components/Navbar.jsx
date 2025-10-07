import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function Navbar(){
const { token, logout, user } = useAuth()
return (
<div className="nav">
<div style={{fontWeight:700}}>MonCarnet</div>
<div style={{display:'flex', gap:12, alignItems:'center'}}>
{token ? (
<>
<Link to="/contacts" style={{color:'#fff'}}>Contacts</Link>
<div className="small">{user?.name || user?.email}</div>
<button onClick={logout} className="btn" style={{background:'#ef4444'}}>Logout</button>
</>
) : (
<>
<Link to="/login" style={{color:'#fff'}}>Login</Link>
<Link to="/register" style={{color:'#fff'}}>Register</Link>
</>
)}
</div>
</div>
)
}