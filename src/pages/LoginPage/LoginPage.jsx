
import React from "react";

const LoginPage = () => {
  return (
    <section className="d-flex align-items-center min-vh-100 bg-gray-50 dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-lg lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl ">
            Secure Access to Your Financial Hub
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-500">
            Logging in gives you personalized access to smarter financial tools
            — track loans, monitor repayments, access offers, and manage your
            HappiRate profile with full control and security.
          </p>
          <a
            href="#"
            className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
          >
            Learn why logging in matters
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>

        <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl ">
          <h2 className="text-2xl font-bold text-gray-900 ">
            Sign in to Happirate
          </h2>
          <form className="mt-8 space-y-6" action="#">
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-500 "
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="you@happirate.com"
                required
              />
            </div>
            <div>
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-500 "
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded-sm focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600"
                />
              </div>
              <div className="ms-3 text-sm">
                <label
                  for="remember"
                  className="font-medium text-gray-500 dark:text-gray-400"
                >
                  Remember this device
                </label>
              </div>
              <a
                href="#"
                className="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="btn w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              style={{ backgroundColor: "#5243bc" }}
            >
              Login Securely
            </button>
            <div className="pt-2 text-sm text-end font-medium text-gray-900">
              <a
                href="/register"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                Not registered yet? Create an account
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
