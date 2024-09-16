import { useState } from 'react';
import styles from './jobOpeningForm.module.css'; // Import the CSS module

export default function JobOpeningModal({ closeModal }) {
  const [formData, setFormData] = useState({
    title: '',
    requirement: '',
    skills: [''],
    yearsExp: '',
    education: '',
    details: '',
    benefits: [''],
    minPay: '',
    maxPay: '',
  });

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
    const response = await fetch('http://127.0.0.1:5000/jobopenings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Job opening created successfully');
      closeModal(); // Close the modal after success
    } else {
      alert('Failed to create job opening');
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <button onClick={closeModal} style={{ float: 'right', cursor: 'pointer' }}>✖</button>
        <h2 className={styles.title}>Create Job Opening</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className={styles.input}
          />
          <input
            type="text"
            name="requirement"
            value={formData.requirement}
            onChange={handleChange}
            placeholder="Requirement"
            required
            className={styles.input}
          />
          
          <div className={styles.dynamicFields}>
            {formData.skills.map((skill, index) => (
              <input
                key={index}
                type="text"
                name="skills"
                value={skill}
                onChange={(e) => handleChange(e, index, 'skills')}
                placeholder="Skill"
                required
                className={styles.input}
              />
            ))}
            <button type="button" className={styles.addField} onClick={() => addField('skills')}>Add Skill</button>
          </div>

        <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            required
            className={styles.select}
        >
            <option value="" disabled>Select Education Level</option>
            <option value="High School">High School</option>
            <option value="Associate Degree">Associate Degree</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="Doctorate">Doctorate</option>
        </select>

          <input
            type="number"
            name="yearsExp"
            value={formData.yearsExp}
            onChange={handleChange}
            placeholder="Years of Experience"
            required
            className={styles.input}
          />
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Job Details"
            required
            className={styles.textarea}
          />
          
          <div className={styles.dynamicFields}>
            {formData.benefits.map((benefit, index) => (
              <input
                key={index}
                type="text"
                name="benefits"
                value={benefit}
                onChange={(e) => handleChange(e, index, 'benefits')}
                placeholder="Benefit"
                required
                className={styles.input}
              />
            ))}
            <button type="button" className={styles.addField} onClick={() => addField('benefits')}>Add Benefit</button>
          </div>

          <input
            type="number"
            name="minPay"
            value={formData.minPay}
            onChange={handleChange}
            placeholder="Min Pay"
            required
            className={styles.input}
          />
          <input
            type="number"
            name="maxPay"
            value={formData.maxPay}
            onChange={handleChange}
            placeholder="Max Pay"
            required
            className={styles.input}
          />
          
          <button type="submit" className={styles.button}>Create Job Opening</button>
        </form>
      </div>
    </div>
  );
}
