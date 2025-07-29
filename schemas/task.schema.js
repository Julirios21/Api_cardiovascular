import { z } from "zod";

export const createTaskSchema = z.object({
  
  nombre: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser un texto",
    })
    .min(1)
    .max(255),
  cedula: z
    .string({
      required_error: "La cedula es requerida",
      invalid_type_error: "La cedula debe ser un texto",
    })
    .min(1)
    .max(255),
  telefono: z
    .string({
      required_error: "El telefono es requerido",
      invalid_type_error: "El telefono debe ser un texto",
    })
    .min(1)
    .max(255),
  correo: z
    .string({
      required_error: "El correo es requerido",
      invalid_type_error: "El correo debe ser un texto",
    })
    .min(1)
    .max(255),
  edad: z
    .string({
      required_error: "La edad es requerida",
      invalid_type_error: "La edad debe ser un texto",
    })
    .min(1)
    .max(255),
  sexo: z
    .string({
      required_error: "El sexo es requerido",
      invalid_type_error: "El sexo debe ser un texto",
    })
    .min(1)
    .max(255),
  raza: z
    .string({
      required_error: "La raza es requerida",
      invalid_type_error: "La raza debe ser un texto",
    })
    .min(1)
    .max(255),
});

export const updateTaskSchema = z.object({
  
  nombre: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser un texto",
    })
    .min(1)
    .max(255).optional(),
  cedula: z
    .string({
      required_error: "La cedula es requerida",
      invalid_type_error: "La cedula debe ser un texto",
    })
    .min(1)
    .max(255).optional(),
  telefono: z
    .string({
      required_error: "El telefono es requerido",
      invalid_type_error: "El telefono debe ser un texto",
    })
    .min(1)
    .max(255).optional(),
  correo: z
    .string({
      required_error: "El correo es requerido",
      invalid_type_error: "El correo debe ser un texto",
    })
    .min(1)
    .max(255).optional(),
  edad: z
    .string({
      required_error: "La edad es requerida",
      invalid_type_error: "La edad debe ser un texto",
    })
    .min(1)
    .max(255).optional(),
  sexo: z
    .string({
      required_error: "El sexo es requerido",
      invalid_type_error: "El sexo debe ser un texto",
    })
    .min(1)
    .max(255).optional(),
  raza: z
    .string({
      required_error: "La raza es requerida",
      invalid_type_error: "La raza debe ser un texto",
    })
    .min(1)
    .max(255).optional(),
});


