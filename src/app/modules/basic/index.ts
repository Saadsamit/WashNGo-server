import { Request, Response, Router } from 'express';
import config from '../../config';

const route = Router();

route.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    massage: `server is running ${config.port}`,
  });
});

const basicRoute = route;

export default basicRoute;
