"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  group: string;
  rsvp: "pending" | "accepted" | "declined";
  dietary: string;
  plusOne: boolean;
}

const groups = ["Familie brud", "Familie brudgom", "Venner brud", "Venner brudgom", "Kolleger", "Andre"];

export default function GuestsPage() {
  const [guests, setGuests] = useLocalStorage<Guest[]>("wedding-guests", []);
  const [showModal, setShowModal] = useState(false);
  const [editGuest, setEditGuest] = useState<Guest | null>(null);
  const [search, setSearch] = useState("");
  const [filterGroup, setFilterGroup] = useState("all");
  const [filterRsvp, setFilterRsvp] = useState("all");
  const [form, setForm] = useState<Omit<Guest, "id">>({
    firstName: "", lastName: "", email: "", phone: "", group: groups[0], rsvp: "pending", dietary: "", plusOne: false,
  });

  const openAdd = () => {
    setEditGuest(null);
    setForm({ firstName: "", lastName: "", email: "", phone: "", group: groups[0], rsvp: "pending", dietary: "", plusOne: false });
    setShowModal(true);
  };

  const openEdit = (guest: Guest) => {
    setEditGuest(guest);
    setForm({ firstName: guest.firstName, lastName: guest.lastName, email: guest.email, phone: guest.phone, group: guest.group, rsvp: guest.rsvp, dietary: guest.dietary, plusOne: guest.plusOne });
    setShowModal(true);
  };

  const saveGuest = () => {
    if (!form.firstName.trim()) return;
    if (editGuest) {
      setGuests((prev) => prev.map((g) => g.id === editGuest.id ? { ...g, ...form } : g));
    } else {
      setGuests((prev) => [...prev, { id: `g${Date.now()}`, ...form }]);
    }
    setShowModal(false);
  };

  const deleteGuest = (id: string) => {
    setGuests((prev) => prev.filter((g) => g.id !== id));
  };

  const toggleRsvp = (id: string, status: Guest["rsvp"]) => {
    setGuests((prev) => prev.map((g) => g.id === id ? { ...g, rsvp: status } : g));
  };

  const filtered = guests.filter((g) => {
    const matchSearch = `${g.firstName} ${g.lastName}`.toLowerCase().includes(search.toLowerCase());
    const matchGroup = filterGroup === "all" || g.group === filterGroup;
    const matchRsvp = filterRsvp === "all" || g.rsvp === filterRsvp;
    return matchSearch && matchGroup && matchRsvp;
  });

  const accepted = guests.filter((g) => g.rsvp === "accepted").length;
  const declined = guests.filter((g) => g.rsvp === "declined").length;
  const pending = guests.filter((g) => g.rsvp === "pending").length;

  const rsvpColors = {
    pending: "bg-amber-50 text-amber-700",
    accepted: "bg-emerald-50 text-emerald-700",
    declined: "bg-red-50 text-destructive",
  };
  const rsvpLabels = { pending: "Venter", accepted: "Kommer", declined: "Avslått" };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground">Gjester</h1>
          <p className="mt-1 text-[15px] text-muted-foreground">Administrer gjestelisten og RSVP-svar</p>
        </div>
        <div className="flex gap-3">
          <button onClick={openAdd} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 hover:shadow-md">
            + Legg til gjest
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-4">
        {[
          { label: "Totalt invitert", value: guests.length },
          { label: "Bekreftet", value: accepted },
          { label: "Avslått", value: declined },
          { label: "Venter svar", value: pending },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
            <p className="mt-3 font-serif text-3xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search & filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Søk etter gjester..."
            className="h-11 w-full rounded-xl border border-border bg-white pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition"
          />
        </div>
        <select value={filterGroup} onChange={(e) => setFilterGroup(e.target.value)} className="h-11 rounded-xl border border-border bg-white px-4 text-sm text-foreground focus:border-primary focus:outline-none">
          <option value="all">Alle grupper</option>
          {groups.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        <select value={filterRsvp} onChange={(e) => setFilterRsvp(e.target.value)} className="h-11 rounded-xl border border-border bg-white px-4 text-sm text-foreground focus:border-primary focus:outline-none">
          <option value="all">Alle statuser</option>
          <option value="accepted">Bekreftet</option>
          <option value="declined">Avslått</option>
          <option value="pending">Venter</option>
        </select>
      </div>

      {/* Guest list or empty state */}
      {guests.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white">
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light">
              <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
            </div>
            <h3 className="mt-5 font-serif text-lg font-bold text-foreground">Ingen gjester ennå</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">Begynn med å legge til gjester i gjestelisten.</p>
            <button onClick={openAdd} className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
              + Legg til gjest
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-white overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_140px_120px_100px_60px] gap-4 border-b border-border bg-muted/50 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <span>Navn</span>
            <span>Gruppe</span>
            <span>RSVP</span>
            <span>Diett</span>
            <span />
          </div>
          <div className="divide-y divide-border">
            {filtered.map((guest) => (
              <div key={guest.id} className="group grid grid-cols-[1fr_140px_120px_100px_60px] items-center gap-4 px-6 py-3.5 transition hover:bg-muted/30">
                <div className="cursor-pointer" onClick={() => openEdit(guest)}>
                  <p className="text-sm font-medium text-foreground">{guest.firstName} {guest.lastName}</p>
                  <p className="text-xs text-muted-foreground">{guest.email || guest.phone || "—"}</p>
                </div>
                <span className="text-xs text-muted-foreground">{guest.group}</span>
                <div>
                  <select
                    value={guest.rsvp}
                    onChange={(e) => toggleRsvp(guest.id, e.target.value as Guest["rsvp"])}
                    className={`rounded-full px-3 py-1 text-xs font-semibold border-0 cursor-pointer ${rsvpColors[guest.rsvp]}`}
                  >
                    <option value="pending">Venter</option>
                    <option value="accepted">Kommer</option>
                    <option value="declined">Avslått</option>
                  </select>
                </div>
                <span className="text-xs text-muted-foreground truncate">{guest.dietary || "—"}</span>
                <button
                  onClick={() => deleteGuest(guest.id)}
                  className="opacity-0 group-hover:opacity-100 flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-50 hover:text-destructive"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">Ingen gjester matcher søket.</div>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title={editGuest ? "Rediger gjest" : "Legg til gjest"}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Fornavn *</label>
              <input type="text" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="Ola" className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10" autoFocus />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Etternavn</label>
              <input type="text" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Nordmann" className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">E-post</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ola@example.com" className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Telefon</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="900 00 000" className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Gruppe</label>
              <select value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })} className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10">
                {groups.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">RSVP</label>
              <select value={form.rsvp} onChange={(e) => setForm({ ...form, rsvp: e.target.value as Guest["rsvp"] })} className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10">
                <option value="pending">Venter</option>
                <option value="accepted">Kommer</option>
                <option value="declined">Avslått</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Diett / allergier</label>
            <input type="text" value={form.dietary} onChange={(e) => setForm({ ...form, dietary: e.target.value })} placeholder="f.eks. Vegetar, nøtteallergi" className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10" />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setForm({ ...form, plusOne: !form.plusOne })}
              className={`flex h-5 w-9 items-center rounded-full transition-colors ${form.plusOne ? "bg-primary" : "bg-border"}`}
            >
              <span className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${form.plusOne ? "translate-x-[18px]" : "translate-x-0.5"}`} />
            </button>
            <label className="text-sm text-foreground">Pluss én</label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowModal(false)} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted">Avbryt</button>
            <button onClick={saveGuest} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">{editGuest ? "Lagre" : "Legg til"}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
