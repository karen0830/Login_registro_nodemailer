import express from 'express';
import morgan from 'morgan';
import Router from '../src/router/auth.routes.js';
import cookieParser from 'cookie-parser';
import taskRoutes from './router/task.routes.js'
const app = express();

app.use(morgan('dev'));
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(cookieParser());
app.use("/api", Router);
app.use("/api", taskRoutes)

export default app;
