'use client';
import { useState, useRef, useEffect } from 'react';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [jobPositionsOpen, setJobPositionsOpen] = useState([]);
  const [selectedJobPosition, setSelectedJobPosition] = useState(''); 
  const [message, setMessage] = useState('');
  const fileRef = useRef(null);

  useEffect(() => {
    getJobPositions();
  }, []);

  const getJobPositions = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/jobopenings'); 

      if (response.ok) {
        const data = await response.json();
        setJobPositionsOpen(
          data.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title}
            </option>
          ))
        );
      } else {
        setMessage('Error fetching job positions.');
      }
    } catch (error) {
      setMessage('Error fetching job positions.');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleJobPositionChange = (e) => {
    setSelectedJobPosition(e.target.value); 
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    if (!selectedJobPosition) {
      setMessage('Please select a job position.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_id', selectedJobPosition); 

    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`File uploaded successfully: ${data.filepath}`);
        fileRef.current.value = ''; 
        setFile(null); 
        setSelectedJobPosition(''); 
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Error uploading file.');
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <select value={selectedJobPosition} onChange={handleJobPositionChange}>
        <option value="">Select a job position</option>
        {jobPositionsOpen}
      </select>
      <input ref={fileRef} type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
}
