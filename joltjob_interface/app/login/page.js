import Link from 'next/link';
import LoginForm from '@/components/organisms/forms/LoginForm'

export default function Login({ formData, errorMessage }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
      <header>
        <h3>JOLTJOB</h3><ul><li><Link href="/login">Login</Link></li>
        <li><Link href="users">List</Link></li>
        <li><Link href="matching">Matching</Link></li></ul>
      </header>
        <h1 className="text-6xl font-bold text-blue-600">
          Login to <a href="/" className="text-blue-500">JoltJob</a>
        </h1>

        <LoginForm formData={formData} errorMessage={errorMessage} />

        <p className="mt-4 text-gray-700">
          Don't have an account? <Link href="/registry" className="text-blue-500">Sign Up</Link>
        </p>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p className="text-gray-500">&copy; 2024 JoltJob. All rights reserved.</p>
      </footer>
    </div>
  );
}
