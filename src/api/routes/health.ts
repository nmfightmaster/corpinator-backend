import { Router, Request, Response } from 'express';
//import middleware from '../middleware';
const router = Router();
import pkg from '../../../package.json' with { type: 'json' };

const { version } = pkg;

export default (app: Router) => {
    app.use('/health', router);

    router.get('/', /*middleware.isAuth,*/ (req: Request, res: Response) => {
        return res.json({ status: 'ok', version: version}).status(200);
    });
};