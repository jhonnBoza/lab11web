"use client";

import Link from "next/link";
import { useState } from "react";
import Card from "@/components/cards/Card";
import Badge from "@/components/styling-ui/Badge";
import Button from "@/components/styling-ui/Button";
import Input from "@/components/styling-ui/Input";

export default function StylingPage() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleButtonClick = () => {
    setButtonLoading(true);
    setTimeout(() => {
      setButtonLoading(false);
      alert("¡Acción completada!");
    }, 2000);
  };

  const validateEmail = (value: string) => {
    setEmail(value);
    setEmailError(value && !value.includes("@") ? "Email inválido" : "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailError && name && email) {
      alert(`Formulario enviado:\nNombre: ${name}\nEmail: ${email}`);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-sm text-neutral-500 hover:text-neutral-900"
          >
            ← Inicio
          </Link>
          <span className="text-sm font-medium text-neutral-800">
            Ejercicio 1
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-8 px-4 py-10">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">
            Componentes reutilizables
          </h1>
          <p className="mt-1 text-neutral-600">
            CSS Modules + Tailwind CSS
          </p>
        </div>

        <Card title="Botones" subtitle="CSS Modules">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="sm">
                Small Primary
              </Button>
              <Button variant="secondary" size="md">
                Medium Secondary
              </Button>
              <Button variant="outline" size="lg">
                Large Outline
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                loading={buttonLoading}
                onClick={handleButtonClick}
              >
                {buttonLoading ? "Cargando" : "Click para cargar"}
              </Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Badges" subtitle="Tailwind">
          <div className="flex flex-wrap gap-2">
            <Badge variant="success">Success</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </div>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2">
          <Card title="Card simple" hover>
            <p className="text-sm text-neutral-600">
              Estilos con utilidades Tailwind.
            </p>
          </Card>
          <Card
            title="Card con imagen"
            image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400"
            hover
          >
            <p className="text-sm text-neutral-600">Hover en la tarjeta.</p>
          </Card>
        </div>

        <Card title="Formulario" subtitle="CSS Modules + Tailwind">
          <form onSubmit={handleSubmit} className="space-y-1">
            <Input
              label="Nombre completo"
              value={name}
              onChange={setName}
              required
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={validateEmail}
              error={emailError}
              required
            />
            <div className="pt-2">
              <Button type="submit" variant="primary" fullWidth>
                Enviar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
