// Re-export Prisma-genererte typer
export type {
  User,
  Wedding,
  Guest,
  GuestGroup,
  BudgetCategory,
  BudgetItem,
  Vendor,
  TimelineEvent,
  Invitation,
  Photo,
  Album,
  Email,
  EmailTemplate,
  ChatMessage,
  Notification,
} from "@prisma/client";

// App-spesifikke typer

export interface DashboardStats {
  daysUntilWedding: number;
  totalGuests: number;
  confirmedGuests: number;
  declinedGuests: number;
  pendingGuests: number;
  totalBudget: number;
  totalSpent: number;
  totalSaved: number;
  upcomingDeadlines: number;
  unreadNotifications: number;
}

export interface ChatContext {
  weddingName: string;
  weddingDate: string | null;
  guestCount: number;
  confirmedCount: number;
  budgetTotal: number;
  budgetSpent: number;
  upcomingEvents: string[];
  vendors: string[];
}
