"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useLabStore } from "@/lib/lab-store";
import type { Task } from "@/lib/lab-types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PAGE_SIZE = 3;

const statusVariant = (status: string) => {
  switch (status) {
    case "Completado":
      return "default";
    case "En progreso":
      return "secondary";
    default:
      return "outline";
  }
};

const priorityVariant = (priority: string) => {
  switch (priority) {
    case "Urgente":
      return "destructive";
    case "Alta":
      return "default";
    case "Media":
      return "secondary";
    default:
      return "outline";
  }
};

const emptyTask: Omit<Task, "id"> = {
  description: "",
  projectId: "",
  status: "Pendiente",
  priority: "Media",
  userId: "",
  deadline: "",
};

export function TasksTable() {
  const {
    tasks,
    projects,
    members,
    addTask,
    updateTask,
    deleteTask,
    getMemberName,
    getProjectTitle,
  } = useLabStore();
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyTask);
  const [error, setError] = useState("");

  const totalPages = Math.max(1, Math.ceil(tasks.length / PAGE_SIZE));
  const pageTasks = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return tasks.slice(start, start + PAGE_SIZE);
  }, [tasks, page]);

  const openCreate = () => {
    setEditingId(null);
    setForm({
      ...emptyTask,
      projectId: projects[0]?.id ?? "",
      userId: members[0]?.userId ?? "",
    });
    setError("");
    setDialogOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditingId(task.id);
    setForm({
      description: task.description,
      projectId: task.projectId,
      status: task.status,
      priority: task.priority,
      userId: task.userId,
      deadline: task.deadline,
    });
    setError("");
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.description.trim() || !form.projectId || !form.userId || !form.deadline) {
      setError("Completa descripción, proyecto, responsable y fecha límite.");
      return;
    }
    if (editingId) {
      updateTask(editingId, form);
    } else {
      addTask(form);
    }
    setDialogOpen(false);
    setPage(1);
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button onClick={openCreate}>Nueva tarea</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableCaption>Lista de tareas con paginación (TAREA del lab)</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>Tarea</TableHead>
              <TableHead>Proyecto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Asignado a</TableHead>
              <TableHead>Fecha límite</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">{task.description}</TableCell>
                <TableCell>{getProjectTitle(task.projectId)}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(task.status)}>{task.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={priorityVariant(task.priority)}>
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>{getMemberName(task.userId)}</TableCell>
                <TableCell>
                  {format(new Date(task.deadline), "dd MMM yyyy", { locale: es })}
                </TableCell>
                <TableCell className="space-x-1 text-right">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(task)}>
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => deleteTask(task.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.max(1, p - 1));
              }}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <PaginationItem key={n}>
              <PaginationLink
                href="#"
                isActive={n === page}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(n);
                }}
              >
                {n}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage((p) => Math.min(totalPages, p + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Editar tarea" : "Nueva tarea"}
            </DialogTitle>
          </DialogHeader>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-3 py-2">
            <div className="grid gap-2">
              <Label>Descripción</Label>
              <Input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Proyecto</Label>
              <Select
                value={form.projectId}
                onValueChange={(v) => setForm({ ...form, projectId: v ?? "" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Proyecto" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label>Estado</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) =>
                    setForm({
                      ...form,
                      status: (v ?? "Pendiente") as Task["status"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En progreso">En progreso</SelectItem>
                    <SelectItem value="Completado">Completado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Prioridad</Label>
                <Select
                  value={form.priority}
                  onValueChange={(v) =>
                    setForm({
                      ...form,
                      priority: (v ?? "Media") as Task["priority"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Baja">Baja</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Responsable</Label>
              <Select
                value={form.userId}
                onValueChange={(v) => setForm({ ...form, userId: v ?? "" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {members.map((m) => (
                    <SelectItem key={m.userId} value={m.userId}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Fecha límite</Label>
              <Input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
