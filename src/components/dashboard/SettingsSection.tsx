"use client";

import { useState } from "react";
import { useLabStore } from "@/lib/lab-store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";

export function SettingsSection() {
  const { settings, updateSettings } = useLabStore();
  const [local, setLocal] = useState(settings);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);
    await new Promise((r) => setTimeout(r, 1000));
    updateSettings(local);
    setLoading(false);
    setSaved(true);
  };

  return (
    <div className="max-w-xl space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="company">Nombre de la empresa</Label>
        <Input
          id="company"
          value={local.companyName}
          onChange={(e) =>
            setLocal({ ...local, companyName: e.target.value })
          }
        />
      </div>
      <div className="grid gap-2">
        <Label>Idioma</Label>
        <Select
          value={local.language}
          onValueChange={(v) => setLocal({ ...local, language: v ?? "es" })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <p className="font-medium">Notificaciones por email</p>
          <p className="text-sm text-muted-foreground">
            Recibir alertas de tareas y proyectos
          </p>
        </div>
        <Switch
          checked={local.notifications}
          onCheckedChange={(v) => setLocal({ ...local, notifications: v })}
        />
      </div>
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <p className="font-medium">Reporte semanal</p>
          <p className="text-sm text-muted-foreground">
            Resumen automático cada lunes
          </p>
        </div>
        <Switch
          checked={local.weeklyReport}
          onCheckedChange={(v) => setLocal({ ...local, weeklyReport: v })}
        />
      </div>
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <p className="font-medium">Modo oscuro (simulado)</p>
          <p className="text-sm text-muted-foreground">
            Preferencia guardada en memoria
          </p>
        </div>
        <Switch
          checked={local.darkMode}
          onCheckedChange={(v) => setLocal({ ...local, darkMode: v })}
        />
      </div>
      {saved && (
        <Alert>
          <AlertTitle>Configuración guardada</AlertTitle>
          <AlertDescription>
            Los cambios se aplicaron en memoria para esta sesión del laboratorio.
          </AlertDescription>
        </Alert>
      )}
      <Button onClick={handleSave} disabled={loading}>
        {loading ? (
          <>
            <Spinner className="mr-2" />
            Guardando...
          </>
        ) : (
          "Guardar configuración"
        )}
      </Button>
    </div>
  );
}
