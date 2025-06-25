'use client';
import { useState } from 'react';
import { auth } from '../../firebase';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

import styles from './userInfo.module.css'; 

import SavedInfo from './tabs/info/savedInfo';

const tabs = ['Saved Info', 'Payments', 'Volunteering'];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('Saved Info');
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login'); 
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out. Please try again.');
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2>My Account</h2>

      <div className={styles.tabHeader}>
        <div className={styles.tabs}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}>
              {tab}
            </button>
          ))}
        </div>
        <button onClick={handleSignOut} className={styles.signOutButton}>Sign Out</button>
      </div>


      <div className={styles.tabContent}>
        {activeTab === 'Saved Info' && <div><SavedInfo/></div>}
        {activeTab === 'Payments' && <div>Payments Info</div>}
        {activeTab === 'Volunteering' && <div>Volunteering Info</div>}
      </div>
    </div>
  );
}
