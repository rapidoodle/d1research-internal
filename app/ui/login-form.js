'use client';

import React, { useState } from 'react';
import { authenticate } from '../lib/login';
import { useFormState, useFormStatus } from 'react-dom';
import { csrfToken, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const initialState = {
    message: '',
  }

export default function LoginForm( { csrfToken } ) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isPending, setPending] = useState(null);
    const [state, setState] = useState(null);

    const router = useRouter();
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const response = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
      });
  
      console.log({ response });
      if (!response?.error) {
        router.push('/');
        router.refresh();
      }
    };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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
        {state && (
          <div className="mt-3 alert alert-danger" role="alert">
            <i className="bi bi-exclamation-circle me-2"></i>
            {state.message}
          </div>
        )}
      </div>
    </form>
  );
}
