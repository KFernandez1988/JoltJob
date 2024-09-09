'use client'
import { useState, useRef } from 'react';

export default function FileUpload() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const fileRef = useRef(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(`File uploaded successfully: ${data.filepath}`);
                fileRef.current.value = '';
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            setMessage('Error uploading file.');
        }
    };

    return (
        <div>
            <input ref={fileRef} type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <p>{message}</p>
        </div>
    );
}
