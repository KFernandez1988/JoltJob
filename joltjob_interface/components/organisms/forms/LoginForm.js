'use client';

import { useRef } from 'react';

export default function LoginForm({ formData = {}, errorMessage }) {
    const emailRef = useRef(formData.email || '');
    const passwordRef = useRef(formData.password || '');

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                }),
            });

            const data = await response.json(); // Convert the response to JSON

            if (response.ok) {
                console.log('Form submitted successfully!');
                console.log(data);
                
                // Save the token to localStorage
                localStorage.setItem('token', data.token);

                // Redirect to the homepage or any other page
                window.location.href = '/'; 
                
            } else {
                console.error('Form submission failed.');
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-left text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        ref={emailRef}
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
                        ref={passwordRef}
                        className="mt-1 p-2 w-full border rounded-lg"
                        required
                    />
                </div>

                {errorMessage && <p className="text-red-600">{errorMessage}</p>}

                <button type="submit" className="mt-4 bg-blue-600 text-white p-2 w-full rounded-lg hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    );
}
