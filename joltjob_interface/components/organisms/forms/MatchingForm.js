"use client"

import { useRef } from 'react';
import './matchingForm.css'

const hire_rates = ["Low", "Medium", "High"];
const types = ["Healthcare", "Restaurant", "Media", "Telecommunications"];
const positive_value_s1 = ["Convenient", "Trustworthy", "Technologically Advanced", "Compassionate"];
const positive_value_s2 = ["Fast", "Accessible", "Professional"];
const positive_value_s3 = ["Compassionate", "Customer-Centric", "Influential"];
const negative_value_s1 = ["Costly", "Complex", "Competitive"];
const negative_value_s2 = ["Limited", "Noisy", "Inconvenient"];
const negative_value_s3 = ["Unsafe", "Unhygienic"];
const industries = ["Healthcare", "Banking", "Media", "Telecommunications"];

export default function MatchingForm({ setResults }) {
  const hire_rateRef = useRef(null);
  const typeRef = useRef(null);
  const positive_value_1Ref = useRef(null);
  const positive_value_2Ref = useRef(null);
  const positive_value_3Ref = useRef(null);
  const negative_value_1Ref = useRef(null);
  const negative_value_2Ref = useRef(null);
  const negative_value_3Ref = useRef(null);
  const industryRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      hire_rate: hire_rateRef.current.value,
      type: typeRef.current.value,
      positive_value_1: positive_value_1Ref.current.value,
      positive_value_2: positive_value_2Ref.current.value,
      positive_value_3: positive_value_3Ref.current.value,
      negative_value_1: negative_value_1Ref.current.value,
      negative_value_2: negative_value_2Ref.current.value,
      negative_value_3: negative_value_3Ref.current.value,
      industry: industryRef.current.value,
    };

    const response = await fetch('http://127.0.0.1:5000/matching', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
     },
      body: JSON.stringify(formData),
  });
  if (response.ok) {
    const result = await response.json();
    setResults(result);
  } else {
    console.error("Error during form submission:", response.statusText);
  }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="hire_rate">Hire Rate:</label>
      <select id="hire_rate" name="hire_rate" ref={hire_rateRef}>
        <option value="">Select Hire Rate</option>
        {hire_rates.map((rate, index) => (
          <option key={index} value={rate}>
            {rate}
          </option>
        ))}
      </select>

      <label htmlFor="type">Type:</label>
      <select id="type" name="type" ref={typeRef}>
        <option value="">Select Type</option>
        {types.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>

      <label htmlFor="positive_value_1">Positive Value 1:</label>
      <select id="positive_value_1" name="positive_value_1" ref={positive_value_1Ref}>
        <option value="">Select Positive Value 1</option>
        {positive_value_s1.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>

      <label htmlFor="positive_value_2">Positive Value 2:</label>
      <select id="positive_value_2" name="positive_value_2" ref={positive_value_2Ref}>
        <option value="">Select Positive Value 2</option>
        {positive_value_s2.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>

      <label htmlFor="positive_value_3">Positive Value 3:</label>
      <select id="positive_value_3" name="positive_value_3" ref={positive_value_3Ref}>
        <option value="">Select Positive Value 3</option>
        {positive_value_s3.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>

      <label htmlFor="negative_value_1">Negative Value 1:</label>
      <select id="negative_value_1" name="negative_value_1" ref={negative_value_1Ref}>
        <option value="">Select Negative Value 1</option>
        {negative_value_s1.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>

      <label htmlFor="negative_value_2">Negative Value 2:</label>
      <select id="negative_value_2" name="negative_value_2" ref={negative_value_2Ref}>
        <option value="">Select Negative Value 2</option>
        {negative_value_s2.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>

      <label htmlFor="negative_value_3">Negative Value 3:</label>
      <select id="negative_value_3" name="negative_value_3" ref={negative_value_3Ref}>
        <option value="">Select Negative Value 3</option>
        {negative_value_s3.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>

      <label htmlFor="industry">Industry:</label>
      <select id="industry" name="industry" ref={industryRef}>
        <option value="">Select Industry</option>
        {industries.map((industry, index) => (
          <option key={index} value={industry}>
            {industry}
          </option>
        ))}
      </select>

      <button type="submit">Submit</button>
    </form>
    </>
  );
}
