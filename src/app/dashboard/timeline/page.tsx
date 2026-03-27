"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

interface Task {
  id: string;
  title: string;
  deadline?: string;
  done: boolean;
  period: string;
}

const defaultTasks: Task[] = [
  { id: "t1", title: "Sett dato", deadline: undefined, done: true, period: "12+ måneder før" },
  { id: "t2", title: "Sett budsjett", deadline: undefined, done: true, period: "12+ måneder før" },
  { id: "t3", title: "Book venue", deadline: "2026-04-01", done: false, period: "12+ måneder før" },
  { id: "t4", title: "Begynn gjesteliste", deadline: undefined, done: false, period: "12+ måneder før" },
  { id: "t5", title: "Bestill fotograf", deadline: "2026-05-15", done: false, period: "9–12 måneder før" },
  { id: "t6", title: "Bestill catering", deadline: undefined, done: false, period: "9–12 måneder før" },
  { id: "t7", title: "Velg brudekjole", deadline: undefined, done: false, period: "9–12 måneder før" },
  { id: "t8", title: "Bestill band / DJ", deadline: undefined, done: false, period: "9–12 måneder før" },
  { id: "t9", title: "Send save-the-date", deadline: "2026-09-01", done: false, period: "9–12 måneder før" },
  { id: "t10", title: "Bestill blomster", deadline: undefined, done: false, period: "6–9 måneder før" },
  { id: "t11", title: "Bestill kake", deadline: undefined, done: false, period: "6–9 måneder før" },
  { id: "t12", title: "Planlegg vielse", deadline: undefined, done: false, period: "6–9 måneder før" },
  { id: "t13", title: "Bestill transport", deadline: undefined, done: false, period: "6–9 måneder før" },
  { id: "t14", title: "Send invitasjoner", deadline: "2027-02-01", done: false, period: "3–6 måneder før" },
  { id: "t15", title: "Bestill dresser / antrekk", deadline: undefined, done: false, period: "3–6 måneder før" },
  { id: "t16", title: "Planlegg bryllupsreise", deadline: undefined, done: false, period: "3–6 måneder før" },
  { id: "t17", title: "Velg musikk til seremoni", deadline: undefined, done: false, period: "3–6 måneder før" },
  { id: "t18", title: "Bekreft alle leverandører", deadline: undefined, done: false, period: "1–3 måneder før" },
  { id: "t19", title: "Lag bordplassering", deadline: undefined, done: false, period: "1–3 måneder før" },
  { id: "t20", title: "Planlegg program", deadline: undefined, done: false, period: "1–3 måneder før" },
  { id: "t21", title: "Prøvesminke og hårprøve", deadline: undefined, done: false, period: "1–3 måneder før" },
  { id: "t22", title: "Endelig bekreftelse med venue", deadline: undefined, done: false, period: "Siste uken" },
  { id: "t23", title: "Generalprøve", deadline: undefined, done: false, period: "Siste uken" },
  { id: "t24", title: "Forbered taler", deadline: undefined, done: false, period: "Siste uken" },
];

const periods = [
  "12+ måneder før",
  "9–12 måneder før",
  "6–9 måneder før",
  "3–6 måneder før",
  "1–3 måneder før",
  "Siste uken",
];

const TASK_SUGGESTIONS = [
  { title: "Sett dato", period: "12+ måneder før" },
  { title: "Sett budsjett", period: "12+ måneder før" },
  { title: "Book venue", period: "12+ måneder før" },
  { title: "Begynn gjesteliste", period: "12+ måneder før" },
  { title: "Bestill fotograf", period: "9–12 måneder før" },
  { title: "Bestill videograf", period: "9–12 måneder før" },
  { title: "Bestill catering", period: "9–12 måneder før" },
  { title: "Velg brudekjole", period: "9–12 måneder før" },
  { title: "Bestill band / DJ", period: "9–12 måneder før" },
  { title: "Send save-the-date", period: "9–12 måneder før" },
  { title: "Bestill prest / vigsler", period: "9–12 måneder før" },
  { title: "Bestill blomster", period: "6–9 måneder før" },
  { title: "Bestill kake", period: "6–9 måneder før" },
  { title: "Planlegg vielse", period: "6–9 måneder før" },
  { title: "Bestill transport", period: "6–9 måneder før" },
  { title: "Bestill overnatting for gjester", period: "6–9 måneder før" },
  { title: "Velg ringer", period: "6–9 måneder før" },
  { title: "Bestill dekorasjon", period: "6–9 måneder før" },
  { title: "Send invitasjoner", period: "3–6 måneder før" },
  { title: "Bestill dresser / antrekk", period: "3–6 måneder før" },
  { title: "Planlegg bryllupsreise", period: "3–6 måneder før" },
  { title: "Velg musikk til seremoni", period: "3–6 måneder før" },
  { title: "Bestill frisør og sminke", period: "3–6 måneder før" },
  { title: "Lag meny / matvalg", period: "3–6 måneder før" },
  { title: "Bekreft alle leverandører", period: "1–3 måneder før" },
  { title: "Lag bordplassering", period: "1–3 måneder før" },
  { title: "Planlegg program", period: "1–3 måneder før" },
  { title: "Prøvesminke og hårprøve", period: "1–3 måneder før" },
  { title: "Skriv taler", period: "1–3 måneder før" },
  { title: "Kjøp gaver til forlovere", period: "1–3 måneder før" },
  { title: "Endelig bekreftelse med venue", period: "Siste uken" },
  { title: "Generalprøve", period: "Siste uken" },
  { title: "Forbered taler", period: "Siste uken" },
  { title: "Pakk til bryllupsreise", period: "Siste uken" },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("nb-NO", { day: "numeric", month: "short", year: "numeric" });
}

function daysUntil(d: string) {
  const diff = new Date(d).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86400000));
}

export default function TimelinePage() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("wedding-tasks", defaultTasks);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [form, setForm] = useState({ title: "", deadline: "", period: periods[0] });
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const openAdd = () => {
    setEditTask(null);
    setForm({ title: "", deadline: "", period: periods[0] });
    setShowAllSuggestions(false);
    setShowModal(true);
  };

  const openEdit = (task: Task) => {
    setEditTask(task);
    setForm({ title: task.title, deadline: task.deadline || "", period: task.period });
    setShowModal(true);
  };

  const saveTask = () => {
    if (!form.title.trim()) return;
    if (editTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editTask.id
            ? { ...t, title: form.title, deadline: form.deadline || undefined, period: form.period }
            : t
        )
      );
    } else {
      const newTask: Task = {
        id: `t${Date.now()}`,
        title: form.title,
        deadline: form.deadline || undefined,
        done: false,
        period: form.period,
      };
      setTasks((prev) => [...prev, newTask]);
    }
    setShowModal(false);
  };

  const totalDone = tasks.filter((t) => t.done).length;
  const totalTasks = tasks.length;

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">Tidslinje</h1>
          <p className="mt-1 text-[15px] text-muted-foreground">
            {totalDone} av {totalTasks} oppgaver fullført
          </p>
        </div>
        <button
          onClick={openAdd}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 hover:shadow-md"
        >
          + Ny oppgave
        </button>
      </div>

      {/* Overall progress */}
      <div className="rounded-2xl border border-border bg-white p-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">Total fremgang</span>
          <span className="font-semibold text-primary">{totalTasks > 0 ? Math.round((totalDone / totalTasks) * 100) : 0}%</span>
        </div>
        <div className="mt-3 h-3 rounded-full bg-primary-light">
          <div className="h-3 rounded-full bg-primary transition-all duration-500" style={{ width: `${totalTasks > 0 ? (totalDone / totalTasks) * 100 : 0}%` }} />
        </div>
      </div>

      {/* Timeline groups */}
      <div className="space-y-6">
        {periods.map((period) => {
          const periodTasks = tasks.filter((t) => t.period === period);
          if (periodTasks.length === 0) return null;
          const done = periodTasks.filter((t) => t.done).length;
          const isCurrentPeriod = period === "12+ måneder før";
          return (
            <div key={period} className="rounded-2xl border border-border bg-white">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-sm font-bold text-foreground">{period}</h2>
                  {isCurrentPeriod && (
                    <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">Nå</span>
                  )}
                </div>
                <span className="text-xs font-medium text-muted-foreground">{done} / {periodTasks.length} fullført</span>
              </div>
              <div className="divide-y divide-border">
                {periodTasks.map((task) => (
                  <div key={task.id} className="group flex items-center justify-between px-6 py-3.5 transition hover:bg-muted/30">
                    <div className="flex items-center gap-3.5">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                          task.done
                            ? "border-primary bg-primary text-white scale-100"
                            : "border-border hover:border-primary/50 hover:scale-110"
                        }`}
                      >
                        {task.done && (
                          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        )}
                      </button>
                      <span
                        className={`text-sm cursor-pointer ${task.done ? "text-muted-foreground line-through" : "font-medium text-foreground"}`}
                        onClick={() => openEdit(task)}
                      >
                        {task.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.deadline && (
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          daysUntil(task.deadline) < 30
                            ? "bg-red-50 text-destructive"
                            : daysUntil(task.deadline) < 90
                            ? "bg-orange-50 text-orange-600"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {formatDate(task.deadline)} ({daysUntil(task.deadline)}d)
                        </span>
                      )}
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="opacity-0 group-hover:opacity-100 flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-50 hover:text-destructive"
                      >
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title={editTask ? "Rediger oppgave" : "Ny oppgave"}>
        {(() => {
          const existingTitles = new Set(tasks.map((t) => t.title.toLowerCase()));
          const availableSuggestions = TASK_SUGGESTIONS.filter(
            (s) => !existingTitles.has(s.title.toLowerCase())
          );
          const visibleSuggestions = showAllSuggestions
            ? availableSuggestions
            : availableSuggestions.slice(0, 4);
          const hasMore = availableSuggestions.length > 4;

          return (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Oppgave *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="f.eks. Book fotograf"
                  className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
                  autoFocus
                />
                {/* Suggestion pills */}
                {!editTask && availableSuggestions.length > 0 && (
                  <div className="mt-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      {visibleSuggestions.map((s) => (
                        <button
                          key={s.title}
                          type="button"
                          onClick={() => setForm({ ...form, title: s.title, period: s.period })}
                          className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
                        >
                          <svg className="h-3 w-3 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                          {s.title}
                        </button>
                      ))}
                    </div>
                    {hasMore && !showAllSuggestions && (
                      <button
                        type="button"
                        onClick={() => setShowAllSuggestions(true)}
                        className="mt-1.5 text-xs font-medium text-stone-400 transition hover:text-stone-600"
                      >
                        Vis flere forslag ({availableSuggestions.length - 4} til)
                      </button>
                    )}
                    {showAllSuggestions && (
                      <button
                        type="button"
                        onClick={() => setShowAllSuggestions(false)}
                        className="mt-1.5 text-xs font-medium text-stone-400 transition hover:text-stone-600"
                      >
                        Vis faerre
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Frist (valgfritt)</label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Periode</label>
                <select
                  value={form.period}
                  onChange={(e) => setForm({ ...form, period: e.target.value })}
                  className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10"
                >
                  {periods.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted">
                  Avbryt
                </button>
                <button onClick={saveTask} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
                  {editTask ? "Lagre" : "Legg til"}
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
