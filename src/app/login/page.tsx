import LoginForm from '@/components/LoginForm';
import ThemeToggle from '@/components/ThemeToggle';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Sign in to your account
          </p>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
