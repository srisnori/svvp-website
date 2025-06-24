"use client";
import styles from "./priest.module.css";

export default function Priest() {
    const priests = [
        {
            name: "Brahmasri Chintapalli Venkateshwara Sharma Avadhani",
            email: "Chintapallisarma@gmail.com",
            phone: "925-915-1829",
            imageUrl: "/images/priest.jpg"
        },
        {
            name: "Sri Rajasekhar Sharma Chintapalli",
            email: "Chintapallisarma@gmail.com",
            phone: "925-915-1829",
            imageUrl: "/images/chintapalli-rajasekhar-sharma.jpg"
        },
        {
            name: "",
            email: "@gmail.com",
            phone: "123-456-7890",
            imageUrl: "/images/"
        }
    ];

    return (
        <main className={styles.container}>
            <h1 className={styles.pageTitle}>Our Priests</h1>
            <div className={styles.cardsContainer}>
                {priests.map((priest, index) => (
                    <div key={index} className={styles.priestProfile}>
                        <div className={styles.image}>
                            <img src={priest.imageUrl} alt={priest.name} />
                        </div>
                        <h2>{priest.name}</h2>
                        <div className={styles.contactInfo}>
                            <div>
                                <span>Email:</span>
                                <a href={`mailto:${priest.email}`}>{priest.email}</a>
                            </div>
                            <div>
                                <span>Phone:</span>
                                <a href={`tel:${priest.phone}`}>{priest.phone}</a>
                            </div>
                            <button className={styles.requestButton}>
                                Request Service
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}