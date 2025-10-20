# Etapa base
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto de Vite
EXPOSE 5173

# Comando para desarrollo (Vite)
CMD ["npm", "run", "dev", "--", "--host"]