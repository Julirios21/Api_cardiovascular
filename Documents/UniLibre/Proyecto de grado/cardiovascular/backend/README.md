# 🫀 Sistema de Control a Problemas Cardiovasculares

Este es un proyecto de grado desarrollado con **Node.js y Express** para el backend y **React + Bootstrap** para el frontend.

El sistema tiene como objetivo principal recolectar, registrar y consultar información socioclínica de pacientes. Los datos recopilados apoyarán procesos diagnósticos, investigaciones médicas y evaluaciones institucionales.

---

## 🚀 Tecnologías utilizadas

### Backend (Node.js + Express)

- **Node.js**: Entorno de ejecución de JavaScript.
- **Express**: Framework web ligero y flexible para Node.js.
- **PostgreSQL**: ORM (Object-Relational Mapper) para Node.js, facilitando la interacción con PostgreSQL.
- **CORS**: Middleware para habilitar solicitudes de recursos de origen cruzado.
- **Nodemon**: Herramienta para reiniciar automáticamente el servidor durante el desarrollo.
- **dotenv**: Para cargar variables de entorno desde un archivo .env.

### Frontend (React + Bootstrap)

- **React**: Biblioteca de JavaScript para construir interfaces de usuario interactivas.
- **Vite**: Herramienta de construcción rápida para proyectos frontend, optimizada para desarrollo.
- **Bootstrap**: Framework CSS popular para un diseño web responsivo y estético.
- **React Router DOM**: Para gestionar la navegación y las rutas en la aplicación de React.
- **Axios**: Cliente HTTP basado en promesas para realizar peticiones al backend.
- **React Icons**: Biblioteca que proporciona una amplia variedad de iconos.

---

## 📂 Estructura del proyecto

```
Api_cardiovascular/
├── backend/            ← Lógica del servidor (Node.js y Express)
│   ├── database/       ← conexión a DB
│   ├── node_modules/   ← Dependencias de Node.js
│   ├── src/            ← Código Fuente(Carpetas: Controllers-libs-middlewares-routes-schemas)
│   ├── .env            ← Variables de entorno para el backend
│   ├── .gitignore      
│   └── package-lock.json 
│   └── package.json    ← Dependencias de Node.js del backend
│   └── frontend/           ← Cliente en React
│   ├── src/            ← Código fuente de React
│   ├── public/         ← Archivos estáticos
│   ├── index.html
│   └── package.json    ← Dependencias de Node.js del frontend
│   └── README.md
│
└── README.md
```

---

## ⚙️ Cómo iniciar el proyecto

### 1. Clona el repositorio

```bash
git clone https://github.com/tuusuario/cardio-system.git
cd cardio-system
```

---

## 🐍 Backend (Node.js + Express + PostgreSQL)

### 🔹 Requisitos
- Node.js v16+ (o la versión que estés utilizando).
- npm v8+ (o la versión que estés utilizando).
- Una instancia de PostgreSQL en ejecución. Puedes usar Docker para una configuración rápida.

### 🔹 Configura el entorno virtual

```bash
cd backend
npm install
npm start
```


### 🔹 Ejecutar servidor

```bash
npm run dev # Para desarrollo con Nodemon
# o
# npm start # Para producción
```

- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## ⚛️ Frontend (React + Boostrap)

### 🔹 Requisitos
- Node.js v20+
- npm v10+

### 🔹 Instalar dependencias

```bash
cd frontend
npm install
```

### 🔹 Ejecutar servidor

```bash
npm run dev
```

- Vista web: [http://localhost:5173](http://localhost:5173)

---

## 🔐 Autenticación

- **Usuarios institucionales**: login con correo institucional (previsto: OAuth2 via Outlook)
- **Usuarios externos (móviles)**: autenticación con cédula y correo, token JWT

---

## 🧪 Funcionalidades previstas

- [x] Inicio de sesión y registro
- [ ] Formulario de tamizaje con datos personales
- [ ] Visualización y edición de usuarios registrados
- [ ] Exportación de datos
- [ ] Notificaciones por correo
- [ ] Análisis clínico (futuros)

---

## 👥 Autores

- Juan Camilo Ausecha Gutiérrez
- Universidad Libre - Facultad de Ingeniería
- Proyecto de grado 2025

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia MIT.
