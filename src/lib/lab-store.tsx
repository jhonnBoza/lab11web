"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AppSettings, Project, Task, TeamMember } from "./lab-types";

const initialProjects: Project[] = [
  {
    id: "p1",
    title: "E-commerce Platform",
    description: "Plataforma de comercio electrónico con Next.js",
    status: "En progreso",
    progress: 65,
    teamMemberIds: ["u1", "u2", "u5"],
    category: "web",
    priority: "high",
  },
  {
    id: "p2",
    title: "Mobile App",
    description: "Aplicación móvil con React Native",
    status: "En revisión",
    progress: 90,
    teamMemberIds: ["u3"],
    category: "mobile",
    priority: "medium",
  },
  {
    id: "p3",
    title: "Dashboard Analytics",
    description: "Panel de análisis con visualizaciones",
    status: "Planificado",
    progress: 20,
    teamMemberIds: ["u4"],
    category: "design",
    priority: "low",
  },
];

const initialMembers: TeamMember[] = [
  {
    userId: "u1",
    role: "developer",
    name: "María García",
    email: "maria@example.com",
    position: "Frontend Developer",
    birthdate: "1995-03-12",
    phone: "+51 999 111 222",
    projectId: "p1",
    isActive: true,
  },
  {
    userId: "u2",
    role: "developer",
    name: "Juan Pérez",
    email: "juan@example.com",
    position: "Backend Developer",
    birthdate: "1992-07-20",
    phone: "+51 999 333 444",
    projectId: "p1",
    isActive: true,
  },
  {
    userId: "u3",
    role: "designer",
    name: "Ana López",
    email: "ana@example.com",
    position: "UI/UX Designer",
    birthdate: "1998-11-05",
    phone: "+51 999 555 666",
    projectId: "p2",
    isActive: false,
  },
  {
    userId: "u4",
    role: "devops",
    name: "Carlos Ruiz",
    email: "carlos@example.com",
    position: "DevOps Engineer",
    birthdate: "1990-01-18",
    phone: "+51 999 777 888",
    projectId: "p3",
    isActive: true,
  },
  {
    userId: "u5",
    role: "manager",
    name: "Laura Martínez",
    email: "laura@example.com",
    position: "Project Manager",
    birthdate: "1988-09-30",
    phone: "+51 999 999 000",
    projectId: "p1",
    isActive: true,
  },
];

const initialTasks: Task[] = [
  {
    id: "t1",
    description: "Implementar autenticación",
    projectId: "p1",
    status: "En progreso",
    priority: "Alta",
    userId: "u1",
    deadline: "2026-06-15",
  },
  {
    id: "t2",
    description: "Diseñar pantalla de perfil",
    projectId: "p2",
    status: "Pendiente",
    priority: "Media",
    userId: "u3",
    deadline: "2026-06-20",
  },
  {
    id: "t3",
    description: "Configurar CI/CD",
    projectId: "p3",
    status: "Completado",
    priority: "Alta",
    userId: "u4",
    deadline: "2026-05-10",
  },
];

type LabStoreValue = {
  projects: Project[];
  members: TeamMember[];
  tasks: Task[];
  settings: AppSettings;
  addProject: (data: Omit<Project, "id">) => Promise<void>;
  deleteProject: (id: string) => void;
  addMember: (data: Omit<TeamMember, "userId"> & { userId?: string }) => void;
  updateMember: (userId: string, data: Partial<TeamMember>) => void;
  deleteMember: (userId: string) => void;
  addTask: (data: Omit<Task, "id">) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  updateSettings: (data: Partial<AppSettings>) => void;
  getMemberName: (userId: string) => string;
  getProjectTitle: (projectId: string) => string;
};

const LabStoreContext = createContext<LabStoreValue | null>(null);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function LabStoreProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [settings, setSettings] = useState<AppSettings>({
    companyName: "Arévalo Tech",
    notifications: true,
    darkMode: false,
    language: "es",
    weeklyReport: true,
  });

  const addProject = useCallback(async (data: Omit<Project, "id">) => {
    await delay(1200);
    setProjects((prev) => [
      ...prev,
      { ...data, id: `p${Date.now()}` },
    ]);
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setTasks((prev) => prev.filter((t) => t.projectId !== id));
    setMembers((prev) =>
      prev.map((m) => (m.projectId === id ? { ...m, projectId: "" } : m)),
    );
  }, []);

  const addMember = useCallback(
    (data: Omit<TeamMember, "userId"> & { userId?: string }) => {
      const userId = data.userId ?? `u${Date.now()}`;
      setMembers((prev) => [...prev, { ...data, userId }]);
    },
    [],
  );

  const updateMember = useCallback((userId: string, data: Partial<TeamMember>) => {
    setMembers((prev) =>
      prev.map((m) => (m.userId === userId ? { ...m, ...data } : m)),
    );
  }, []);

  const deleteMember = useCallback((userId: string) => {
    setMembers((prev) => prev.filter((m) => m.userId !== userId));
    setProjects((prev) =>
      prev.map((p) => ({
        ...p,
        teamMemberIds: p.teamMemberIds.filter((id) => id !== userId),
      })),
    );
    setTasks((prev) => prev.filter((t) => t.userId !== userId));
  }, []);

  const addTask = useCallback((data: Omit<Task, "id">) => {
    setTasks((prev) => [...prev, { ...data, id: `t${Date.now()}` }]);
  }, []);

  const updateTask = useCallback((id: string, data: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateSettings = useCallback((data: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...data }));
  }, []);

  const getMemberName = useCallback(
    (userId: string) => members.find((m) => m.userId === userId)?.name ?? "—",
    [members],
  );

  const getProjectTitle = useCallback(
    (projectId: string) =>
      projects.find((p) => p.id === projectId)?.title ?? "Sin proyecto",
    [projects],
  );

  const value = useMemo(
    () => ({
      projects,
      members,
      tasks,
      settings,
      addProject,
      deleteProject,
      addMember,
      updateMember,
      deleteMember,
      addTask,
      updateTask,
      deleteTask,
      updateSettings,
      getMemberName,
      getProjectTitle,
    }),
    [
      projects,
      members,
      tasks,
      settings,
      addProject,
      deleteProject,
      addMember,
      updateMember,
      deleteMember,
      addTask,
      updateTask,
      deleteTask,
      updateSettings,
      getMemberName,
      getProjectTitle,
    ],
  );

  return (
    <LabStoreContext.Provider value={value}>{children}</LabStoreContext.Provider>
  );
}

export function useLabStore() {
  const ctx = useContext(LabStoreContext);
  if (!ctx) {
    throw new Error("useLabStore debe usarse dentro de LabStoreProvider");
  }
  return ctx;
}
