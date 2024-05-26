import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-blue-600">
          Welcome to <a href="/" className="text-blue-500">JoltJob!</a>
        </h1>

        <p className="mt-3 text-2xl">
          Find your dream job with <span className="text-blue-500">JoltJob</span>
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <a href="/jobs" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-500 focus:text-blue-500">
            <h3 className="text-2xl font-bold">Browse Jobs &rarr;</h3>
            <p className="mt-4 text-xl">
              Discover various job opportunities that match your skills and preferences.
            </p>
          </a>

          <a href="/about" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-500 focus:text-blue-500">
            <h3 className="text-2xl font-bold">About Us &rarr;</h3>
            <p className="mt-4 text-xl">
              Learn more about JoltJob and how we can help you find your dream job.
            </p>
          </a>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p className="text-gray-500">&copy; 2024 JoltJob. All rights reserved.</p>
      </footer>
    </div>
  );
}
