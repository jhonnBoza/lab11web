"use client";

import { useState } from "react";
import Link from "next/link";
import { useLabStore } from "@/lib/lab-store";
import type { Project } from "@/lib/lab-types";
import { ProjectForm } from "@/components/dashboard/ProjectForm";
import { SettingsSection } from "@/components/dashboard/SettingsSection";
import { TasksTable } from "@/components/dashboard/TasksTable";
import { TeamSection } from "@/components/dashboard/TeamSection";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DashboardView() {
  const { projects, tasks, members, deleteProject, getMemberName } = useLabStore();
  const [detailProject, setDetailProject] = useState<Project | null>(null);

  const completedTasks = tasks.filter((t) => t.status === "Completado").length;
  const activeMembers = members.filter((m) => m.isActive).length;
  const avgProgress =
    projects.length > 0
      ? Math.round(
          projects.reduce((acc, p) => acc + p.progress, 0) / projects.length,
        )
      : 0;

  const activities = [
    ...tasks.slice(0, 3).map((t) => ({
      user: getMemberName(t.userId),
      action: "actualizó tarea",
      task: t.description,
      time: "Reciente",
    })),
    ...projects.slice(0, 2).map((p) => ({
      user: "Sistema",
      action: "proyecto",
      task: p.title,
      time: p.status,
    })),
  ].slice(0, 4);

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-sm text-neutral-500 hover:text-neutral-900"
          >
            ← Inicio
          </Link>
          <span className="text-sm font-medium text-neutral-800">
            Ejercicio 2 · TAREA
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">
              Dashboard de Proyectos
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              shadcn/ui — datos en memoria
            </p>
          </div>
          <ProjectForm />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="tasks">Tareas</TabsTrigger>
            <TabsTrigger value="team">Equipo</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Proyectos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{projects.length}</div>
                  <p className="text-xs text-muted-foreground">En memoria</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Tareas Completadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedTasks}</div>
                  <p className="text-xs text-muted-foreground">
                    de {tasks.length} tareas
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Progreso Promedio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgProgress}%</div>
                  <p className="text-xs text-muted-foreground">
                    Todos los proyectos
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Miembros Activos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeMembers}</div>
                  <p className="text-xs text-muted-foreground">
                    de {members.length} registrados
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>
                  Generada desde proyectos y tareas en memoria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{activity.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.user}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.action}{" "}
                          <span className="font-medium">{activity.task}</span>
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          project.status === "Completado"
                            ? "default"
                            : project.status === "En revisión"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progreso</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {project.teamMemberIds.length} miembros · Prioridad:{" "}
                        {project.priority}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDetailProject(project)}
                        >
                          Ver detalles
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => deleteProject(project.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Tareas</CardTitle>
                <CardDescription>
                  CRUD con paginación (componente Pagination)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TasksTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Miembros del Equipo</CardTitle>
                <CardDescription>
                  CRUD completo con Calendar para fecha de nacimiento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TeamSection />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configuración</CardTitle>
                <CardDescription>
                  Formulario simulado con Spinner al guardar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SettingsSection />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog
          open={!!detailProject}
          onOpenChange={() => setDetailProject(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{detailProject?.title}</DialogTitle>
              <DialogDescription>{detailProject?.description}</DialogDescription>
            </DialogHeader>
            {detailProject && (
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Estado:</strong> {detailProject.status}
                </p>
                <p>
                  <strong>Categoría:</strong> {detailProject.category}
                </p>
                <p>
                  <strong>Prioridad:</strong> {detailProject.priority}
                </p>
                <p>
                  <strong>Progreso:</strong> {detailProject.progress}%
                </p>
                <p>
                  <strong>Equipo:</strong>{" "}
                  {detailProject.teamMemberIds
                    .map((id) => getMemberName(id))
                    .join(", ")}
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
