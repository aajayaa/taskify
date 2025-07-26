import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useEffect, useState } from 'react';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Dashboard token={token} /> : <LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={!token ? <Login onLogin={() => setToken(localStorage.getItem('token'))} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
