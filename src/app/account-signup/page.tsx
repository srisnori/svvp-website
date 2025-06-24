'use client';
import styles from './signup.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth } from '../../firebase';

import {
  signOut,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError('*Passwords do not match');
      return;
    }

    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.length > 0) {
        if (methods.includes('google.com')) {
          setError('An account with this email already exists via Google Sign-In. Please log in with Google.');
          return;
        } else if (methods.includes('password')) {
          setError('An account with this email already exists. Please log in instead.');
          return;
        } else {
          setError('An account with this email already exists with a different sign-in method.');
          return;
        }
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      await signOut(auth);
      setMessage('Signup successful! Please check your email to verify your account before logging in.');
      router.push('/login');

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.signup}>
      <h2>Become a Devotee Today</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Login Details</h2>
        <input
          className={styles.input}
          type="email"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className={styles.password}>
          <input
            className={styles.input}
            type="password"
            placeholder="Password*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Confirm Password*"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <button type="submit" className={styles.button}>Sign Up</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
