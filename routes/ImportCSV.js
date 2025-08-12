const express = require('express');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parser');
const pool = require('../config/db');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Carpeta temporal

// Ruta POST para importar CSV
router.post('/importar-csv', upload.single('archivo'), (req, res) => {
  const resultados = [];

  fs.createReadStream(req.file.path)
    .pipe(csv({ trim: true, skipEmptyLines: true }))
    .on('data', (data) => resultados.push(data))
    .on('end', async () => {
      try {
        for (const fila of resultados) {
          // Función para limpiar campos vacíos
          const limpiarCampo = (valor) => (valor === '' ? null : valor);

          // Asegúrate de que las columnas del CSV coincidan con las siguientes:
          const { email, cedula, password, tipo_usuario, fecha_valoracion, nombre_completo, fecha_nacimiento, edad, genero, ocupacion, nivel_educativo, telefono, direccion, eps } = fila;

          // Verificar duplicado
          const existente = await pool.query('SELECT id FROM usuario WHERE email = $1 OR cedula = $2', [email, cedula]);
          if (existente.rows.length > 0) continue; // saltar si ya existe

          // Insertar en usuario
          const userResult = await pool.query(
            'INSERT INTO usuario (email, cedula, password, tipo_usuario) VALUES ($1, $2, $3, $4) RETURNING id',
            [email, cedula, password, tipo_usuario]
          );
          const usuario_id = userResult.rows[0].id;

          // Preparar datos de paciente, limpiando campos vacíos
          const datosPaciente = [
            usuario_id,
            limpiarCampo(fecha_valoracion),
            limpiarCampo(nombre_completo),
            limpiarCampo(fecha_nacimiento),
            limpiarCampo(edad),
            limpiarCampo(genero),
            limpiarCampo(ocupacion),
            limpiarCampo(nivel_educativo),
            limpiarCampo(telefono),
            limpiarCampo(direccion),
            limpiarCampo(eps)
          ];

          // Insertar en pacientes
          await pool.query(
            `INSERT INTO pacientes (
              usuario_id, fecha_valoracion, nombre_completo, fecha_nacimiento, edad, genero, ocupacion, nivel_educativo, telefono, direccion, eps
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
            datosPaciente
          );

          // Insertar en mujeres si hay datos relevantes
          const { ovario_poliquistico, primera_menstruacion, diabetes_gestacional, hijos_bajo_peso, parto_pretermino, menopausia } = fila;
          if (
            ovario_poliquistico !== undefined ||
            primera_menstruacion !== undefined ||
            diabetes_gestacional !== undefined ||
            hijos_bajo_peso !== undefined ||
            parto_pretermino !== undefined ||
            menopausia !== undefined
          ) {
            const datosMujer = [
              usuario_id,
              limpiarCampo(ovario_poliquistico),
              limpiarCampo(primera_menstruacion),
              limpiarCampo(diabetes_gestacional),
              limpiarCampo(hijos_bajo_peso),
              limpiarCampo(parto_pretermino),
              limpiarCampo(menopausia)
            ];
            await pool.query(
              `INSERT INTO mujeres (
                usuario_id, ovario_poliquistico, primera_menstruacion, diabetes_gestacional, hijos_bajo_peso, parto_pretermino, menopausia
              ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
              datosMujer
            );
          }

          // Insertar en antecedentes_personales si hay datos relevantes
          const { infarto, fecha_infarto, angina, fecha_angina, acv, fecha_acv, eap, fecha_eap, insuficiencia_cardiaca, fecha_ic, arritmias, fecha_arritmias, revascularizacion, fecha_revascularizacion, fecha_dispositivos_cardiacos } = fila;
          if (
            infarto !== undefined || fecha_infarto !== undefined ||
            angina !== undefined || fecha_angina !== undefined ||
            acv !== undefined || fecha_acv !== undefined ||
            eap !== undefined || fecha_eap !== undefined ||
            insuficiencia_cardiaca !== undefined || fecha_ic !== undefined ||
            arritmias !== undefined || fecha_arritmias !== undefined ||
            revascularizacion !== undefined || fecha_revascularizacion !== undefined ||
            fecha_dispositivos_cardiacos !== undefined
          ) {
            const datosAntecedentes = [
              usuario_id,
              limpiarCampo(infarto),
              limpiarCampo(fecha_infarto),
              limpiarCampo(angina),
              limpiarCampo(fecha_angina),
              limpiarCampo(acv),
              limpiarCampo(fecha_acv),
              limpiarCampo(eap),
              limpiarCampo(fecha_eap),
              limpiarCampo(insuficiencia_cardiaca),
              limpiarCampo(fecha_ic),
              limpiarCampo(arritmias),
              limpiarCampo(fecha_arritmias),
              limpiarCampo(revascularizacion),
              limpiarCampo(fecha_revascularizacion),
              limpiarCampo(fecha_dispositivos_cardiacos)
            ];
            await pool.query(
              `INSERT INTO antecedentes_personales (
                usuario_id, infarto, fecha_infarto, angina, fecha_angina, acv, fecha_acv, eap, fecha_eap, insuficiencia_cardiaca, fecha_ic, arritmias, fecha_arritmias, revascularizacion, fecha_revascularizacion, fecha_dispositivos_cardiacos
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
              datosAntecedentes
            );
          }


          // Insertar en factores_riesgo si hay datos relevantes
          const { hta, hta_desde, hta_tratamiento, diabetes, dm_desde, dm_tratamiento, dislipidemia, dislipidemia_desde, dislipidemia_tratamiento, enfermedad_renal, erc_estadio, erc_tratamiento, tabaquismo, anos_tabaquismo, alcoholismo, cantidad_frecuencia, sedentarismo, tipo_actividad, apnea_sueno, frecuencia_fuma, vapeo, anos_vapeo, frecuencia_vapeo, dias_ejercicio, minuto_ejercicio, patologias, programas_paxientes, medicamentos } = fila;
          if (
            hta !== undefined || hta_desde !== undefined || hta_tratamiento !== undefined ||
            diabetes !== undefined || dm_desde !== undefined || dm_tratamiento !== undefined ||
            dislipidemia !== undefined || dislipidemia_desde !== undefined || dislipidemia_tratamiento !== undefined ||
            enfermedad_renal !== undefined || erc_estadio !== undefined || erc_tratamiento !== undefined ||
            tabaquismo !== undefined || anos_tabaquismo !== undefined ||
            alcoholismo !== undefined || cantidad_frecuencia !== undefined ||
            sedentarismo !== undefined || tipo_actividad !== undefined ||
            apnea_sueno !== undefined || frecuencia_fuma !== undefined || vapeo !== undefined || anos_vapeo !== undefined || frecuencia_vapeo !== undefined ||
            dias_ejercicio !== undefined || minuto_ejercicio !== undefined ||
            patologias !== undefined || programas_paxientes !== undefined || medicamentos !== undefined
          ) {
            const datosFactores = [
              usuario_id,
              limpiarCampo(hta),
              limpiarCampo(hta_desde),
              limpiarCampo(hta_tratamiento),
              limpiarCampo(diabetes),
              limpiarCampo(dm_desde),
              limpiarCampo(dm_tratamiento),
              limpiarCampo(dislipidemia),
              limpiarCampo(dislipidemia_desde),
              limpiarCampo(dislipidemia_tratamiento),
              limpiarCampo(enfermedad_renal),
              limpiarCampo(erc_estadio),
              limpiarCampo(erc_tratamiento),
              limpiarCampo(tabaquismo),
              limpiarCampo(anos_tabaquismo),
              limpiarCampo(alcoholismo),
              limpiarCampo(cantidad_frecuencia),
              limpiarCampo(sedentarismo),
              limpiarCampo(tipo_actividad),
              limpiarCampo(apnea_sueno),
              limpiarCampo(frecuencia_fuma),
              limpiarCampo(vapeo),
              limpiarCampo(anos_vapeo),
              limpiarCampo(frecuencia_vapeo),
              limpiarCampo(dias_ejercicio),
              limpiarCampo(minuto_ejercicio),
              limpiarCampo(patologias),
              limpiarCampo(programas_paxientes),
              limpiarCampo(medicamentos)
            ];
            await pool.query(
              `INSERT INTO factores_riesgo (
                usuario_id, hta, hta_desde, hta_tratamiento,
                diabetes, dm_desde, dm_tratamiento,
                dislipidemia, dislipidemia_desde, dislipidemia_tratamiento,
                enfermedad_renal, erc_estadio, erc_tratamiento,
                tabaquismo, anos_tabaquismo, alcoholismo, cantidad_frecuencia,
                sedentarismo, tipo_actividad, apnea_sueno, frecuencia_fuma, vapeo, anos_vapeo, frecuencia_vapeo, dias_ejercicio, minuto_ejercicio, patologias, programas_paxientes, medicamentos
              ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29
              )`,
              datosFactores
            );
          }

             // Insertar en antecedentes_familiares si hay datos relevantes
             const { historial_familiar, integrante_familia } = fila;
             if (historial_familiar !== undefined || integrante_familia !== undefined) {
               const datosFamiliares = [
                 usuario_id,
                 limpiarCampo(historial_familiar),
                 limpiarCampo(integrante_familia)
               ];
               await pool.query(
                 `INSERT INTO antecedentes_familiares (
                   usuario_id, historial_familiar, integrante_familia
                 ) VALUES ($1, $2, $3)`,
                 datosFamiliares
               );
             }

             
        }

        res.json({ mensaje: 'Importación finalizada con éxito' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al importar el CSV' });
      }
    });
});

module.exports = router;