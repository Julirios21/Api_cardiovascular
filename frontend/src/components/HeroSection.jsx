import "../styles/SliderPage.css";

function HeroSection() {
  return (
    <section>
      <div
        id="mainSlider"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >
        <div className="carousel-inner">
          {/* Slide 1 (Tu código) */}
          <div className="carousel-item active">
            <img
              src="slider.png"
              className="d-block w-100 slider-img"
              alt="Slide 1"
            />
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center text-center full-caption">
              <h2>Bienvenido</h2>
              <p>Evalúa y registra información clínica con confianza</p>
            </div>
          </div>

          {/* Slide 2 (Tu código) */}
          <div className="carousel-item">
            <img
              src="slider3.jpg"
              className="d-block w-100 slider-img"
              alt="Slide 2"
            />
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center text-center full-caption">
              <h2>Información precisa</h2>
              <p>Apoya diagnósticos con datos confiables</p>
            </div>
          </div>

          {/* Slide 3 (Tu código) */}
          <div className="carousel-item">
            <img
              src="slider4.jpg"
              className="d-block w-100 slider-img"
              alt="Slide 3"
            />
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center text-center full-caption">
              <h2>Acceso desde cualquier lugar</h2>
              <p>Compatible con dispositivos móviles</p>
            </div>
          </div>

          {/* Slide 4 (El que yo te di antes) */}
          <div className="carousel-item">
            <img
              src="slider4.jpg"
              className="d-block w-100 slider-img"
              alt="Slide 3"
            />
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center text-center full-caption">
              <h2 className="fw-bold">Cuidado cardiovascular de excelencia</h2>
              <p>
                Tecnología avanzada y especialistas de primer nivel para el cuidado integral de tu corazón
              </p>
              <div className="mt-3">
                <button className="btn btn-danger me-2">Agendar consulta</button>
                <button className="btn btn-outline-light">Conocer más</button>
              </div>
            </div>
          </div>
        </div>

        {/* Controles */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#mainSlider"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon custom-arrow" />
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#mainSlider"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon custom-arrow" />
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
