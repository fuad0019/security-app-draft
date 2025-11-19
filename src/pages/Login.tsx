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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Username (optional)</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded-lg px-3 py-2"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'client' | 'guard' | '')}
              className="border rounded-lg px-3 py-2"
              required
            >
              <option value="">Select role</option>
              <option value="client">Client</option>
              <option value="guard">Security Guard</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg font-semibold"
            disabled={!role}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
