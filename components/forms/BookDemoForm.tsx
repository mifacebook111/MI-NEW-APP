'use client';

import { useState, useEffect } from 'react';

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
  honeypot: string;
}

interface BookDemoFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookDemoForm({ isOpen, onClose }: BookDemoFormProps) {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    message: '',
    honeypot: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ name: '', email: '', company: '', message: '', honeypot: '' });
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-[var(--token-surface)] rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[var(--token-text-primary)]">
            Book a Demo
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--token-bg-secondary)] transition-colors"
            aria-label="Close modal"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--token-text-secondary)]"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {success ? (
          <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20">
            <p className="text-center text-green-600 dark:text-green-400 font-medium">
              🎉 Thank you! We&apos;ll contact you soon to schedule your demo.
            </p>
          </div>
        ) : (
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
                htmlFor="demo-name"
                className="block text-sm font-medium text-[var(--token-text-primary)] mb-2"
              >
                Name *
              </label>
              <input
                type="text"
                id="demo-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[var(--token-bg)] border border-[var(--token-border)] text-[var(--token-text-primary)] placeholder:text-[var(--token-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--token-primary)] focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="demo-email"
                className="block text-sm font-medium text-[var(--token-text-primary)] mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="demo-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[var(--token-bg)] border border-[var(--token-border)] text-[var(--token-text-primary)] placeholder:text-[var(--token-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--token-primary)] focus:border-transparent transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="demo-company"
                className="block text-sm font-medium text-[var(--token-text-primary)] mb-2"
              >
                Company
              </label>
              <input
                type="text"
                id="demo-company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[var(--token-bg)] border border-[var(--token-border)] text-[var(--token-text-primary)] placeholder:text-[var(--token-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--token-primary)] focus:border-transparent transition-all"
                placeholder="Acme Inc."
              />
            </div>

            <div>
              <label
                htmlFor="demo-message"
                className="block text-sm font-medium text-[var(--token-text-primary)] mb-2"
              >
                Message
              </label>
              <textarea
                id="demo-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-[var(--token-bg)] border border-[var(--token-border)] text-[var(--token-text-primary)] placeholder:text-[var(--token-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--token-primary)] focus:border-transparent transition-all resize-none"
                placeholder="Tell us about your needs..."
              />
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 text-base font-semibold text-[var(--token-text-primary)] border-2 border-[var(--token-border)] hover:border-[var(--token-text-primary)] rounded-full transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 text-base font-semibold text-white bg-[var(--token-primary)] hover:bg-[var(--token-primary-hover)] rounded-full transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
