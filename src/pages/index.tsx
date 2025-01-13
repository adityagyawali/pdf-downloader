import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      login(response.data.token, response.data.user);
      setError('');
    } catch (error) {
      setError(`Invalid credentials ${error}`);
    }
  };
  const handleDownload = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/pdf-url', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob'  // Important for handling PDF data
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'document.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setError(`Error downloading PDF ${error}`);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>PDF Download Portal</h1>

        {!user ? (
          <form onSubmit={handleLogin} className={styles.form}>
            <h2>Login to Download PDF</h2>
            {error && <p className={styles.error}>{error}</p>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Login
            </button>
          </form>
        ) : (
          <div className={styles.userSection}>
            <h2>Welcome, {user.email}</h2>
            <button onClick={handleDownload} className={styles.button}>
              Download PDF
            </button>
            <button onClick={logout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        )}
      </main>
    </div>
  );
}