// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const internoRoutes = require('./routes/internoRoutes');
const externoRoutes = require('./routes/externoRoutes');
const importarRoutes = require('./routes/importarCSV');

// Endpoints
app.use('/usuarios', usuarioRoutes);
app.use('/interno', internoRoutes);
app.use('/externo', externoRoutes);
app.use('/api', importarRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API Cardiovascular funcionando correctamente',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
