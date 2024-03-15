import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { environment } from './config/environment.js';
import './models/index.js';
import { BASE_URL } from './constants/index.js';
import { authRouter, hotelRouter, bookingRouter, roomRouter } from './routes/index.js';
import { ErrorHandler, VerifyToken, CheckRole } from './middlewares/index.js';
import swaggerDocs from './swagger.js';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(`${BASE_URL}/auth`, authRouter);

app.use(VerifyToken);
app.use(CheckRole);

app.use(BASE_URL, hotelRouter);
app.use(BASE_URL, bookingRouter);
app.use(BASE_URL, roomRouter);

app.use(ErrorHandler);

app.listen(environment.appPort, () => console.log('Server listening on port ' + environment.appPort));
swaggerDocs(app, environment.appPort);
