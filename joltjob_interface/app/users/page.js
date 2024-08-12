'use client';

import Link from 'next/link'
import { useState, useEffect } from 'react';

export default function Users({ formData, errorMessage }) {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Data fetched successfully:', data);
                    setUserData(data);
                } else {
                    console.error('Failed to fetch data.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
                  <header>
        <h3>JOLTJOB</h3><ul><li><Link href="/login">Login</Link></li>
        <li><Link href="users">List</Link></li>
        <li><Link href="matching">Matching</Link></li></ul>
      </header>
            {userData.length > 0 ? (
                <ul>
                    {userData.map((user, index) => (
                        <li key={index}>{user}</li>
                    ))}
                </ul>
            ) : (
                <p>No users found or failed to fetch users.</p>
            )}
        </div>
    );
}
