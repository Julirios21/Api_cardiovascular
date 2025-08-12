// backend/controllers/importController.js
import csv from 'csv-parser';
import fs from 'fs';
import pool from '../config/db.js'; // Asegúrate de que la ruta sea correcta
import bcrypt from 'bcrypt';
import md5 from 'md5'; // Si vas a generar gravatar para nuevos usuarios

// Función para procesar y guardar el CSV
export const importUsersFromCsv = async (req, res) => {
  // Asegúrate de que el archivo se haya subido
  if (!req.file) {
    return res.status(400).json({ message: 'No se ha proporcionado ningún archivo CSV.' });
  }

  const results = [];
  const filePath = req.file.path;

  try {
    // Leer y parsear el archivo CSV
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        // Eliminar el archivo temporal después de procesarlo
        fs.unlinkSync(filePath);

        if (results.length === 0) {
          return res.status(400).json({ message: 'El archivo CSV está vacío o no contiene datos válidos.' });
        }

        let importedCount = 0;
        let errors = [];

        for (const row of results) {
          // Asumiendo que las columnas en tu CSV son: name, email, password, cedula
          // Ajusta estos nombres según los encabezados reales de tu CSV
          const { name, email, password, cedula } = row;

          // Validación básica de datos (ajusta según tus necesidades)
          if (!name || !email || !password || !cedula) {
            errors.push(`Fila con datos incompletos omitida: ${JSON.stringify(row)}`);
            continue;
          }

          try {
            const hashed_Password = await bcrypt.hash(password, 10);
            const gravatar = `https://www.gravatar.com/avatar/${md5(email)}`;

            // Insertar usuario en la tabla 'usuarios'
            // Asegúrate de que las columnas coincidan con tu tabla 'usuarios'
            await pool.query(
              'INSERT INTO usuarios(name, email, password, gravatar, cedula) VALUES($1, $2, $3, $4, $5)',
              [name, email, hashed_Password, gravatar, cedula]
            );
            importedCount++;
          } catch (dbError) {
            if (dbError.code === '23505') { // Código de error para clave única duplicada (ej. email)
              errors.push(`Error al insertar usuario ${email}: Ya existe un usuario con este correo.`);
            } else {
              errors.push(`Error desconocido al insertar usuario ${email}: ${dbError.message}`);
            }
          }
        }

        if (importedCount > 0) {
          res.status(200).json({
            message: `${importedCount} usuarios importados exitosamente.`,
            errors: errors.length > 0 ? errors : undefined,
          });
        } else {
          res.status(400).json({
            message: 'No se pudo importar ningún usuario. Revise los errores.',
            errors: errors,
          });
        }
      });
  } catch (error) {
    console.error('Error al procesar el archivo CSV:', error);
    // Asegúrate de eliminar el archivo temporal en caso de error también
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return res.status(500).json({ message: 'Error interno del servidor al procesar el archivo CSV.' });
  }
};