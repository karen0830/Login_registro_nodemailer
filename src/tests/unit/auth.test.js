import { MongoClient } from 'mongodb';
import supertest from 'supertest';
import express from 'express';
import Joi from 'joi'; // Asegúrate de haber instalado Joi previamente

// Define tu esquema de validación aquí
const schema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Resto de tu código de prueba
// ...

// Configura una instancia de Express para las pruebas
const app = express();

// Configura la ruta de prueba con las funciones de middleware y controlador
app.post('/api/register', (req, res, next) => {
  // Valida los datos enviados en el cuerpo de la solicitud
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    // Si hay un error de validación, responde con un código de estado 400 (Bad Request)
    return res.status(400).json({
      error: validationResult.error.details[0].message,
    });
  }

  // Si la validación es exitosa, continúa con el controlador o la lógica de registro aquí
  // ...

  // Por ejemplo, puedes guardar el usuario en la base de datos en este punto

  // Respuesta de éxito (código de estado 200)
  res.status(200).json({
    message: 'Registro exitoso',
  });
});

// Configura supertest para usar tu aplicación
const request = supertest(app);

describe('Pruebas de la ruta de registro', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb+srv://karen123:karen123@cluster0.yaxtqh3.mongodb.net/datos', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db();
  });

  it('debería responder con éxito si los datos son válidos', async () => {
    const userData = {
      username: 'test1',
      email: 'test1@gmail.com',
      password: 'test12',
    };

    // Valida los datos manualmente antes de enviarlos
    const validationResult = schema.validate(userData);

    if (validationResult.error) {
      // Manejo del error de validación si lo deseas
      console.error(validationResult.error.details);
    }

    const response = await request
      .post('/api/register')
      .send(userData);

    // Verifica que la respuesta sea exitosa (código de estado 200)
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await connection.close();
  });
});



