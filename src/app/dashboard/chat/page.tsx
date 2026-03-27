"use client";

import { useState } from "react";

const suggestions = [
  "Hva bør vi gjøre først?",
  "Forslag til bordplassering",
  "Hjelp med invitasjonstekst",
  "Vanlig budsjett for bryllup?",
  "Tips til valg av fotograf",
  "Tidsplan for bryllupsdagen",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  return (
    <div className="flex h-[calc(100vh-8rem)] max-w-4xl flex-col">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">AI-assistent</h1>
        <p className="mt-1 text-[15px] text-muted-foreground">Spør om alt relatert til bryllupet ditt</p>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto rounded-2xl border border-border bg-white">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light">
              <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
            </div>
            <h2 className="mt-5 font-serif text-xl font-bold text-foreground">
              Hei! Hvordan kan jeg hjelpe?
            </h2>
            <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
              Jeg kjenner bryllupet ditt og kan hjelpe med alt fra budsjett og gjesteliste til tekster og leverandører.
            </p>
            <div className="mt-8 flex max-w-lg flex-wrap justify-center gap-2">
              {suggestions.map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="rounded-full border border-border bg-muted px-4 py-2 text-sm text-foreground transition hover:border-primary/30 hover:bg-primary-light hover:text-primary"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5 p-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="mr-3 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light">
                    <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                  </div>
                )}
                <div className={`max-w-[70%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          setMessages((prev) => [
            ...prev,
            { role: "user", content: input },
            { role: "assistant", content: "Denne funksjonen er under utvikling. Koble til Claude API i .env.local for å aktivere AI-chatten." },
          ]);
          setInput("");
        }}
        className="mt-4 flex gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Skriv en melding..."
          className="flex-1 rounded-xl border border-border bg-white px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition"
        />
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 hover:shadow-md"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          Send
        </button>
      </form>
    </div>
  );
}
