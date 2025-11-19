import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

export default function ProtectedRoute({ allowedRoles, children }: { allowedRoles: string[]; children: ReactNode }) {
  const location = useLocation()
  const role = localStorage.getItem('role')

  if (!role) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (allowedRoles.length && !allowedRoles.includes(role)) {
    // If user has a role but not allowed here, bounce them home
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
