"use client";
import { useState } from 'react';

export default function SettingsPage() {
  const [primary, setPrimary] = useState('#8B5CF6');
  return (
    <div>
      <h1 className="text-3xl font-semibold">Einstellungen</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-surface p-6 ring-1 ring-white/10">
          <h2 className="text-lg font-medium">Theme</h2>
          <p className="text-text-dim mt-1">Passe die Markenfarbe live an.</p>
          <div className="mt-4 flex items-center gap-3">
            <input type="color" value={primary} onChange={(e) => { setPrimary(e.target.value); document.documentElement.style.setProperty('--primary', e.target.value); }} />
            <span className="text-text-dim">Primary</span>
          </div>
        </div>
      </div>
    </div>
  );
}

