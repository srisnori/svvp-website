"use client";

import styles from './donations.module.css';

export default function Donations() {
    const scrollToDonationMethods = (method: string) => {
        const element = document.querySelector(`.${styles.donationMethod}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            if (method) {
                const methods = document.querySelectorAll(`.${styles.donationMethod}`);
                methods.forEach((el) => {
                    if (el.textContent?.toLowerCase().includes(method.toLowerCase())) {
                        el.classList.add(styles.highlight);
                        setTimeout(() => el.classList.remove(styles.highlight), 2000);
                    }
                });
            }
        }
    };

    return (
        <div className={styles.container}>
            <h1 className="text-3xl font-bold text-center mb-6">Every Dollar Makes a Difference: Appeal for Funds</h1>
            
            <div className={styles.donateButtonContainer}>
                <button className={styles.donateButton}>
                    Donate Now
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <div className={styles.donateDropdown}>
                    <div className={styles.donateOption} onClick={() => scrollToDonationMethods('cash')}>
                        Cash/Check Donation
                    </div>
                    <div className={styles.donateOption} onClick={() => scrollToDonationMethods('credit')}>
                        Credit/Debit Card
                    </div>
                    <div className={styles.donateOption} onClick={() => scrollToDonationMethods('paypal')}>
                        PayPal
                    </div>
                </div>
            </div>

            <p className="text-lg mb-6">Jai Sri Ram and Jai Hanuman to all devotees,</p>

            <section className={`${styles.section} mb-8`}>
                <h2 className={styles.sectionTitle}>Our Journey</h2>
                <p className="mb-4">
                    For the past 4 years, we have been operating the temple at our current location: 19382 W Grant Line Rd, Tracy CA 95391. 
                    While this arrangement has served the Mountain House and Tracy communities, we are now actively searching for a permanent 
                    location for our temple.
                </p>
                <p>
                    Our goal is to procure land and build a temple that is accessible to all people in Tracy and Mountain House. 
                    We have come close to achieving this in previous attempts but faced challenges due to funding limitations. 
                    To be well-prepared for future opportunities, we need your support.
                </p>
            </section>

            <section className={`${styles.section} mb-8`}>
                <h2 className={styles.sectionTitle}>Donation Methods</h2>
                <div className="space-y-4">
                    <div className={styles.donationMethod}>
                        <h3 className="font-semibold">Cash/Check:</h3>
                        <ul className="list-disc pl-6">
                            <li>Make checks payable to "Sri Veda Vidya Peetham"</li>
                            <li>Drop in the Hundi/Donation box inside the temple</li>
                            <li>Write "Future temple" in the check memo</li>
                        </ul>
                    </div>
                    <div className={styles.donationMethod}>
                        <h3 className="font-semibold">Credit/Debit Card:</h3>
                        <ul className="list-disc pl-6">
                            <li>Use onsite square terminal</li>
                            <li>Visit our online donation page</li>
                            <li>Select "Future temple" as the Donation Program</li>
                        </ul>
                    </div>
                    <div className={styles.donationMethod}>
                        <h3 className="font-semibold">PayPal:</h3>
                        <ul className="list-disc pl-6">
                            <li>Visit our online donation page</li>
                            <li>Include "Future temple" in the instructions</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className={`${styles.section} mb-8`}>
                <h2 className={styles.sectionTitle}>Donor Benefits</h2>
                <div className={styles.benefitsGrid}>
                    <div className="p-4 border rounded">
                        <h3 className="font-semibold">Silver ($1,116+)</h3>
                        <p>Sesha vastram</p>
                    </div>
                    <div className="p-4 border rounded">
                        <h3 className="font-semibold">Gold ($2,501+)</h3>
                        <p>Silver benefits + sponsorship for all temple events for one year</p>
                    </div>
                    <div className="p-4 border rounded">
                        <h3 className="font-semibold">Diamond ($5,001+)</h3>
                        <p>Gold benefits + 2gms silver coin</p>
                    </div>
                    <div className="p-4 border rounded">
                        <h3 className="font-semibold">Platinum ($10,001+)</h3>
                        <p>Diamond benefits + lifetime membership in temple management</p>
                    </div>
                </div>
            </section>

            <section className={`${styles.section} mb-8`}>
                <h2 className={styles.sectionTitle}>Contact Information</h2>
                <div className={styles.contactInfo}>
                    <p>Venkateshwara Sharma: (925) 915-1829</p>
                    <p>Rajasekhar Sharma: (925) 980-9257</p>
                    <p>Venkateswarlu Chunduru: (408) 569-3138</p>
                    <p>Email: svvp.org@gmail.com</p>
                </div>
            </section>

            <section className={`${styles.section} mb-8`}>
                <h2 className={styles.sectionTitle}>Tax Information</h2>
                <div className={styles.taxInfo}>
                    <p>Federal Tax ID: 81-1410607</p>
                    <p>Tax-exempt 501(c)(3) organization</p>
                    <p>Donations are tax-deductible to the extent allowed by law</p>
                </div>
            </section>
        </div>
    );
}
