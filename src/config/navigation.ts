export const dashboardNav = [
  { label: "Oversikt", href: "/dashboard/overview", icon: "LayoutDashboard" },
  { label: "Budsjett", href: "/dashboard/budget", icon: "Wallet" },
  { label: "Gjester", href: "/dashboard/guests", icon: "Users" },
  { label: "Tidslinje", href: "/dashboard/timeline", icon: "Calendar" },
  { label: "Leverandører", href: "/dashboard/vendors", icon: "Store" },
  { label: "Invitasjoner", href: "/dashboard/invitations", icon: "Mail" },
  { label: "Bilder", href: "/dashboard/photos", icon: "Camera" },
  { label: "E-post", href: "/dashboard/emails", icon: "Inbox" },
  { label: "Chat", href: "/dashboard/chat", icon: "MessageCircle" },
  { label: "Innstillinger", href: "/dashboard/settings", icon: "Settings" },
] as const;

export const guestPortalNav = [
  { label: "RSVP", href: "/guest-portal/rsvp", icon: "CheckCircle" },
  { label: "Informasjon", href: "/guest-portal/info", icon: "Info" },
  { label: "Program", href: "/guest-portal/schedule", icon: "Calendar" },
  { label: "Bilder", href: "/guest-portal/photos", icon: "Camera" },
  { label: "Ønskeliste", href: "/guest-portal/gift-registry", icon: "Gift" },
] as const;
