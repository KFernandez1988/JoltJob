'use client';  // This is necessary for client-side interactivity in Next.js 14

import { useState, useEffect } from 'react';

export default function SimpleModal({ isOpen, onClose, children }) {
    const [show, setShow] = useState(isOpen);

    useEffect(() => {
        setShow(isOpen);
    }, [isOpen]);

    if (!show) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                minWidth: '300px',
                maxWidth: '500px',
            }}>
                {children}
                <button onClick={onClose} style={{
                    marginTop: '10px',
                    padding: '10px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}>
                    Close
                </button>
            </div>
        </div>
    );
}
