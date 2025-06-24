"use client";
import { FaSearchMinus } from "react-icons/fa";
import styles from "./pooja-services.module.css";
import { useState } from 'react';

const services = [
    {title: 'Aksharabhyasam', atHomePrice: '$151', atTemplePrice: '$101', link: '/pooja-request/'},
    {title: 'Annaprasana', atHomePrice: '$151', atTemplePrice: '$101', link: ''},
    {title: 'Namakaranam/Naming Ceremony', atHomePrice: '$201', atTemplePrice: '$151', link: ''},
    {title: 'Kesakhandan (Mudan)', atHomePrice: '$151', atTemplePrice: '$101', link: ' '},
    {title: 'Seemantam', atHomePrice: '$201', atTemplePrice: '$151', link: ''},
    {title: 'Ganapathi Homam', atHomePrice: '$201', atTemplePrice: '$151', link: ''},
    {title: 'Navagraha Santi Homam', atHomePrice: '$201', atTemplePrice: '$0', link: ''},
    {title: 'Sudarshan Homam', atHomePrice: '$201', atTemplePrice: '$151', link: ''},
    {title: 'Rudra Homam', atHomePrice: '$201', atTemplePrice: '$151', link: ''},
    {title: 'Manyu Sukta Homam', atHomePrice: '$201', atTemplePrice: '$151', link: ''},
    {title: 'Chandi Homam', atHomePrice: '$501', atTemplePrice: '$501', link: ''},
    {title: 'Any Pasupata Homam', atHomePrice: '$351', atTemplePrice: '$251', link: ''},
    {title: 'Gruhapravesham Only', atHomePrice: '$201', atTemplePrice: 'N/A', link: ''},
    {title: 'Gruhapravesham & Homam', atHomePrice: '$301', atTemplePrice: 'N/A', link: ''},
    {title: 'Gruhapravesham Satya Narayana vratam', atHomePrice: '$301', atTemplePrice: 'N/A', link: ''},
    {title: 'Gruhapravesham Satya Narayana vratam & Homam', atHomePrice: '$401', atTemplePrice: 'N/A', link: ''},
    {title: 'Bhumi pooja', atHomePrice: '$201', atTemplePrice: 'N/A', link: ''},
    {title: 'Hiranya sraddham', atHomePrice: '$151', atTemplePrice: '$0', link: ''},
    {title: 'Varalakshmi Vratam', atHomePrice: '$151', atTemplePrice: '$0', link: ''},
    {title: 'Kedara Vratam', atHomePrice: '$201', atTemplePrice: '$101', link: ''},
    {title: 'Satya Narayana Vratam', atHomePrice: '$201', atTemplePrice: '$151', link: ''},
    {title: 'Rudra Abhishekam', atHomePrice: '$151', atTemplePrice: '$51', link: ''},
    {title: 'Mahanyasam Ekadasha Rudrabhishekam', atHomePrice: '$351', atTemplePrice: '$251', link: ''},
    {title: 'Surya Namaskaram', atHomePrice: '$351', atTemplePrice: '$251', link: ''},
    {title: 'Chandi parayana', atHomePrice: '$251', atTemplePrice: '$151', link: ''},
    {title: 'Car pooja', atHomePrice: 'N/A', atTemplePrice: '$51', link: ''},
    {title: 'Kalyanotsavam at Your House', atHomePrice: '$516', atTemplePrice: 'N/A', link: ''},
    {title: 'Upanayanam', atHomePrice: '$1001', atTemplePrice: '$501', link: ''},
    {title: 'Satyanarayana Vratham & Any Homam', atHomePrice: '$301', atTemplePrice: '$251', link: ''},
    {title: 'Rudrabhishekam & Satyanarayana Puja', atHomePrice: '$301', atTemplePrice: '$0', link: ''},
]

export default function PoojaServices() {
    const [search, setSearch] = useState("");
    const filter = services.filter(service => service.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Pooja Services</h1>
            <input 
                type="text" 
                placeholder="Search Pooja Services" 
                className={styles.search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>At Home Price</th>
                        <th>At Temple Price</th>
                        <th>Request Service</th>
                    </tr>
                </thead>

                <tbody>
                    {filter.length > 0 ? (
                        filter.map((service, index) => (
                        <tr key={index} className={styles.row}>
                            <td>{service.title}</td>
                            <td>{service.atHomePrice}</td>
                            <td>{service.atTemplePrice}</td>
                            <td><a href={service.link} className={styles.learnMore}>Learn More</a></td>
                        </tr>
                        ))) : 
                        (<tr><td style={{ textAlign: 'center', padding: '1rem' }}>No services found.</td></tr>)
                    }
                </tbody>
            </table>
        </main>
    );
}