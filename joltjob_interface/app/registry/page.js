import RegistryForm from '@/components/organisms/forms/RegistryForm';
import Link from 'next/link';

export default async function Registry({ formData, errorMessage }) {
  // You can add logic here to fetch formData or handle other async operations

  return (
    <>
          <header>
        <h3>JOLTJOB</h3><ul><li><Link href="/login">Login</Link></li>
        <li><Link href="users">List</Link></li>
        <li><Link href="matching">Matching</Link></li></ul>
      </header>
      <RegistryForm formData={formData} errorMessage={errorMessage} />
    </>
  );
}

