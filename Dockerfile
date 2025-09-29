FROM postgres:17

# Copia el contenido de la carpeta initdb (tu schema.sql) al directorio de inicialización de Postgres
COPY ./initdb_cardio /docker-entrypoint-initdb.d
