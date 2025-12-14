export default function BlogPage() {
  return (
    <div className="min-h-[80vh] px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[var(--token-text-primary)] mb-8">
          Blog
        </h1>
        <div className="prose prose-lg">
          <p className="text-[var(--token-text-secondary)]">
            Blog posts will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
}
