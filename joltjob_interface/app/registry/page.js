"use client"
import { useState } from 'react';

export default function Registry() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: 'Puerto Rico',
    experienceLevel: '',
    jobType: '',
    skills: '',
    industry: '',
    values: ['', '', ''],
    hobbies: '',
    bio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (index, value) => {
    const newValues = [...formData.values];
    newValues[index] = value;
    setFormData({
      ...formData,
      values: newValues,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-blue-600">
          Signup for <a href="/" className="text-blue-500">JoltJob</a>
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-left text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
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
              value={formData.location}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label htmlFor="experienceLevel" className="block text-left text-gray-700">Experience Level</label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
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
              value={formData.jobType}
              onChange={handleChange}
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
              value={formData.skills}
              onChange={handleChange}
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
              value={formData.industry}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-left text-gray-700">Top 3 Values</label>
            {formData.values.map((value, index) => (
              <input
                key={index}
                type="text"
                name={`value-${index}`}
                value={value}
                onChange={(e) => handleArrayChange(index, e.target.value)}
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
              value={formData.hobbies}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="bio" className="block text-left text-gray-700">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
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
