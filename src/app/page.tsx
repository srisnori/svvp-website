"use client";
import styles from './page.module.css';
import Link from "next/link";
import React, { useState, useEffect } from "react";


/* Calender */
const calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID ?? "";
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "";

function getStartOfWeek(date: Date) {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1); 
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);
  return start;
}

function getEndOfWeek(date: Date) {
  const end = getStartOfWeek(date);
  end.setDate(end.getDate() + 4); 
  end.setHours(23, 59, 59, 999);
  return end;
}

function formatDateKey(date: Date) {
  return date.toISOString().split("T")[0];
}

interface Event {
  title: string;
  date: string;
  description?: string;
  regLink?: string;
  donateLink?: string;
  flyerUrl?: string;
}

export default function Home() {
  const [selectedDate] = useState(new Date());
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startOfWeek = getStartOfWeek(selectedDate);

  const days = [...Array(5)].map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    return d;
  });

  const eventsByDay = events.reduce((acc, event) => {
    const dateKey = event.start.dateTime
      ? new Date(event.start.dateTime).toISOString().split("T")[0]
      : event.start.date;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, typeof events>);

  // Fetch Google Calendar events
  
  useEffect(() => {
    async function fetchGoogleEvents() {
      setLoading(true);
      setError(null);

      const timeMin = getStartOfWeek(selectedDate).toISOString();
      const timeMax = getEndOfWeek(selectedDate).toISOString();

      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        calendarId
      )}/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime&key=${apiKey}`;

      try {
        const res = await fetch(url);

        if (!res.ok) {
          setError("Failed to fetch events");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setEvents(data.items || []);
      } catch (e) {
        setError("Error fetching events");
      } finally {
        setLoading(false);
      }
    }

    fetchGoogleEvents();
  }, [selectedDate]);

  // Fetch local events for latestEvent
const [latestEvent, setLatestEvent] = useState<Event | null>(null);

useEffect(() => {
  async function fetchLocalEvents() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/events');
      if (!res.ok) {
        setError('Failed to fetch local events');
        setLoading(false);
        return;
      }
      const data: Event[] = await res.json();

      const today = new Date();
      const upcomingEvents = data
        .filter(event => new Date(event.date) >= today)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setLatestEvent(upcomingEvents.length > 0 ? upcomingEvents[0] : null);
    } catch (error) {
      setError('Error fetching local events');
    } finally {
      setLoading(false);
    }
  }

  fetchLocalEvents();
}, []);

function extractFileId(link: string): string | null {
  if (!link) return null;
  const match = link.match(/\/d\/([a-zA-Z0-9_-]+)|id=([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return match[1] || match[2] || null;
}

const fileId = latestEvent?.flyerUrl ? extractFileId(latestEvent.flyerUrl) : null;
const proxyUrl = fileId ? `/api/flyer-image?id=${fileId}` : null;

console.log('Proxy URL for flyer:', proxyUrl);




  return (
    <main className = {styles.main}>

      <div className={styles.disclaimer}>
        <div className={styles.scroll}>
          <span>!! Sri Hanuman !! Mandir is Closed for Permits. Thank you for your Support. !! Jai Hanuman !!</span>
          <span>!! Sri Hanuman !! Mandir is Closed for Permits. Thank you for your Support. !! Jai Hanuman !!</span>
          <span>!! Sri Hanuman !! Mandir is Closed for Permits. Thank you for your Support. !! Jai Hanuman !!</span>
          <span>!! Sri Hanuman !! Mandir is Closed for Permits. Thank you for your Support. !! Jai Hanuman !!</span>
        </div>
      </div>




      <div className={styles.mainBox}>
        <div className={styles.mainText}>
          <h1>Welcome to SVVP</h1>
          <p>
            Sri Veda Vidya Peetham (SVVP) was established to fulfill the social needs of Bay Area Indian 
            community in terms of promoting Sanatana Dharma and development of Vedic education so our kids 
            and future generations can grow spiritually and culturally. To fulfill the institution objectives, 
            the management is making elaborate plans for a permanent structure for our beloved Abhaya 
            Anjaneya and other deities in our temple. We are trying to reach out to all of our devotees 
            from the community to build Seed money (Corpus fund) to enable building a permanent structure.
          </p>
          <p>For further information, please contact: 925-980-9257 / 925-915-1829</p>
          <button>Support the Temple</button>
        </div>
      </div>

      
      <div className={styles.flyerAction}>
        {latestEvent ? (
        (() => {
          const flyerFilename = latestEvent.title.toLowerCase().replace(/\s+/g, '-') + '.jpg';
          return (
            <div className={styles.flyerCard}>
              <div className={styles.flyerContent}>
                <h1>Don't Miss Our Upcoming Event!</h1>
                <p>
                  Join us on <strong>{latestEvent.date}</strong> for <strong>{latestEvent.title}</strong>
                </p>
              </div>
              {proxyUrl ? (
                <img
                  src={proxyUrl}
                  alt={`${latestEvent?.title} flyer`}
                  className={styles.flyerPreview}
                />
              ) : (
                <p>No flyer available</p>
              )}

            </div>
          );
        })()
      ) : (

        <div className={styles.flyerCard}>
          <div className={styles.flyerContent}>
            <h1>Don't Miss Our Upcoming Event!</h1>
            <p>No upcoming events at the moment. Check back soon!</p>
          </div>
          <img src="/flyers/" alt="Default Flyer" className={styles.flyerPreview}/>
        </div>
      )}




        <div className={styles.boxes}>
          <div className={styles.box}>
            <h2>Pooja Services</h2>
            <p>Our dedicated team of priests have specialized 
              knowledge in various branches of Hindu rituals.</p>
              <Link href="/pooja-services">
                <button>Learn More</button>
              </Link>
          </div>

          <div className={styles.box}>
            <h2>Become a Devotee Today!</h2>
            <p>Join our spiritual community to experience devotion and stay updated on rituals 
              and events.</p>
              <Link href="/login">
                <button>Devotee</button>
              </Link>
          </div>

          <div className={styles.box}>
            <h2>Pooja Subscription</h2>
            <p>Monthly Pooja Subscription $51. 
              Includes daily Pooja, Weekly Abhishekams, monthly events.</p>
              <Link href="/">
                <button>Sign Up</button>
              </Link>
          </div>
        </div>
      </div>






      <div className={styles.eventsBox}>
        <h1 className={styles.title}>Week at a Glance</h1>
        <div className={styles.daysRow}>
          {days.map((day) => {
            const key = formatDateKey(day);
            const dayEvents = eventsByDay[key] || [];
            const dayName = day.toLocaleDateString("en-US", { weekday: "long" });
            
            return (
              <div key={key} className={styles.dayBox}>
                
                <div className={styles.dayName}>{dayName}</div>
                {dayEvents.length === 0 ? (<p className={styles.noEvents}>No events</p>) : (
                  dayEvents.map((event: any) => (
                    
                    <div key={event.id} className={styles.eventItem}>
                      <div className={styles.eventSummary}>{event.summary}</div>
                      <div className={styles.eventTime}>
                        {event.start.dateTime
                          ? new Date(event.start.dateTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "All day"}
                      </div>
                    </div>
                  ))
                )}
              </div>
            );
          })}
        </div>
      </div>




      <div className={styles.donors}>
        <h1>Thanks to Our Generous Donors</h1>
        <div className={styles.donorTrack}>
          <div className={styles.donorBox}>1</div>
          <div className={styles.donorBox}>2</div>
          <div className={styles.donorBox}>3 </div>
          <div className={styles.donorBox}>4</div>
          <div className={styles.donorBox}>5</div>

          <div className={styles.donorBox}>1</div>
          <div className={styles.donorBox}>2</div>
          <div className={styles.donorBox}>3 </div>
          <div className={styles.donorBox}>4</div>
          <div className={styles.donorBox}>5</div>
        </div>
      </div>

    </main>
  )
}