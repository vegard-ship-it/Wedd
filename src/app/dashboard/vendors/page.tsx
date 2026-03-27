"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

interface Vendor {
  id: string;
  name: string;
  category: string;
  contact: string;
  email: string;
  phone: string;
  price: number;
  status: "considering" | "contacted" | "booked" | "paid";
  notes: string;
}

const vendorCategories = [
  "Venue", "Catering", "Fotograf", "Videograf", "Blomster", "Musikk / DJ",
  "Band", "Kake", "Brudekjole", "Dress", "Hår & sminke", "Transport", "Dekor", "Ringer", "Vielsesperson", "Annet",
];

const statusLabels: Record<string, string> = {
  considering: "Vurderer", contacted: "Kontaktet", booked: "Booket", paid: "Betalt",
};
const statusColors: Record<string, string> = {
  considering: "bg-amber-50 text-amber-700", contacted: "bg-blue-50 text-blue-700", booked: "bg-emerald-50 text-emerald-700", paid: "bg-primary-light text-primary",
};

export default function VendorsPage() {
  const [vendors, setVendors] = useLocalStorage<Vendor[]>("wedding-vendors", []);
  const [showModal, setShowModal] = useState(false);
  const [editVendor, setEditVendor] = useState<Vendor | null>(null);
  const [form, setForm] = useState({ name: "", category: vendorCategories[0], contact: "", email: "", phone: "", price: "", status: "considering" as Vendor["status"], notes: "" });

  const openAdd = () => {
    setEditVendor(null);
    setForm({ name: "", category: vendorCategories[0], contact: "", email: "", phone: "", price: "", status: "considering", notes: "" });
    setShowModal(true);
  };

  const openEdit = (v: Vendor) => {
    setEditVendor(v);
    setForm({ name: v.name, category: v.category, contact: v.contact, email: v.email, phone: v.phone, price: v.price.toString(), status: v.status, notes: v.notes });
    setShowModal(true);
  };

  const saveVendor = () => {
    if (!form.name.trim()) return;
    if (editVendor) {
      setVendors((prev) => prev.map((v) => v.id === editVendor.id ? { ...v, ...form, price: parseFloat(form.price) || 0 } : v));
    } else {
      setVendors((prev) => [...prev, { id: `v${Date.now()}`, ...form, price: parseFloat(form.price) || 0 }]);
    }
    setShowModal(false);
  };

  const deleteVendor = (id: string) => setVendors((prev) => prev.filter((v) => v.id !== id));
  const fmt = (n: number) => n.toLocaleString("nb-NO");
  const booked = vendors.filter((v) => v.status === "booked" || v.status === "paid").length;
  const totalCost = vendors.reduce((s, v) => s + v.price, 0);

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">Leverandører</h1>
          <p className="mt-1 text-[15px] text-muted-foreground">Hold styr på alle leverandører og kontrakter</p>
        </div>
        <button onClick={openAdd} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 hover:shadow-md">
          + Legg til leverandør
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-5 sm:grid-cols-4">
        {[
          { label: "Totalt", value: vendors.length.toString() },
          { label: "Booket", value: booked.toString() },
          { label: "Venter svar", value: vendors.filter((v) => v.status === "contacted").length.toString() },
          { label: "Total kostnad", value: `${fmt(totalCost)} kr` },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
            <p className="mt-3 font-serif text-3xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Vendor list or empty state */}
      {vendors.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white">
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light">
              <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M2 7h20"/></svg>
            </div>
            <h3 className="mt-5 font-serif text-lg font-bold text-foreground">Ingen leverandører ennå</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">Legg til leverandører for å holde oversikt over kontrakter og priser.</p>
            <button onClick={openAdd} className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">+ Legg til leverandør</button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-white overflow-hidden">
          <div className="grid grid-cols-[1fr_120px_100px_100px_60px] gap-4 border-b border-border bg-muted/50 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <span>Leverandør</span>
            <span>Kategori</span>
            <span>Status</span>
            <span>Pris</span>
            <span />
          </div>
          <div className="divide-y divide-border">
            {vendors.map((v) => (
              <div key={v.id} className="group grid grid-cols-[1fr_120px_100px_100px_60px] items-center gap-4 px-6 py-3.5 transition hover:bg-muted/30">
                <div className="cursor-pointer" onClick={() => openEdit(v)}>
                  <p className="text-sm font-medium text-foreground">{v.name}</p>
                  <p className="text-xs text-muted-foreground">{v.contact || v.email || "—"}</p>
                </div>
                <span className="text-xs text-muted-foreground">{v.category}</span>
                <select
                  value={v.status}
                  onChange={(e) => setVendors((prev) => prev.map((x) => x.id === v.id ? { ...x, status: e.target.value as Vendor["status"] } : x))}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold border-0 cursor-pointer ${statusColors[v.status]}`}
                >
                  {Object.entries(statusLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                </select>
                <span className="text-sm font-medium tabular-nums text-foreground">{fmt(v.price)} kr</span>
                <button onClick={() => deleteVendor(v.id)} className="opacity-0 group-hover:opacity-100 flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-50 hover:text-destructive">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title={editVendor ? "Rediger leverandør" : "Legg til leverandør"}>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Firmanavn *</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="f.eks. Studio Nord" className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10" autoFocus />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Kategori</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10">
                {vendorCategories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Vendor["status"] })} className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10">
                {Object.entries(statusLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Kontaktperson</label>
              <input type="text" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="Navn" className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Pris (kr)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="35000" className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">E-post</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="kontakt@firma.no" className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Telefon</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="900 00 000" className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Notater</label>
            <input type="text" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Ekstra info..." className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowModal(false)} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted">Avbryt</button>
            <button onClick={saveVendor} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">{editVendor ? "Lagre" : "Legg til"}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
