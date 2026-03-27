"use client";

import { useLocalStorage } from "./useLocalStorage";

export interface WeddingConfig {
  name1: string;
  name2: string;
  weddingDate: string;
  venue: string;
  city: string;
  guestTarget: number;
  budgetTotal: number;
  currency: string;
  ceremony: string;
  receptionStart: string;
  dinnerTime: string;
  partyTime: string;
  theme: string;
  colorScheme: string;
  notes: string;
}

const defaultConfig: WeddingConfig = {
  name1: "Vegard",
  name2: "",
  weddingDate: "2027-06-14",
  venue: "",
  city: "",
  guestTarget: 120,
  budgetTotal: 350000,
  currency: "NOK",
  ceremony: "",
  receptionStart: "",
  dinnerTime: "",
  partyTime: "",
  theme: "",
  colorScheme: "",
  notes: "",
};

export function useWedding() {
  const [config, setConfig] = useLocalStorage<WeddingConfig>("wedding-config", defaultConfig);

  const daysUntil = () => {
    if (!config.weddingDate) return null;
    const diff = new Date(config.weddingDate).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / 86400000));
  };

  const weddingTitle = () => {
    if (config.name1 && config.name2) return `${config.name1} & ${config.name2}`;
    if (config.name1) return `${config.name1}s bryllup`;
    return "Mitt bryllup";
  };

  const formatDate = () => {
    if (!config.weddingDate) return "Ikke satt";
    return new Date(config.weddingDate).toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return { config, setConfig, daysUntil, weddingTitle, formatDate };
}
