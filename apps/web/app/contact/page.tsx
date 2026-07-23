import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact</h1>
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Interested in working together? Reach out via:
        </p>
        <ul className="space-y-3">
          <li>
            <a href="mailto:ronald@ronaldatanoso.com" className="text-blue-600 hover:underline">
              ronald@ronaldatanoso.com
            </a>
          </li>
          <li>
            <a href="https://github.com/ronaldjohnatanoso" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/in/ronaldjohnatanoso" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
