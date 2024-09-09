'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm({ formData = {}, errorMessage }) {
    const emailRef = useRef(formData.email || '');
    const passwordRef = useRef(formData.password || '');
    const router = useRouter();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                }),
            });

            const data = await response.json();
            if (response.ok && data.success) {
                router.push('/');

            } else {
                console.error('Form submission failed.');
                alert('Login failed. Please check your credentials.');
                throw new Error('Login failed');
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
