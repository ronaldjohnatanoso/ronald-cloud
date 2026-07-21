"use client";

import { CopilotKitProvider, useCopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export function AskRonaldButton() {
  const { isOpen, open, close } = useCopilotChat();

  return (
    <>
      {/* Floating button */}
      <button
        onClick={open}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-black text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition"
        aria-label="Chat with Ronald"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Chat panel — rendered by CopilotKit */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-h-[500px] bg-white border rounded-xl shadow-2xl flex flex-col">
          <div className="p-4 border-b font-medium flex justify-between items-center">
            <span>Ask Ronald</span>
            <button onClick={close} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
          <div className="flex-1 overflow-auto p-4 text-sm text-gray-500">
            <p>Hello! Ask me anything about Ronald — his skills, projects, certifications, or experience.</p>
          </div>
        </div>
      )}
    </>
  );
}
