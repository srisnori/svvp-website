"use client";
import styles from "./leadership.module.css";

export default function Leadership() {
    const leadershipData = {
        boardOfDirectors: {
            title: "Board of Directors",
            members: [
                { position: "Chairman & Founder", name: "Brahmasri Venkateshwara Sharma Chintapalli" },
                { position: "President", name: "Sri Shiva Kiran Nori" },
                { position: "Secretary", name: "Kiran Kumar Vishnubhotla" },
                { position: "Treasurer", name: "Sesha Prameela Munukutla" },
                { position: "Joint Secretary", name: "Rajashekar Sharma Chintapalli" }
            ]
        },
        boardOfAdvisors: {
            title: "Board of Advisors",
            members: [
                { position: "Religious", name: "Brahmasri Venkateshwara Sharma Chintapalli" },
                { position: "Construction", name: "Sri Manikya Prabhu Salveru" },
                { position: "Publicity", name: "Sri Murthy Ayyagari" },
                { position: "Communication", name: "Sri Sekhar Korupolu" },
                { position: "Events", name: "Sri Shiva Reddy" },
                { position: "Communication", name: "Sri Murali Mohan Godavarthy" },
                { position: "Communication", name: "Sri Srinivas Peri" }
            ]
        },
        staffAndVolunteers: {
            title: "Staff and Core Volunteers",
            members: [
                { position: "Food and Kitchen Volunteer Coordinator", name: "Sri Charan Mahavadi" },
                { position: "Publicity and Flyers", name: "Sri Prashantha Raagamayee" }
            ]
        }
    };

    return (
        <main className={styles.container}>
            <h1 className={styles.pageTitle}>Leadership</h1>
            <div className={styles.leadershipContainer}>
                {Object.entries(leadershipData).map(([key, section]) => (
                    <div key={key} className={styles.section}>
                        <h2 className={styles.sectionTitle}>{section.title}</h2>
                        <div className={styles.membersGrid}>
                            {section.members.map((member, index) => (
                                <div key={index} className={styles.memberCard}>
                                    <div className={styles.position}>{member.position}</div>
                                    <div className={styles.name}>{member.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
import Image from "next/image";

