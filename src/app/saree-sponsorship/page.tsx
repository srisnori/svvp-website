"use client";

import styles from './saree-sponsorship.module.css';

export default function SareeSponsorship() {
    return (
        <div className={styles.container}>
            <h1 className="text-3xl font-bold text-center mb-6">Saree Sponsorship</h1>
            
            <section className={`${styles.section} mb-8`}>
                <h2 className={styles.sectionTitle}>Panchangam</h2>
                <div className={styles.infoBox}>
                    <p className="mb-4">
                        Please use donate link to Sponsor ($201), enter Saree Tag number in Sankalpa Details
                    </p>
                    <p>
                        Purchased sarees will be offered to the deities, and the sesha vastra will be returned to the devotees. 
                        Please contact us for more details.
                    </p>
                </div>
            </section>

            <section className={`${styles.section} mb-8`}>
                <h2 className={styles.sectionTitle}>Available Sarees</h2>
                <div className={styles.sareeGrid}>
                    <div className={styles.sareeCard}>
                        <div className={styles.imagePlaceholder}>
                            <p>Image 1</p>
                            <p className={styles.price}>$201</p>
                        </div>
                        <p className={styles.sareeTag}>Tag #001</p>
                    </div>
                    <div className={styles.sareeCard}>
                        <div className={styles.imagePlaceholder}>
                            <p>Image 2</p>
                            <p className={styles.price}>$201</p>
                        </div>
                        <p className={styles.sareeTag}>Tag #002</p>
                    </div>
                    <div className={styles.sareeCard}>
                        <div className={styles.imagePlaceholder}>
                            <p>Image 3</p>
                            <p className={styles.price}>$201</p>
                        </div>
                        <p className={styles.sareeTag}>Tag #003</p>
                    </div>
                    <div className={styles.sareeCard}>
                        <div className={styles.imagePlaceholder}>
                            <p>Image 4</p>
                            <p className={styles.price}>$201</p>
                        </div>
                        <p className={styles.sareeTag}>Tag #004</p>
                    </div>
                    <div className={styles.sareeCard}>
                        <div className={styles.imagePlaceholder}>
                            <p>Image 5</p>
                            <p className={styles.price}>$201</p>
                        </div>
                        <p className={styles.sareeTag}>Tag #005</p>
                    </div>
                    <div className={styles.sareeCard}>
                        <div className={styles.imagePlaceholder}>
                            <p>Image 6</p>
                            <p className={styles.price}>$201</p>
                        </div>
                        <p className={styles.sareeTag}>Tag #006</p>
                    </div>
                </div>
            </section>

            <section className={`${styles.section} mb-8`}>
                <h2 className={styles.sectionTitle}>How to Sponsor</h2>
                <div className={styles.donationMethod}>
                    <h3 className="font-semibold">Steps to Sponsor:</h3>
                    <p>Choose a saree from the available options above</p>
                    <p>Note the Tag number of your selected saree</p>
                    <p>Use the donate link below to make your payment of $201</p>
                    <p>Enter the Saree Tag number in the Sankalpa Details section</p>
                    <p>Complete your donation</p>
                    <div className={styles.donateButton}>
                        <a href="/donations" className={styles.donateLink}>
                            Donate Now
                        </a>
                    </div>
                </div>
            </section>

            <section className={`${styles.section} mb-8`}>
                <h2 className={styles.sectionTitle}>Contact Information</h2>
                <div className={styles.contactInfo}>
                    <p>For more information about the Saree Sponsorship Program, please contact:</p>
                    <p>Venkateshwara Sharma: (925) 915-1829</p>
                    <p>Email: svvp.org@gmail.com</p>
                </div>
            </section>
        </div>
    );
} 