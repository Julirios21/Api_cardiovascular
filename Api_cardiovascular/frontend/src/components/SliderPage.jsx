import "../styles/SliderPage.css";

function SliderPage() {
  return (
    <div
      id="mainSlider"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="4000"
    >
      <div className="carousel-inner">

        <div className="carousel-item active">
          <img src="slider.png" className="d-block w-100 slider-img" alt="Slide 1" />
          <div className="carousel-caption d-flex flex-column justify-content-center align-items-center text-center full-caption">
            <h2>Bienvenido</h2>
            <p>Evalúa y registra información clínica con confianza</p>
          </div>
        </div>

        <div className="carousel-item">
          <img src="slider3.jpg" className="d-block w-100 slider-img" alt="Slide 2" />
          <div className="carousel-caption d-flex flex-column justify-content-center align-items-center text-center full-caption">
            <h2>Información precisa</h2>
            <p>Apoya diagnósticos con datos confiables</p>
          </div>
        </div>

        <div className="carousel-item">
          <img src="slider4.jpg" className="d-block w-100 slider-img" alt="Slide 3" />
          <div className="carousel-caption d-flex flex-column justify-content-center align-items-center text-center full-caption">
            <h2>Acceso desde cualquier lugar</h2>
            <p>Compatible con dispositivos móviles</p>
          </div>
        </div>

      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#mainSlider" data-bs-slide="prev">
        <span className="carousel-control-prev-icon custom-arrow" />
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#mainSlider" data-bs-slide="next">
        <span className="carousel-control-next-icon custom-arrow" />
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}

export default SliderPage;
