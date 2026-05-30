import Link from "next/link";

const modules = [
  {
    title: "Ejercicio 1",
    description: "CSS Modules + Tailwind — Button, Card, Badge, Input",
    href: "/styling",
  },
  {
    title: "Ejercicio 2",
    description: "Dashboard con shadcn/ui — tabs, formulario, tabla",
    href: "/dashboard",
  },
  {
    title: "TAREA",
    description: "CRUD, Spinner, Alert, Calendar, Pagination",
    href: "/dashboard",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-lg px-6 py-16">
        <div className="text-center">
          <p className="text-sm text-neutral-500">Laboratorio 11</p>
          <h1 className="mt-2 text-2xl font-semibold text-neutral-900">
            Componentes y Estilización
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Arévalo Sermeño, Edwin William
          </p>
        </div>

        <ul className="mt-12 space-y-3">
          {modules.map((mod) => (
            <li key={mod.title}>
              <Link
                href={mod.href}
                className="block rounded-lg border border-neutral-200 bg-white px-5 py-4 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
              >
                <p className="font-medium text-neutral-900">{mod.title}</p>
                <p className="mt-1 text-sm text-neutral-500">
                  {mod.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
