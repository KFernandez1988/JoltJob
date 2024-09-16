'use client';
import { useState, useEffect } from 'react';
import styles from './jobOpeningForm.module.css'; 

export default function CompanyFormModal({ closeModal }) {
  const [formData, setFormData] = useState({
    name: '',
    vision: '',
    mission: '',
    goals: [''],
    values: [''],
    headquarters: '',
    established: '',
    employee_count: '',
    industry: '',
    description: '',
    website: '',
  });
  const [message, setMessage] = useState('');
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getCompanyInfo();
  }, [reload]);

  const getCompanyInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/company');
        const data = await response.json();
        if (response.ok) {
          if (!data.error) {
            setFormData(data);
          }
        } else {
          setMessage('Error fetching company information.');
        }
    } catch (error) {
        setMessage('Error fetching company information.');
        }
  };

  const handleChange = (e, index, field) => {
    if (field && index !== undefined) {
      const updatedArray = [...formData[field]];
      updatedArray[index] = e.target.value;
      setFormData({ ...formData, [field]: updatedArray });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check required fields
    const requiredFields = ['name', 'vision', 'mission', 'goals', 'values', 'headquarters', 'established', 'employee_count', 'industry'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setMessage(`'${field}' is required`);
        return;
      }
    }

    const payload = {
      ...formData,
      established: parseInt(formData.established),
      employee_count: parseInt(formData.employee_count),
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Company created successfully');
        closeModal();
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Error submitting the form.');
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <button onClick={closeModal} className={styles.closeButton}>✖</button>
        <h2>Create Company</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Company Name"
            className={styles.input}
            required
          />
          <textarea
            name="vision"
            value={formData.vision}
            onChange={handleChange}
            placeholder="Vision"
            className={styles.textarea}
            required
          />
          <textarea
            name="mission"
            value={formData.mission}
            onChange={handleChange}
            placeholder="Mission"
            className={styles.textarea}
            required
          />
          
          <div className={styles.dynamicFields}>
            {formData.goals.map((goal, index) => (
              <input
                key={index}
                type="text"
                name="goals"
                value={goal}
                onChange={(e) => handleChange(e, index, 'goals')}
                placeholder="Goal"
                className={styles.input}
                required
              />
            ))}
            <button type="button" className={styles.addField} onClick={() => addField('goals')}>Add Goal</button>
          </div>

          <div className={styles.dynamicFields}>
            {formData.values.map((value, index) => (
              <input
                key={index}
                type="text"
                name="values"
                value={value}
                onChange={(e) => handleChange(e, index, 'values')}
                placeholder="Value"
                className={styles.input}
                required
              />
            ))}
            <button type="button" className={styles.addField} onClick={() => addField('values')}>Add Value</button>
          </div>

          <input
            type="text"
            name="headquarters"
            value={formData.headquarters}
            onChange={handleChange}
            placeholder="Headquarters"
            className={styles.input}
            required
          />
          <input
            type="number"
            name="established"
            value={formData.established}
            onChange={handleChange}
            placeholder="Established Year"
            className={styles.input}
            required
          />
          <input
            type="number"
            name="employee_count"
            value={formData.employee_count}
            onChange={handleChange}
            placeholder="Employee Count"
            className={styles.input}
            required
          />
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            placeholder="Industry"
            className={styles.input}
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description (Optional)"
            className={styles.textarea}
          />
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Website (Optional)"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Create Company</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}
