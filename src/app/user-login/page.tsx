'use client';
import { useState } from 'react';
import styles from './userInfo.module.css'; 

import SavedInfo from './tabs/info/savedInfo';

const tabs = ['Saved Info', 'Payments', 'Volunteering'];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('Saved Info');

  return (
    <div className={styles.dashboardContainer}>
      <h2>My Account</h2>

      <div className={styles.tabContainer}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'Saved Info' && <div><SavedInfo/></div>}
        {activeTab === 'Payments' && <div>Payments Info</div>}
        {activeTab === 'Volunteering' && <div>Volunteering Info</div>}
      </div>
    </div>
  );
}
