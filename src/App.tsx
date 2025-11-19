import './App.css'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import SecurityGuardUI from './pages/SecurityGuard'
import EmergencyConfirmationUI from './pages/ClientEmergency'
import AlarmUI from './pages/ClientAlarm'
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import Header from './components/Header'

function App() {
  const location = useLocation()

  return (
    <>
      <Header />
      <Routes location={location}>
      <Route path="/login" element={<Login />} />

      <Route
        path="/guard"
        element={
          <ProtectedRoute allowedRoles={["guard"]}>
            <SecurityGuardUI />
          </ProtectedRoute>
        }
      />

      <Route
        path="/client/emergency"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <EmergencyConfirmationUI />
          </ProtectedRoute>
        }
      />

      <Route
        path="/client/alarm"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <AlarmUI />
          </ProtectedRoute>
        }
      />

      {/* Optional convenience redirect */}
      <Route path="/client" element={<Navigate to="/client/alarm" replace />} />

      <Route
        path="/"
        element={<RedirectHome />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  )
}

function RedirectHome() {
  const role = localStorage.getItem('role')
  if (role === 'guard') return <Navigate to="/guard" replace />
  if (role === 'client') return <Navigate to="/client/alarm" replace />
  return <Navigate to="/login" replace />
}

export default App
