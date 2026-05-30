"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useLabStore } from "@/lib/lab-store";
import type { TeamMember } from "@/lib/lab-types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const emptyMember: Omit<TeamMember, "userId"> = {
  role: "developer",
  name: "",
  email: "",
  position: "",
  birthdate: "",
  phone: "",
  projectId: "",
  isActive: true,
};

export function TeamSection() {
  const { members, projects, addMember, updateMember, deleteMember } = useLabStore();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyMember);
  const [birthDate, setBirthDate] = useState<Date | undefined>();
  const [error, setError] = useState("");

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyMember, projectId: projects[0]?.id ?? "" });
    setBirthDate(undefined);
    setError("");
    setOpen(true);
  };

  const openEdit = (member: TeamMember) => {
    setEditingId(member.userId);
    setForm({
      role: member.role,
      name: member.name,
      email: member.email,
      position: member.position,
      birthdate: member.birthdate,
      phone: member.phone,
      projectId: member.projectId,
      isActive: member.isActive,
    });
    setBirthDate(member.birthdate ? new Date(member.birthdate) : undefined);
    setError("");
    setOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim() || !form.position.trim()) {
      setError("Nombre, email y cargo son obligatorios.");
      return;
    }
    const birthdate = birthDate
      ? format(birthDate, "yyyy-MM-dd")
      : form.birthdate;

    if (editingId) {
      updateMember(editingId, { ...form, birthdate });
    } else {
      addMember({ ...form, birthdate });
    }
    setOpen(false);
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button onClick={openCreate}>Agregar miembro</Button>
      </div>
      <div className="space-y-4">
        {members.map((member) => (
          <div
            key={member.userId}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.position}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
                <p className="text-xs text-muted-foreground">
                  ID: {member.userId} · Rol: {member.role}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={member.isActive ? "default" : "secondary"}>
                {member.isActive ? "Activo" : "Inactivo"}
              </Badge>
              <Button size="sm" variant="outline" onClick={() => openEdit(member)}>
                Editar
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-destructive"
                onClick={() => deleteMember(member.userId)}
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Editar miembro" : "Nuevo miembro del equipo"}
            </DialogTitle>
          </DialogHeader>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Validación</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-3 py-2">
            <div className="grid gap-2">
              <Label>Nombre</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Teléfono</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Cargo</Label>
              <Input
                value={form.position}
                onChange={(e) =>
                  setForm({ ...form, position: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label>Rol</Label>
                <Select
                  value={form.role}
                  onValueChange={(v) => setForm({ ...form, role: v ?? "" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                  </SelectContent>
                </Select>
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
            </div>
            <div className="grid gap-2">
              <Label>Fecha de nacimiento</Label>
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !birthDate && "text-muted-foreground",
                      )}
                    />
                  }
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {birthDate
                    ? format(birthDate, "PPP", { locale: es })
                    : "Seleccionar fecha"}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={setBirthDate}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.isActive}
                onCheckedChange={(v) => setForm({ ...form, isActive: v })}
              />
              <Label>Miembro activo</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
