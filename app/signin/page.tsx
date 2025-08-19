"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  return (
    <main className="container max-w-md py-20">
      <h1 className="text-3xl font-semibold">Anmelden</h1>
      <p className="text-text-dim mt-2">Wir senden dir einen Magic Link per E-Mail.</p>
      <form
        className="mt-6 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          await signIn('email', { email, redirect: true, callbackUrl: '/dashboard' });
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          className="w-full rounded-full bg-surface px-5 py-3 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button className="relative inline-flex items-center rounded-full px-6 py-3 font-medium text-white">
          <span className="absolute inset-0 rounded-full bg-brandGradient blur-sm opacity-60" />
          <span className="relative rounded-full bg-brandGradient px-6 py-3">Link senden</span>
        </button>
      </form>
    </main>
  );
}

