import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">
          Ronald Atanoso
        </h1>
        <p className="text-xl text-gray-600">
          Cloud Engineer · AI Builder · Problem Solver
        </p>
        <p className="text-gray-500 leading-relaxed">
          Building an enterprise-grade multi-cloud platform on Azure and GCP —
          portfolio, AI playground, and automation foundation for what's next.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link
            href="/projects"
            className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            View Projects
          </Link>
          <Link
            href="/resume"
            className="px-6 py-3 border rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Resume
          </Link>
        </div>
      </div>

      {/* Tech stack badges */}
      <div className="flex flex-wrap gap-2 justify-center mt-12 text-xs text-gray-500">
        {["Azure", "GCP", "TypeScript", "React", "Next.js", "Python", "Terraform", "Kubernetes", "AI"].map((tech) => (
          <span key={tech} className="px-3 py-1 border rounded-full">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
