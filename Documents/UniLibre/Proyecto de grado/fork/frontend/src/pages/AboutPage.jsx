import "../styles/AboutPage.css"; // Importa el CSS específico para AboutPage


function AboutPage() {
  return (
    <>
      <div id="aboutSlider" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/slider.png" className="d-block w-100" alt="Slide 1.1" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Comprometidos con tu bienestar</h5>
              <p>Registramos información clínica de forma ética y segura.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/slider3.jpg" className="d-block w-100" alt="Slide 2.1" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Apoyo académico y diagnóstico</h5>
              <p>Útil para investigaciones y evaluaciones profesionales.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/slider4.jpg" className="d-block w-100" alt="Slide 3.1" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Privacidad garantizada</h5>
              <p>Tus datos serán tratados con confidencialidad.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#aboutSlider" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#aboutSlider" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-4">Sobre la Plataforma</h2>
        <p>
          Esta plataforma permite registrar información socio-clínica con fines académicos, diagnósticos y de investigación.
        </p>
        <p>
          Nuestro enfoque se basa en la ética, confidencialidad y facilidad de uso para profesionales y estudiantes.
        </p>
      </div>
    </>
  );
}

export default AboutPage;
