import { useForm } from "react-hook-form";
import "./../styles/ClinicalFormPage.css"; 

function ClinicalFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Formulario enviado (simulado)", data);
  };

  return (
    <div className="container py-5 clinical-form">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">FORMULARIO HISTORIAL CLÍNICO</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Datos personales */}
          <h4 className="section-title">Datos generales del paciente</h4>
          <div className="row">
            <div className="mb-3 col-md-6">
              <label>Nombre completo</label>
              <input className="form-control" {...register("nombre", { required: true })} />
            </div>

            <div className="mb-3 col-md-6">
              <label>Documento de identidad</label>
              <input className="form-control" {...register("cedula", { required: true })} />
            </div>
            
                        <div className="mb-3 col-md-6">
              <label>Correo institucional</label>
              <input className="form-control" {...register("correo", { required: true })} />
            </div>

            <div className="mb-3 col-md-6">
              <label>Fecha de nacimiento</label>
              <input className="form-control" type= "date"{...register("fecha de nacimiento", { required: true })} />
            </div>

            <div className="mb-3 col-md-6">
              <label>Edad</label>
              <input type="number" min="0" max="100" className="form-control" {...register("edad", { required: true })} />
            </div>

            <div className="mb-3 col-md-6">            
              <label>Sexo</label>
              <select className="form-select" {...register("sexo", { required: true })}>
                <option value="" disabled hidden>Seleccione</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Binario">Prefiero no decirlo</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="mb-3 col-md-6">
              <label>Ocupación</label>
              <input className="form-control" type="text" {...register("ocupacion", { required: true })} />
            </div>
            <div className="mb-3 col-md-6">
              <label>Nivel educativo</label>
              <input className="form-control" type="text" {...register("ocupacion", { required: true })} />
            </div>
          </div>

          {/* Contacto */}
          <h4 className="section-title">Contacto</h4>
          <div className="row">
            <div className="mb-3 col-md-6">
              <label>Teléfono</label>
              <input className="form-control" {...register("telefono", { required: true })} />
            </div>

            <div className="mb-3 col-md-6">
              <label>Correo institucional</label>
              <input type="email" className="form-control" {...register("correo", { required: true })} />
            </div>
          </div>

          {/* Sociodemográficos */}
          <h4 className="section-title">Datos sociodemográficos</h4>
          <div className="row">
            <div className="mb-3 col-md-6">
              <label>Sexo</label>
              <select className="form-select" {...register("sexo", { required: true })}>
                <option value="" disabled hidden>Seleccione</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Binario">Binario</option>
              </select>
            </div>

            <div className="mb-3 col-md-6">
              <label>Estado civil</label>
              <select className="form-select" {...register("estado civil", { required: true })}>
                <option value="" disabled hidden>Seleccione</option>
                <option value="Blanca">Soltero</option>
                <option value="Indígena">Casado</option>
                <option value="Mestiza">Union libre</option>
                <option value="Negra">No especifica</option>
              </select>
            </div>
          </div>

          {/* Antecedentes médicos */}
          <h4 className="section-title">Antecedentes médicos</h4>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Describa antecedentes médicos relevantes"
              {...register("antecedentes")}
            />
          </div>

          {/* Signos vitales */}
          <h4 className="section-title">Signos vitales</h4>
          <div className="row">
            <div className="mb-3 col-md-4">
              <label>Presión arterial (mmHg)</label>
              <input className="form-control" placeholder="Ej: 120/80" {...register("presion")} />
            </div>

            <div className="mb-3 col-md-4">
              <label>Frecuencia cardíaca (bpm)</label>
              <input type="number" className="form-control" {...register("frecuenciaCardiaca")} />
            </div>

            <div className="mb-3 col-md-4">
              <label>Temperatura (°C)</label>
              <input type="number" step="0.1" className="form-control" {...register("temperatura")} />
            </div>
          </div>

          {/* Observaciones */}
          <h4 className="section-title">Observaciones clínicas</h4>
          <div className="mb-4">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Notas clínicas o psicológicas"
              {...register("observaciones")}
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">
              Guardar formulario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClinicalFormPage;
