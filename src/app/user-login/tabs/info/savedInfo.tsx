'use client';

import { useEffect, useState } from 'react';
import styles from './savedInfo.module.css';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../../firebase';

type FamilyMember = {
    name: string;
    relation: string;
    nakshatra: string;
    gothra: string;
    dob: string; 
};

export default function SavedInfo() {
    const [info, setInfo] = useState({
        fullName: '',
        dateofBirth: '',
        phone: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        nakshatra: '',
        gothra: '',
        familyMembers: [] as FamilyMember[],
    });

    useEffect(() => {
        const fetchData = async () => {
            const user = auth.currentUser;
            if (!user) return;

            try {
                const docRef = doc(db, 'savedUserInfo', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setInfo({
                        ...data,
                        familyMembers: data.familyMembers || [],
                    } as typeof info);
                }
            } catch (error) {
                console.error('Error fetching info:', error);
            }
        };

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) fetchData();
        });

        return () => unsubscribe();
    }, []);

    const handleChange = (field: string, value: string) => {
        setInfo((prev) => ({ ...prev, [field]: value }));
    };

    const handleFamilyMemberChange = (index: number, field: keyof FamilyMember, value: string) => {
        const updated = [...info.familyMembers];
        updated[index][field] = value;
        setInfo((prev) => ({ ...prev, familyMembers: updated }));
    };

    const addFamilyMember = () => {
        setInfo((prev) => ({
            ...prev,
            familyMembers: [
                ...prev.familyMembers,
                { name: '', relation: '', nakshatra: '', gothra: '', dob: '' },
            ],
        }));
    };

    const removeFamilyMember = (index: number) => {
        const updated = [...info.familyMembers];
        updated.splice(index, 1);
        setInfo((prev) => ({ ...prev, familyMembers: updated }));
    };

    const handleSave = async () => {
        const user = auth.currentUser;
        if (!user) {
            alert('Please log in to save your info.');
            return;
        }

        try {
            const docRef = doc(db, 'savedUserInfo', user.uid);
            await setDoc(docRef, info, { merge: true });
            alert('Info saved!');
        } catch (error: any) {
            console.error('Error saving info:', error);
            alert(`Failed to save info: ${error.message || error}`);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <h1 className={styles.title}>Personal Info</h1>

                <div className={styles.row}>  
                    <div className={styles.field}>
                        <label className={styles.label}>Full Name*</label>
                        <input className={styles.input} placeholder="Full Name" value={info.fullName} onChange={(e) => handleChange('fullName', e.target.value)}/>
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Date of Birth*</label>
                        <input className={styles.input} type="date" placeholder="Date of Birth" value={info.dateofBirth} onChange={(e) => handleChange('dateofBirth', e.target.value)}/>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Phone*</label>
                        <input className={styles.input} placeholder="Phone" value={info.phone} onChange={(e) => handleChange('phone', e.target.value)}/>
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>City*</label>
                        <input className={styles.input} placeholder="City" value={info.city} onChange={(e) => handleChange('city', e.target.value)}/>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>State*</label>
                        <input className={styles.input} placeholder="State" value={info.state} onChange={(e) => handleChange('state', e.target.value)}/>
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Zip*</label>
                        <input className={styles.input} placeholder="Zip" value={info.zip} onChange={(e) => handleChange('zip', e.target.value)}/>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Country*</label>
                        <input className={styles.input} placeholder="Country" value={info.country} onChange={(e) => handleChange('country', e.target.value)}/>
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Nakshatra</label>
                        <input className={styles.input} placeholder="Nakshatra" value={info.nakshatra} onChange={(e) => handleChange('nakshatra', e.target.value)}/>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Gothra</label>
                        <input className={styles.input} placeholder="Gothra" value={info.gothra} onChange={(e) => handleChange('gothra', e.target.value)}/>
                    </div>
                    <div className={styles.field}></div>
                </div>


                <h1 className={styles.title}>Family Members</h1>
                {info.familyMembers.length > 0 && (
                    <div className={styles.familyMember}> 
                        {info.familyMembers.map((member, index) => (
                            <div key={index} className={styles.familyRow}>
                                <div className={styles.field}>
                                    <label className={styles.label}>Full Name</label>
                                    <input
                                        className={styles.input}
                                        placeholder="Name"
                                        value={member.name}
                                        onChange={(e) =>
                                            handleFamilyMemberChange(index, 'name', e.target.value)
                                        }
                                    />
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>Relation</label>
                                    <input
                                        className={styles.input}
                                        placeholder="Relation"
                                        value={member.relation}
                                        onChange={(e) =>
                                            handleFamilyMemberChange(index, 'relation', e.target.value)
                                        }
                                    />
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>Nakshatra</label>
                                    <input
                                        className={styles.input}
                                        placeholder="Nakshatra"
                                        value={member.nakshatra}
                                        onChange={(e) =>
                                            handleFamilyMemberChange(index, 'nakshatra', e.target.value)
                                        }
                                    />
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>Gothra</label>
                                    <input
                                        className={styles.input}
                                        placeholder="Gothra"
                                        value={member.gothra}
                                        onChange={(e) =>
                                            handleFamilyMemberChange(index, 'gothra', e.target.value)
                                        }
                                    />
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>Date of Birth</label>
                                    <input
                                        className={styles.input}
                                        type="date"
                                        value={member.dob}
                                        onChange={(e) =>
                                            handleFamilyMemberChange(index, 'dob', e.target.value)
                                        }
                                    />
                                </div>

                                <div className={styles.field} style={{ marginTop: '24px' }}>
                                    <button
                                        type="button"
                                        className={styles.removeButton}
                                        onClick={() => removeFamilyMember(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <button type="button" className={styles.addButton} onClick={addFamilyMember}>+ Add Family Member</button>

                <button className={styles.saveButton} onClick={handleSave}>Save Info</button>
            </div>
        </div>
    );
}