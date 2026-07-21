import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@copilotkit/react-core/v2/styles.css";
import "./globals.css";
import { CopilotKit } from "@copilotkit/react-core/v2";
import { CopilotSidebar } from "@copilotkit/react-core/v2";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ronald Atanoso — Cloud Engineer & Architect",
  description: "Enterprise multi-cloud platform showcase — Azure, GCP, AI, and automation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CopilotKit runtimeUrl="/api/copilotkit">
          <CopilotSidebar />
          <nav className="border-b px-6 py-4 flex items-center justify-between">
            <div className="font-bold text-lg">Ronald Atanoso</div>
            <div className="flex gap-6 text-sm">
              <a href="/" className="hover:text-blue-600">Home</a>
              <a href="/about" className="hover:text-blue-600">About</a>
              <a href="/resume" className="hover:text-blue-600">Resume</a>
              <a href="/certifications" className="hover:text-blue-600">Certifications</a>
              <a href="/projects" className="hover:text-blue-600">Projects</a>
              <a href="/blog" className="hover:text-blue-600">Blog</a>
              <a href="/contact" className="hover:text-blue-600">Contact</a>
            </div>
          </nav>
          <main className="min-h-screen">{children}</main>
          <footer className="border-t px-6 py-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Ronald Atanoso — Built on Azure + GCP
          </footer>
        </CopilotKit>
      </body>
    </html>
  );
}
