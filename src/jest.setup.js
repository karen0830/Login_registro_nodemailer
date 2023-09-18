module.exports = {
    // Otras configuraciones de Jest...
  
    // Configuración específica para MongoDB en memoria
    globalSetup: './tests/setup.js', // Ruta al archivo de configuración de MongoDB en memoria
    globalTeardown: './tests/teardown.js', // Ruta al archivo de limpieza de MongoDB en memoria
    testEnvironment: 'node', // Usa el entorno de Node.js
};
  