# Informe — Laboratorio 11 (GLAB S11)

**Curso:** Desarrollo de Aplicaciones Web Avanzado — Componentes y Estilización  
**Estudiante:** Edwin William Arévalo Sermeño  
**Repositorio:** https://github.com/jhonnBoza/lab11web

---

## 1. Configuración del proyecto

Se creó una aplicación **Next.js** (App Router, TypeScript, Tailwind CSS, Turbopack) en un solo repositorio. Desde la página de inicio (`/`) se accede a cada parte del laboratorio.

| Ruta | Contenido |
|------|-----------|
| `/` | Menú del laboratorio |
| `/styling` | Ejercicio 1 |
| `/dashboard` | Ejercicio 2 y TAREA |

```bash
npm install
npm run dev
```

---

## 2. Ejercicio 1 — CSS Modules + Tailwind CSS

**Componentes:** `Button`, `Badge`, `Input` (con `.module.css`), `Card` (solo Tailwind).

**Resultado de la combinación:** CSS Modules se usó para efectos complejos (onda al clic, gradientes, spinner, label flotante, animación de error). Tailwind se usó para layout, tamaños, colores y espaciado. Ambos se aplican en el mismo `className`, complementándose sin reemplazarse.

**Captura:** `http://localhost:3000/styling`

---

## 3. Ejercicio 2 — Dashboard con shadcn/ui

Se instaló **shadcn/ui** y componentes: button, card, input, label, dialog, tabs, select, badge, avatar, table, checkbox, form, switch, alert, calendar, pagination, spinner.

**Páginas y componentes:**

- `app/dashboard/page.tsx` — contenedor del dashboard
- `components/dashboard/ProjectForm.tsx` — alta de proyectos
- `components/dashboard/TasksTable.tsx` — tabla de tareas
- `components/dashboard/DashboardView.tsx` — tabs y secciones

**Captura:** `http://localhost:3000/dashboard`

---

## 4. TAREA — Lógica de negocio

Estado en memoria en `src/lib/lab-store.tsx` (proyectos, equipo, tareas, configuración).

| Requisito | Implementación |
|-----------|----------------|
| Spinner | Crear proyecto y guardar configuración |
| Alert | Validación en formularios |
| Calendar | Fecha de nacimiento (Equipo) |
| Pagination | Listado de tareas (3 por página) |
| Proyectos | Miembros, crear, ver detalles, eliminar |
| Equipo | CRUD con todos los campos del enunciado |
| Tareas | CRUD + paginación |
| Configuración | Formulario simulado |
| Resumen | Métricas desde datos en memoria |

---

## 5. Estructura del código

```
src/
  app/
    page.tsx, styling/, dashboard/
  components/
    styling-ui/    # Ejercicio 1
    cards/
    dashboard/     # Ejercicio 2 + TAREA
    ui/            # shadcn/ui
  lib/
    lab-store.tsx, lab-types.ts
```

---

## 6. Despliegue (opcional)

```bash
npx vercel
```

Enlace de producción: _(completar tras desplegar en Vercel)_

---

## 7. Conclusiones (borrador)

1. CSS Modules y Tailwind permiten separar efectos avanzados y maquetado rápido en el mismo componente.  
2. shadcn/ui facilita interfaces accesibles sin depender de una librería cerrada.  
3. Un store en React es suficiente para simular CRUD del dashboard en el laboratorio.  
4. La unión de ejercicios en un solo proyecto simplifica la entrega y las capturas.  
5. Los componentes Spinner, Alert, Calendar y Pagination cubren validación, fechas y listados paginados.
