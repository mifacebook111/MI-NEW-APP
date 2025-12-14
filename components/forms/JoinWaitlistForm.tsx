'use client';

import { useState } from 'react';

interface FormState {
  name: string;
  email: string;
  industry: string;
  volume: string;
  honeypot: string;
}

interface JoinWaitlistFormProps {
  onSuccess?: () => void;
}

export function JoinWaitlistForm({ onSuccess }: JoinWaitlistFormProps) {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    industry: '',
    volume: '',
    honeypot: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', industry: '', volume: '', honeypot: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (success) {
    return (
      <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20">
        <p className="text-center text-green-600 dark:text-green-400 font-medium">
          🎉 Thank you for joining our waitlist! We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="hidden">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[var(--token-text-primary)] mb-2"
        >
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-[var(--token-surface)] border border-[var(--token-border)] text-[var(--token-text-primary)] placeholder:text-[var(--token-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--token-primary)] focus:border-transparent transition-all"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[var(--token-text-primary)] mb-2"
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-[var(--token-surface)] border border-[var(--token-border)] text-[var(--token-text-primary)] placeholder:text-[var(--token-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--token-primary)] focus:border-transparent transition-all"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="industry"
          className="block text-sm font-medium text-[var(--token-text-primary)] mb-2"
        >
          Industry
        </label>
        <select
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-[var(--token-surface)] border border-[var(--token-border)] text-[var(--token-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--token-primary)] focus:border-transparent transition-all"
        >
          <option value="">Select an industry</option>
          <option value="technology">Technology</option>
          <option value="finance">Finance</option>
          <option value="healthcare">Healthcare</option>
          <option value="retail">Retail</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="volume"
          className="block text-sm font-medium text-[var(--token-text-primary)] mb-2"
        >
          Expected Lead Volume
        </label>
        <select
          id="volume"
          name="volume"
          value={formData.volume}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-[var(--token-surface)] border border-[var(--token-border)] text-[var(--token-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--token-primary)] focus:border-transparent transition-all"
        >
          <option value="">Select volume</option>
          <option value="0-100">0-100 leads/month</option>
          <option value="100-500">100-500 leads/month</option>
          <option value="500-1000">500-1,000 leads/month</option>
          <option value="1000+">1,000+ leads/month</option>
        </select>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 text-base font-semibold text-white bg-[var(--token-primary)] hover:bg-[var(--token-primary-hover)] rounded-full transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Submitting...' : 'Join Waitlist'}
      </button>
    </form>
  );
}
