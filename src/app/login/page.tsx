'use client';

import styles from './login.module.css';
import { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { adminUsers } from '../admin/admin';

export default function Login() {
  const [email, setEmail] = useState<string>('');     
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 
  const provider = new GoogleAuthProvider();

  const redirectUser = (email: string | null) => {
    if (email && adminUsers.includes(email)) {
      router.push('/admin');
    } else {
      router.push('/user-login');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;
      redirectUser(userEmail);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;
      redirectUser(userEmail);
    } catch (err: any) {
      console.error('Google sign-in error:', err.message);
      setError(err.message);
    }
  };

  return (
    <div>
      <div className={styles.login}>
        <h2>Login</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.email}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.password}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.loginButton}>Login</button>
        </form>

        <button onClick={handleGoogleLogin} className={styles.googleLogin}>
          <span>Login with Google</span>
        </button>

        <p className={styles.signup}>
          Don’t have an account? <a href="/account-signup/">Sign up here</a>
        </p>
      </div>
    </div>
  );
}