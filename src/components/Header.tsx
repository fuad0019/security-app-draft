import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, [location.pathname]);

  if (location.pathname === '/login') return null;
  if (!role) return null;

  const readableRole = role === 'guard' ? 'Security Guard' : role === 'client' ? 'Client' : role;

  const logout = () => {
    localStorage.removeItem('role');
    navigate('/login', { replace: true });
  };

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="app-header-left">
          <span className="app-brand">SecurityApp</span>
        </div>
        <div className="app-header-right">
          <span className="role-badge" aria-label={`Current role: ${readableRole}`}>{readableRole}</span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>
    </header>
  );
}
