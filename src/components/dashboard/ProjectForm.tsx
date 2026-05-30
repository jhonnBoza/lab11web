"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useLabStore } from "@/lib/lab-store";
import type { Project } from "@/lib/lab-types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

const emptyForm = {
  name: "",
  description: "",
  category: "",
  priority: "",
  teamMemberIds: [] as string[],
};

export function ProjectForm() {
  const { addProject, members } = useLabStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(emptyForm);

  const toggleMember = (userId: string) => {
    setFormData((prev) => ({
      ...prev,
      teamMemberIds: prev.teamMemberIds.includes(userId)
        ? prev.teamMemberIds.filter((id) => id !== userId)
        : [...prev.teamMemberIds, userId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.category || !formData.priority) {
      setError("Completa los campos obligatorios: nombre, categoría y prioridad.");
      return;
    }

    if (formData.teamMemberIds.length === 0) {
      setError("Selecciona al menos un miembro del equipo.");
      return;
    }

    setLoading(true);
    try {
      const statusMap: Record<string, Project["status"]> = {
        low: "Planificado",
        medium: "En progreso",
        high: "En progreso",
        urgent: "En revisión",
      };

      await addProject({
        title: formData.name.trim(),
        description: formData.description.trim() || "Sin descripción",
        status: statusMap[formData.priority] ?? "Planificado",
        progress: 0,
        teamMemberIds: formData.teamMemberIds,
        category: formData.category,
        priority: formData.priority,
      });
      setFormData(emptyForm);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Plus className="mr-2 h-4 w-4" />
        Nuevo Proyecto
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
            <DialogDescription>
              Completa la información del proyecto. Los datos se guardan en memoria.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Validación</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Nombre del Proyecto <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Mi Proyecto Increíble"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                placeholder="Breve descripción del proyecto..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>
                Categoría <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value ?? "" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Desarrollo Web</SelectItem>
                  <SelectItem value="mobile">Desarrollo Mobile</SelectItem>
                  <SelectItem value="design">Diseño</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>
                Prioridad <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData({ ...formData, priority: value ?? "" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>
                Miembros del equipo <span className="text-destructive">*</span>
              </Label>
              <div className="max-h-36 space-y-2 overflow-y-auto rounded-md border p-3">
                {members.map((member) => (
                  <label
                    key={member.userId}
                    className="flex cursor-pointer items-center gap-2 text-sm"
                  >
                    <Checkbox
                      checked={formData.teamMemberIds.includes(member.userId)}
                      onCheckedChange={() => toggleMember(member.userId)}
                    />
                    <span>
                      {member.name} — {member.position}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner className="mr-2" />
                  Guardando...
                </>
              ) : (
                "Crear Proyecto"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
