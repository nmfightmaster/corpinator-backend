import { Router } from 'express';
import health from './routes/health.js';

export default () => {
    const app = Router();
    
    health(app);

    return app;
}