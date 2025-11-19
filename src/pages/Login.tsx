import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [role, setRole] = useState<'client' | 'guard' | ''>('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!role) return
    localStorage.setItem('role', role)
    localStorage.setItem('username', username || '')
    navigate(role === 'guard' ? '/guard' : '/client/alarm', { replace: true })
  }

  return (
    <div className="login-page">
      <div className="login-grid">
        <div className="login-brand-pane">
          <div className="login-brand-content">
            <h1 className="login-brand-title">SecurityApp</h1>
            <p className="login-brand-sub">Unified emergency response coordination platform.</p>
            <ul className="login-points">
              <li>Real-time guard dispatch</li>
              <li>Client emergency signaling</li>
              <li>Secure role-based access</li>
            </ul>
          </div>
        </div>
        <div className="login-card" role="form" aria-labelledby="login-heading">
          <h2 id="login-heading" className="login-title">Sign In</h2>
          <p className="login-sub">Select your role to continue.</p>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">Username (optional)</label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-input"
                placeholder="Jane Doe"
                autoComplete="username"
              />
            </div>
            <fieldset className="form-group" aria-required="true">
              <legend className="form-label">Role</legend>
              <div className="role-options">
                <label className={`role-option ${role==='client'?'selected':''}`}> 
                  <input
                    type="radio"
                    name="role"
                    value="client"
                    checked={role==='client'}
                    onChange={() => setRole('client')}
                  />
                  <span>Client</span>
                </label>
                <label className={`role-option ${role==='guard'?'selected':''}`}> 
                  <input
                    type="radio"
                    name="role"
                    value="guard"
                    checked={role==='guard'}
                    onChange={() => setRole('guard')}
                  />
                  <span>Security Guard</span>
                </label>
              </div>
            </fieldset>
            <button type="submit" className="login-btn" disabled={!role}>Continue</button>
          </form>
          <p className="login-foot-note">By continuing you agree to responsible system usage.</p>
        </div>
      </div>
    </div>
  )
}
