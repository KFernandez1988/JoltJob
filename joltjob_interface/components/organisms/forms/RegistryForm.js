'use client'

import { useRef, useState } from 'react';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export default function RegistryForm({ formData = {}, errorMessage }) {
    const [values, setValues] = useState(formData.values || ['', '', '']);

    // Handle input change
    const handleInputChange = (index, newValue) => {
      const newValues = [...values];
      newValues[index] = newValue;
      setValues(newValues);
    };
  
    // Handle form submission (optional, depending on your requirements)
    const handleSubmit = async (e) => {
            e.preventDefault();
        
            const formData = {
              name: e.target.name.value,
              email: e.target.email.value,
              password: e.target.password.value,
              location: e.target.location.value,
              experienceLevel: e.target.experienceLevel.value,
              jobType: e.target.jobType.value,
              skills: e.target.skills.value,
              industry: e.target.industry.value,
              values: values,
              hobbies: e.target.hobbies.value,
              bio: e.target.bio.value,
            };
        
            try {
              const response = await fetch('http://127.0.0.1:5000/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });
        
              if (response.ok) {
                console.log('Form submitted successfully!');
                revalidatePath('/login')
                
                // Handle successful response
              } else {
                console.error('Form submission failed.');
                // Handle failed response
              }
            } catch (error) {
              console.error('Error submitting form:', error);
              // Handle network or other errors
            }
          };

    

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-blue-600">
          Signup for <Link href="/" className="text-blue-500">JoltJob</Link>
        </h1>

        {errorMessage && <p className="text-red-600">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="mt-8 w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-left text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={formData.name || ''}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-left text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={formData.email || ''}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-left text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              defaultValue={formData.password || ''}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-left text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              defaultValue={formData.location || ''}
              className="mt-1 p-2 w-full border rounded-lg"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label htmlFor="experienceLevel" className="block text-left text-gray-700">Experience Level</label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              defaultValue={formData.experienceLevel || ''}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            >
              <option value="">Select your experience level</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="jobType" className="block text-left text-gray-700">Preferred Job Type</label>
            <select
              id="jobType"
              name="jobType"
              defaultValue={formData.jobType || ''}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            >
              <option value="">Select your preferred job type</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="temporary">Temporary</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="skills" className="block text-left text-gray-700">Skills</label>
            <textarea
              id="skills"
              name="skills"
              defaultValue={formData.skills || ''}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="industry" className="block text-left text-gray-700">Industry</label>
            <input
              type="text"
              id="industry"
              name="industry"
              defaultValue={formData.industry || ''}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-left text-gray-700">Top 3 Values</label>
            {values.map((value, index) => (
              <input
                key={index}
                type="text"
                name={`value-${index}`}
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="mt-1 p-2 w-full border rounded-lg mb-2"
                required
              />
            ))}
          </div>


          <div className="mb-4">
            <label htmlFor="hobbies" className="block text-left text-gray-700">Hobbies</label>
            <textarea
              id="hobbies"
              name="hobbies"
              defaultValue={formData.hobbies || ''}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="bio" className="block text-left text-gray-700">Bio</label>
            <textarea
              id="bio"
              name="bio"
              defaultValue={formData.bio || ''}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            ></textarea>
          </div>

          <button type="submit" className="mt-4 bg-blue-600 text-white p-2 w-full rounded-lg hover:bg-blue-700">
            Sign Up
          </button>
        </form>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p className="text-gray-500">&copy; 2024 JoltJob. All rights reserved.</p>
      </footer>
    </div>
  );
}
