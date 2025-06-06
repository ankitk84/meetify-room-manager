
import { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import UserDashboard from '../components/user/UserDashboard';
import AdminDashboard from '../components/admin/AdminDashboard';

const Index = () => {
  const [user, setUser] = useState<{ username: string; role: 'user' | 'admin' } | null>(null);

  const handleLogin = (username: string, role: 'user' | 'admin') => {
    setUser({ username, role });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {user.role === 'admin' ? (
        <AdminDashboard user={user} onLogout={handleLogout} />
      ) : (
        <UserDashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
