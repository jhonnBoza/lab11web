export type Project = {
  id: string;
  title: string;
  description: string;
  status: "Planificado" | "En progreso" | "En revisión" | "Completado";
  progress: number;
  teamMemberIds: string[];
  category: string;
  priority: string;
};

export type TeamMember = {
  userId: string;
  role: string;
  name: string;
  email: string;
  position: string;
  birthdate: string;
  phone: string;
  projectId: string;
  isActive: boolean;
};

export type Task = {
  id: string;
  description: string;
  projectId: string;
  status: "Pendiente" | "En progreso" | "Completado";
  priority: "Baja" | "Media" | "Alta" | "Urgente";
  userId: string;
  deadline: string;
};

export type AppSettings = {
  companyName: string;
  notifications: boolean;
  darkMode: boolean;
  language: string;
  weeklyReport: boolean;
};
