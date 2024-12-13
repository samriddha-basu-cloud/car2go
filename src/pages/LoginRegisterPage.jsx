import React, { useState } from 'react';

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-md rounded">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form className="mt-4">
          <input type="text" placeholder="Username" className="w-full px-4 py-2 border rounded mb-4" />
          <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded mb-4" />
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="mt-4 text-blue-500">
          {isLogin ? 'Create an account' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default LoginRegisterPage;