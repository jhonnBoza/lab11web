# Informe de laboratorio — GLAB S11

**Curso:** Desarrollo de Aplicaciones Web Avanzado — Componentes y Estilización  
**Estudiante:** Edwin William Arévalo Sermeño  
**Repositorio:** https://github.com/jhonnBoza/lab11web

---

## Introducción

En este laboratorio desarrollé una aplicación web con Next.js donde reuní el Ejercicio 1, el Ejercicio 2 y la TAREA en un solo proyecto. Primero armé una página de inicio para entrar a cada parte del lab sin cambiar de repositorio, y luego fui completando cada requerimiento del documento, probando en el navegador que todo funcionara antes de seguir con el siguiente punto.

---

## Lo que hice en el Ejercicio 1

Seguí la guía y creé los componentes reutilizables que pedía el laboratorio. En el **Button** e **Input** escribí archivos `.module.css` para lograr la onda al hacer clic, los gradientes, el spinner de carga y el label flotante; en el mismo componente añadí clases de **Tailwind** para tamaños, márgenes y el ancho completo. El **Badge** y el **Card** los hice solo con Tailwind porque eran más simples.

Monté la página `/styling` para probar todo junto: probé las variantes de botones, el estado de carga, los badges, las tarjetas con y sin imagen, y un formulario con validación de email. Cuando el correo no lleva `@`, el input muestra el error con la animación que definí en CSS Modules. Ahí entendí mejor la combinación: lo difícil lo resolví con módulos y lo repetitivo con utilidades.

**Captura:** pantalla de `http://localhost:3000/styling`

**Descripción breve (Ejercicio 1):** Combiné CSS Modules y Tailwind en los mismos componentes; los módulos me sirvieron para animaciones y efectos visuales, y Tailwind para maquetar rápido sin escribir tanto CSS suelto.

---

## Lo que hice en el Ejercicio 2

Instalé **shadcn/ui** en el proyecto con `npx shadcn@latest init` y fui agregando los componentes que indicaba el lab: tabs, dialog, card, table, select, entre otros. Construí el **dashboard** en `/dashboard` con pestañas de Resumen, Proyectos, Equipo y Configuración, más la sección de Tareas que se agregó después.

Programé el **ProjectForm** dentro de un diálogo para crear proyectos, y la **TasksTable** para listar tareas con sus estados y prioridades. Revisé que el menú cambiara de sección correctamente y que los componentes de shadcn se vieran coherentes en toda la página.

**Captura:** pantalla de `http://localhost:3000/dashboard`

---

## Lo que hice en la TAREA

La TAREA pedía darle lógica real al dashboard, así que implementé un **estado en memoria** (`lab-store`) para no depender de un backend: ahí guardo proyectos, miembros, tareas y configuración mientras uso la app.

**Componentes nuevos de shadcn que incorporé:**

- **Spinner:** lo puse al crear un proyecto y al guardar configuración, con una espera simulada para parecer una petición al servidor.
- **Alert:** lo usé cuando falta llenar campos o hay errores en los formularios.
- **Calendar:** lo usé en el CRUD de **Equipo** para elegir la fecha de nacimiento.
- **Pagination:** lo usé en **Tareas** para mostrar tres registros por página.

**Por menú, esto fue lo que desarrollé:**

- **Proyectos:** agregué la selección de miembros del equipo, completé el guardado del proyecto, el botón **Ver detalles** (abre un diálogo con la info) y **Eliminar**.
- **Equipo:** hice crear, editar y eliminar miembros con los campos del enunciado (`userId`, `role`, `name`, `email`, `position`, `birthdate`, `phone`, `projectId`, `isActive`).
- **Tareas:** hice el CRUD completo con `description`, `projectId`, `status`, `priority`, `userId` y `deadline`, más la paginación.
- **Configuración:** armé un formulario con nombre de empresa, idioma, notificaciones y otras opciones; al guardar muestra el Spinner y un mensaje de éxito.
- **Resumen:** las tarjetas de totales y la actividad reciente se actualizan solas cuando agrego o borro datos en las otras pestañas.

Probé cada flujo manualmente: crear un proyecto, editar un miembro, pasar de página en tareas y ver cómo cambiaban los números en Resumen.

---

## Dificultades y cómo las resolví

En un punto tuve un error de hidratación porque el **DialogTrigger** y el **Button** generaban un botón dentro de otro; lo corregí usando la prop `render` de base-ui, como en los ejemplos de shadcn del proyecto. También unifiqué los ejercicios en un solo repo para no tener dos carpetas separadas, y moví los componentes del Ejercicio 1 a `styling-ui` para que no choquen con los de shadcn en `components/ui`.

---

## Entregables

| Entregable | Enlace / ubicación |
|------------|-------------------|
| Repositorio GitHub | https://github.com/jhonnBoza/lab11web |
| Aplicación local | `npm run dev` → http://localhost:3000 |
| Despliegue Vercel | _(completar cuando despliegue)_ |

---

## Conclusiones

1. Aprendí a mezclar CSS Modules y Tailwind según la complejidad de cada estilo, no usar solo una herramienta para todo.  
2. shadcn/ui me permitió armar un dashboard presentable y accesible en poco tiempo.  
3. Simular el backend con un store en React fue suficiente para cumplir el CRUD de la TAREA.  
4. Centralizar el lab en una sola app facilitó las pruebas y las capturas para el informe.  
5. Los componentes Spinner, Alert, Calendar y Pagination mejoran la experiencia al validar, elegir fechas y navegar listas largas.
