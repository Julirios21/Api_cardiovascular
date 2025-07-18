import { useAuth } from "../context/AuthContext";
import HeroSlider from "../components/SliderPage"; // Asegúrate que esta ruta sea correcta

function HomePage() {
  const { user } = useAuth();

  return (
    <>
      {/* Slider de bienvenida */}
      <HeroSlider />

      {/* Contenido principal */}
      <div className="container py-5 text-center">
        <img src="/escudo.png" alt="Escudo Universidad" className="mb-4" width="120" />
        <h1 className="h3 fw-bold mb-4">Plataforma de Evaluación Socio-Clínica</h1>
        <p className="mb-3">
          En esta plataforma podrás completar cuestionarios y registrar información socio-clínica relevante.
          Se recopilan datos personales, antecedentes médicos y signos vitales con el fin de apoyar evaluaciones diagnósticas, estudios clínicos o procesos académicos.
        </p>
        <p>
          Por favor, proporciona la información con veracidad y exactitud. Todos los datos serán tratados con confidencialidad y uso ético.
        </p>
      </div>
            <div className="container py-5 text-center">
        <img src="/escudo.png" alt="Escudo Universidad" className="mb-4" width="120" />
        <h1 className="h3 fw-bold mb-4">Plataforma de Evaluación Socio-Clínica</h1>
        <p className="mb-3">
          En esta plataforma podrás completar cuestionarios y registrar información socio-clínica relevante.
          Se recopilan datos personales, antecedentes médicos y signos vitales con el fin de apoyar evaluaciones diagnósticas, estudios clínicos o procesos académicos.
        </p>
        <p>
          Por favor, proporciona la información con veracidad y exactitud. Todos los datos serán tratados con confidencialidad y uso ético.
        </p>
      </div>
    </>
  );
}

export default HomePage;
