# 🫀 Sistema de Control a Problemas Cardiovasculares

Este es un proyecto de grado desarrollado con **Node.js y Express** para el backend y **React + Bootstrap** para el frontend.

El sistema tiene como objetivo principal recolectar, registrar y consultar información socioclínica de pacientes. Los datos recopilados apoyarán procesos diagnósticos, investigaciones médicas y evaluaciones institucionales.

---

## 🚀 Tecnologías utilizadas

### Backend (Node.js + Express)

- **`Node.js`** `18.x`  
Entorno de ejecución para JavaScript del lado del servidor.

- **`npm`** `11.3.0`  
  Administrador de paquetes oficial de **Node.js**, utilizado para instalar y gestionar dependencias del proyecto.

- **`Express`** `4.18.2`
Framework web minimalista y flexible para construir APIs y servidores en Node.js.

- **`PostgreSQL`** `16`
Motor de base de datos relacional robusto y de código abierto, utilizado para almacenar y gestionar datos estructurados.

- **`pg`** `8.11.3`
Cliente oficial de PostgreSQL para Node.js, utilizado para ejecutar consultas SQL desde el backend.

- **`csv-parser`** `3.2.0`
Módulo para leer archivos .csv y convertir sus filas en objetos JavaScript, útil para importar datos.

- **`multer`** `2.0.2`
Middleware de Express para manejar cargas de archivos (multipart/form-data), como archivos CSV.

- **`cors`** `2.8.5`
Middleware que habilita solicitudes de recursos de origen cruzado (CORS), útil para comunicación entre frontend y backend.

- **`dotenv`** `6.3.1`
Carga variables de entorno desde un archivo .env a process.env, para gestionar configuraciones sensibles.

- **`nodemon`** `3.0.2`
Herramienta de desarrollo que reinicia automáticamente el servidor cuando detecta cambios en el código fuente.

### Frontend (React + Bootstrap)

- **React**: Biblioteca de JavaScript para construir interfaces de usuario interactivas.
- **React-Native**
- **Vite**: Herramienta de construcción rápida para proyectos frontend, optimizada para desarrollo.
- **Bootstrap**: Framework CSS popular para un diseño web responsivo y estético.
- **React Router DOM**: Para gestionar la navegación y las rutas en la aplicación de React.
- **Axios**: Cliente HTTP basado en promesas para realizar peticiones al backend.
- **React Icons**: Biblioteca que proporciona una amplia variedad de iconos.

---

## 📂 Estructura del proyecto

```
Api_cardiovascular/     ← Lógica del servidor (Node.js y Express)
│   ├── database/       ← conexión a DB
│   ├── node_modules/   ← Dependencias de Node.js
│   ├── src/            ← Código Fuente(Carpetas: Controllers-libs-middlewares-routes-schemas)
│   ├── .env            ← Variables de entorno para el backend
│   ├── .gitignore      
│   └── package-lock.json 
│   └── package.json    ← Dependencias de Node.js del backend
│   └── README.md   
│
├── frontend/           ← Cliente en React
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
cd Api_cardiovascular
```

---

## 🐍 Backend (Node.js + Express + PostgreSQL)

### 🔹 Requisitos
- Node.js v16+ (o la versión que estés utilizando).
- npm v8+ (o la versión que estés utilizando).
- Una instancia de PostgreSQL en ejecución. Puedes usar *Podman* para una configuración rápida.


```bash
cd Api_cardiovascular
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
- Julian Rios
- Universidad Libre - Facultad de Ingeniería
- Proyecto de grado 2025

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia MIT.
