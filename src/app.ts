import express, { Application } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/errors/notFound';
import globalErrorHandler from './app/errors/globalErrorHandler';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', router);

app.use(notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
