"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

interface BudgetCategory {
  id: string;
  name: string;
  budgeted: number;
  color: string;
}

interface Expense {
  id: string;
  name: string;
  amount: number;
  categoryId: string;
  paid: boolean;
  date: string;
  note: string;
}

const defaultCategories: BudgetCategory[] = [
  { id: "c1", name: "Venue & lokale", budgeted: 80000, color: "bg-teal-500" },
  { id: "c2", name: "Catering & mat", budgeted: 70000, color: "bg-orange-500" },
  { id: "c3", name: "Fotograf & video", budgeted: 35000, color: "bg-blue-500" },
  { id: "c4", name: "Blomster & dekor", budgeted: 25000, color: "bg-pink-500" },
  { id: "c5", name: "Musikk & underholdning", budgeted: 20000, color: "bg-purple-500" },
  { id: "c6", name: "Klær & tilbehør", budgeted: 30000, color: "bg-indigo-500" },
  { id: "c7", name: "Ringer", budgeted: 25000, color: "bg-amber-500" },
  { id: "c8", name: "Transport", budgeted: 10000, color: "bg-green-500" },
  { id: "c9", name: "Kake", budgeted: 8000, color: "bg-rose-500" },
  { id: "c10", name: "Invitasjoner", budgeted: 5000, color: "bg-cyan-500" },
  { id: "c11", name: "Overnatting gjester", budgeted: 15000, color: "bg-emerald-500" },
  { id: "c12", name: "Diverse & buffer", budgeted: 27000, color: "bg-slate-500" },
];

export default function BudgetPage() {
  const [categories, setCategories] = useLocalStorage<BudgetCategory[]>("wedding-budget-cats", defaultCategories);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("wedding-expenses", []);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);
  const [editCat, setEditCat] = useState<BudgetCategory | null>(null);
  const [expForm, setExpForm] = useState({ name: "", amount: "", categoryId: "", paid: false, date: "", note: "" });
  const [catForm, setCatForm] = useState({ name: "", budgeted: "" });

  const totalBudget = categories.reduce((s, c) => s + c.budgeted, 0);
  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const remaining = totalBudget - totalSpent;
  const pctUsed = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  const spentByCategory = (catId: string) => expenses.filter((e) => e.categoryId === catId).reduce((s, e) => s + e.amount, 0);

  const openAddExpense = () => {
    setExpForm({ name: "", amount: "", categoryId: categories[0]?.id || "", paid: false, date: new Date().toISOString().split("T")[0], note: "" });
    setShowExpenseModal(true);
  };

  const saveExpense = () => {
    if (!expForm.name.trim() || !expForm.amount) return;
    setExpenses((prev) => [...prev, {
      id: `e${Date.now()}`,
      name: expForm.name,
      amount: parseFloat(expForm.amount),
      categoryId: expForm.categoryId,
      paid: expForm.paid,
      date: expForm.date,
      note: expForm.note,
    }]);
    setShowExpenseModal(false);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const openEditCat = (cat: BudgetCategory) => {
    setEditCat(cat);
    setCatForm({ name: cat.name, budgeted: cat.budgeted.toString() });
    setShowCatModal(true);
  };

  const saveCat = () => {
    if (!catForm.name.trim()) return;
    if (editCat) {
      setCategories((prev) => prev.map((c) => c.id === editCat.id ? { ...c, name: catForm.name, budgeted: parseFloat(catForm.budgeted) || 0 } : c));
    } else {
      setCategories((prev) => [...prev, { id: `c${Date.now()}`, name: catForm.name, budgeted: parseFloat(catForm.budgeted) || 0, color: "bg-gray-500" }]);
    }
    setShowCatModal(false);
  };

  const fmt = (n: number) => n.toLocaleString("nb-NO");

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">Budsjett</h1>
          <p className="mt-1 text-[15px] text-muted-foreground">Oversikt over budsjett, sparing og forbruk</p>
        </div>
        <button onClick={openAddExpense} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 hover:shadow-md">
          + Ny utgift
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Totalt budsjett</p>
          <p className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground">{fmt(totalBudget)} <span className="text-lg font-normal text-muted-foreground">kr</span></p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Brukt</p>
          <p className="mt-3 font-serif text-3xl font-bold tracking-tight text-primary">{fmt(totalSpent)} <span className="text-lg font-normal text-muted-foreground">kr</span></p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Gjenstående</p>
          <p className={`mt-3 font-serif text-3xl font-bold tracking-tight ${remaining < 0 ? "text-destructive" : "text-foreground"}`}>{fmt(remaining)} <span className="text-lg font-normal text-muted-foreground">kr</span></p>
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-2xl border border-border bg-white p-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">Totalforbruk</span>
          <span className="font-semibold text-primary">{pctUsed}%</span>
        </div>
        <div className="mt-3 h-3 rounded-full bg-primary-light">
          <div className={`h-3 rounded-full transition-all duration-500 ${pctUsed > 90 ? "bg-destructive" : "bg-primary"}`} style={{ width: `${Math.min(pctUsed, 100)}%` }} />
        </div>
      </div>

      {/* Categories */}
      <div className="rounded-2xl border border-border bg-white">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-sm font-bold text-foreground">Kategorier</h2>
          <button onClick={() => { setEditCat(null); setCatForm({ name: "", budgeted: "" }); setShowCatModal(true); }} className="text-xs font-semibold text-primary transition hover:text-primary/80">+ Legg til kategori</button>
        </div>
        <div className="divide-y divide-border">
          {categories.map((cat) => {
            const spent = spentByCategory(cat.id);
            const pct = cat.budgeted > 0 ? (spent / cat.budgeted) * 100 : 0;
            return (
              <div key={cat.id} className="flex items-center gap-5 px-6 py-4 transition hover:bg-muted/30 cursor-pointer" onClick={() => openEditCat(cat)}>
                <div className={`h-3 w-3 rounded-full ${cat.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{cat.name}</p>
                    <p className="text-sm tabular-nums text-foreground">
                      {fmt(spent)} <span className="text-muted-foreground">/ {fmt(cat.budgeted)} kr</span>
                    </p>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-muted">
                    <div className={`h-1.5 rounded-full ${pct > 100 ? "bg-destructive" : cat.color} transition-all`} style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent expenses */}
      {expenses.length > 0 && (
        <div className="rounded-2xl border border-border bg-white">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-sm font-bold text-foreground">Utgifter</h2>
          </div>
          <div className="divide-y divide-border">
            {expenses.sort((a, b) => b.date.localeCompare(a.date)).map((exp) => {
              const cat = categories.find((c) => c.id === exp.categoryId);
              return (
                <div key={exp.id} className="group flex items-center justify-between px-6 py-3.5 transition hover:bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className={`h-2.5 w-2.5 rounded-full ${cat?.color || "bg-gray-400"}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{exp.name}</p>
                      <p className="text-xs text-muted-foreground">{cat?.name} &middot; {new Date(exp.date).toLocaleDateString("nb-NO")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold tabular-nums text-foreground">{fmt(exp.amount)} kr</span>
                    {exp.paid && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Betalt</span>}
                    <button onClick={() => deleteExpense(exp.id)} className="opacity-0 group-hover:opacity-100 flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-50 hover:text-destructive">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add expense modal */}
      <Modal open={showExpenseModal} onClose={() => setShowExpenseModal(false)} title="Ny utgift">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Beskrivelse *</label>
            <input type="text" value={expForm.name} onChange={(e) => setExpForm({ ...expForm, name: e.target.value })} placeholder="f.eks. Depositum venue" className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10" autoFocus />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Beløp (kr) *</label>
              <input type="number" value={expForm.amount} onChange={(e) => setExpForm({ ...expForm, amount: e.target.value })} placeholder="25000" className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Dato</label>
              <input type="date" value={expForm.date} onChange={(e) => setExpForm({ ...expForm, date: e.target.value })} className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Kategori</label>
            <select value={expForm.categoryId} onChange={(e) => setExpForm({ ...expForm, categoryId: e.target.value })} className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10">
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Notat (valgfritt)</label>
            <input type="text" value={expForm.note} onChange={(e) => setExpForm({ ...expForm, note: e.target.value })} placeholder="Ekstra info..." className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10" />
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setExpForm({ ...expForm, paid: !expForm.paid })} className={`flex h-5 w-9 items-center rounded-full transition-colors ${expForm.paid ? "bg-primary" : "bg-border"}`}>
              <span className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${expForm.paid ? "translate-x-[18px]" : "translate-x-0.5"}`} />
            </button>
            <label className="text-sm text-foreground">Allerede betalt</label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowExpenseModal(false)} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted">Avbryt</button>
            <button onClick={saveExpense} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">Legg til</button>
          </div>
        </div>
      </Modal>

      {/* Edit category modal */}
      <Modal open={showCatModal} onClose={() => setShowCatModal(false)} title={editCat ? "Rediger kategori" : "Ny kategori"}>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Navn *</label>
            <input type="text" value={catForm.name} onChange={(e) => setCatForm({ ...catForm, name: e.target.value })} placeholder="f.eks. Fotograf" className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10" autoFocus />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Budsjettert beløp (kr)</label>
            <input type="number" value={catForm.budgeted} onChange={(e) => setCatForm({ ...catForm, budgeted: e.target.value })} placeholder="50000" className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowCatModal(false)} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted">Avbryt</button>
            <button onClick={saveCat} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">{editCat ? "Lagre" : "Legg til"}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
