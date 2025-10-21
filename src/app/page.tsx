import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">Auth App</h1>
        <p className="text-xl mb-8">Secure Authentication System</p>
        <Link
          href="/login"
          className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors inline-block"
        >
          Get Started →
        </Link>
      </div>
    </div>
  );
}
