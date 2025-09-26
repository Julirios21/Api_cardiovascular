-- =========================================
-- Script de inicialización Base de Datos
-- =========================================

-- 1. Usuario
CREATE TABLE IF NOT EXISTS public.usuario (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    cedula VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL,
    tipo_usuario VARCHAR(10),
    CONSTRAINT usuario_tipo_usuario_check 
        CHECK (tipo_usuario IN ('interno', 'externo', 'admin'))
);

-- 2. Pacientes
CREATE TABLE IF NOT EXISTS public.pacientes (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    fecha_valoracion TIMESTAMP,
    nombre_completo VARCHAR(100),
    documento_identidad VARCHAR(20) UNIQUE,
    fecha_nacimiento DATE,
    edad INTEGER,
    genero VARCHAR(20),
    ocupacion VARCHAR(100),
    nivel_educativo VARCHAR(100),
    telefono VARCHAR(20),
    direccion TEXT,
    eps VARCHAR(100),
    estado_civil VARCHAR(30),
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id)
        REFERENCES public.usuario (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- 3. Antecedentes Personales
CREATE TABLE IF NOT EXISTS public.antecedentes_personales (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    infarto BOOLEAN,
    fecha_infarto DATE,
    angina BOOLEAN,
    fecha_angina DATE,
    acv BOOLEAN,
    fecha_acv DATE,
    eap BOOLEAN,
    fecha_eap DATE,
    insuficiencia_cardiaca BOOLEAN,
    fecha_ic DATE,
    arritmias BOOLEAN,
    fecha_arritmias DATE,
    revascularizacion BOOLEAN,
    fecha_revascularizacion DATE,
    fecha_dispositivos_cardiacos DATE,
    CONSTRAINT fk_usuario_antecedentes FOREIGN KEY (usuario_id)
        REFERENCES public.usuario (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- 4. Factores de Riesgo
CREATE TABLE IF NOT EXISTS public.factores_riesgo (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    hta BOOLEAN,
    hta_desde TEXT,
    hta_tratamiento TEXT,
    diabetes BOOLEAN,
    dm_desde TEXT,
    dm_tratamiento TEXT,
    dislipidemia BOOLEAN,
    dislipidemia_desde TEXT,
    dislipidemia_tratamiento TEXT,
    enfermedad_renal BOOLEAN,
    erc_estadio TEXT,
    erc_tratamiento TEXT,
    tabaquismo TEXT,
    anos_tabaquismo INTEGER,
    alcoholismo BOOLEAN,
    cantidad_frecuencia TEXT,
    sedentarismo BOOLEAN,
    tipo_actividad TEXT,
    apnea_sueno BOOLEAN,
    frecuencia_fuma TEXT,
    vapeo TEXT,
    anos_vapeo INTEGER,
    frecuencia_vapeo TEXT,
    dias_ejercicio TEXT,
    minuto_ejercicio TEXT,
    patologias TEXT,
    programas_pacientes TEXT,
    medicamentos TEXT,
    CONSTRAINT fk_usuario_factores FOREIGN KEY (usuario_id)
        REFERENCES public.usuario (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- 5. Antecedentes Familiares
CREATE TABLE IF NOT EXISTS public.antecedentes_familiares (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    historial_familiar BOOLEAN,
    integrante_familia TEXT,
    CONSTRAINT fk_usuario_antecedentes_fam FOREIGN KEY (usuario_id)
        REFERENCES public.usuario (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- 6. Medicamentos y Alergias
CREATE TABLE IF NOT EXISTS public.medicamentos_alergias (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    medicamentos_actuales TEXT,
    alergias TEXT,
    CONSTRAINT fk_usuario_medicamentos FOREIGN KEY (usuario_id)
        REFERENCES public.usuario (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- 7. Hábitos de Vida
CREATE TABLE IF NOT EXISTS public.habitos_vida (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    dieta TEXT,
    actividad_fisica TEXT,
    consumo_alcohol BOOLEAN,
    alcohol_detalles TEXT,
    sustancias_psicoactivas BOOLEAN,
    sustancias_detalles TEXT,
    nivel_estres TEXT,
    calidad_sueno TEXT,
    CONSTRAINT fk_usuario_habitos FOREIGN KEY (usuario_id)
        REFERENCES public.usuario (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- 8. Revisión de Sistemas
CREATE TABLE IF NOT EXISTS public.revision_sistemas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    dolor_toracico BOOLEAN,
    caracteristicas_dolor TEXT,
    disnea BOOLEAN,
    detalles_disnea TEXT,
    palpitaciones BOOLEAN,
    detalles_palpitaciones TEXT,
    edema BOOLEAN,
    detalles_edema TEXT,
    sincope BOOLEAN,
    detalles_sincope TEXT,
    claudicacion BOOLEAN,
    distancia_claudicacion TEXT,
    sintomas_neurologicos BOOLEAN,
    CONSTRAINT fk_usuario_revision FOREIGN KEY (usuario_id)
        REFERENCES public.usuario (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- 9. Examen Físico
CREATE TABLE IF NOT EXISTS public.examen_fisico (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    pa_derecho VARCHAR(10),
    pa_izquierdo VARCHAR(10),
    frecuencia_cardiaca INTEGER,
    frecuencia_respiratoria INTEGER,
    temperatura NUMERIC(4,2),
    peso NUMERIC(5,2),
    talla NUMERIC(4,2),
    imc NUMERIC(5,2),
    perimetro_abdominal NUMERIC(5,2),
    edema BOOLEAN,
    grado_edema TEXT,
    CONSTRAINT fk_usuario_examen_fisico FOREIGN KEY (usuario_id)
        REFERENCES public.usuario (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- 10. Exámenes Complementarios
CREATE TABLE IF NOT EXISTS public.examenes_complementarios (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    glucosa NUMERIC(5,2),
    hba1c NUMERIC(4,2),
    hdl NUMERIC(5,2),
    ldl NUMERIC(5,2),
    trigliceridos NUMERIC(5,2),
    creatinina NUMERIC(5,2),
    CONSTRAINT fk_usuario_examenes FOREIGN KEY (usuario_id)
        REFERENCES public.usuario (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- 11. Riesgo Cardiovascular
CREATE TABLE IF NOT EXISTS public.riesgo_cardiovascular (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    escala_utilizada TEXT,
    categoria_riesgo VARCHAR(20),
    puntuacion TEXT,
    nuevos_examenes TEXT,
    proxima_cita DATE,
    CONSTRAINT fk_usuario_riesgo FOREIGN KEY (usuario_id)
        REFERENCES public.usuario (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- 12. Datos mensuales (Peso e IMC)
CREATE TABLE IF NOT EXISTS public.peso_imc_mensual (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    fecha_registro DATE NOT NULL,
    peso NUMERIC(5,2),
    imc NUMERIC(5,2),
    CONSTRAINT fk_usuario_peso_imc FOREIGN KEY (usuario_id)
        REFERENCES public.usuario (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- 13. Encuestas
CREATE TABLE IF NOT EXISTS public.encuestas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    fecha_registro DATE,
    empoderamiento_salud INTEGER,
    ipaq INTEGER,
    fuster_bewat INTEGER,
    pittsburgh INTEGER,
    CONSTRAINT fk_usuario_encuestas FOREIGN KEY (usuario_id)
        REFERENCES public.usuario (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- 14. Mujeres
CREATE TABLE IF NOT EXISTS public.mujeres (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    ovario_poliquistico TEXT,
    primera_menstruacion INTEGER,
    diabetes_gestacional TEXT,
    hijos_bajo_peso TEXT,
    parto_pretermino TEXT,
    menopausia TEXT,
    CONSTRAINT fk_usuario_mujeres FOREIGN KEY (usuario_id)
        REFERENCES public.usuario (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- =========================================
-- Fin del Script
-- =========================================
