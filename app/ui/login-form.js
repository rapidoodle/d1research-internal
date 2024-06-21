'use client';

import React, { useState } from 'react';
import { authenticate } from '../lib/login';

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMessage(null);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await authenticate({ email, password });
      // Handle successful authentication, e.g., redirect to another page
      console.log('Authentication successful', result);
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <div className="w-full">
          <div>
            <label htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="form-control"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <span className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 peer-focus:text-gray-900">
                <i className="bi bi-envelope"></i>
              </span>
            </div>
          </div>
          <div className="mt-4">
            <label  htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="form-control"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="mt-4 w-full btn btn-primary" disabled={isPending}>
          {isPending ? 'Logging in...' : 'Log in'}
        </button>
        {errorMessage && (
          <div className="mt-3 alert alert-danger" role="alert">
            <i className="bi bi-exclamation-circle me-2"></i>
            {errorMessage}
          </div>
        )}
      </div>
    </form>
  );
}
