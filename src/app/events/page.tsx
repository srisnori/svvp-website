'use client';

import { useEffect, useState } from 'react';
import styles from './events.module.css';

interface Event {
  title: string;
  date: string;
  description?: string;
  regLink?: string;
  donateLink?: string;
  flyerUrl?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  function extractFileId(link: string): string {
    const match = link.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]{10,})/);
    return match ? match[1] : '';
  }

  if (loading) return <p className={styles.container}>Loading events...</p>;

  if (events.length === 0) return <p className={styles.container}>No upcoming events found.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Upcoming Events</h1>

      <div className={styles.grid}>
        {events.map((event, i) => {
          const fileId = event.flyerUrl ? extractFileId(event.flyerUrl) : null;
          const proxyUrl = fileId ? `/api/flyer-image?id=${fileId}` : null;

          return (
            <div key={i} className={styles.eventCard}>
              {proxyUrl && (
                <img
                  src={proxyUrl}
                  alt={`${event.title} Flyer`}
                  className={styles.eventFlyer}
                />
              )}
              <h2 className={styles.eventTitle}>{event.title}</h2>
              <p className={styles.eventDate}><strong>Date:</strong> {event.date}</p>
              <p className={styles.eventDescription}>{event.description}</p>

              <div className={styles.eventButtons}>
                {event.regLink && (
                  <a href={event.regLink} target="_blank" rel="noopener noreferrer" className={styles.eventLink}>
                    Register
                  </a>
                )}
                {event.donateLink && (
                  <a href={event.donateLink} target="_blank" rel="noopener noreferrer" className={styles.eventLink}>
                    Donate
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}