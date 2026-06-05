import express from 'express';
import config from './config/index.js';
import loaders from './loaders/index.js';
import logger from './loaders/logger.js';

async function startServer() {
    const app = express();

    await loaders({ expressApp: app });

    app.listen(config.port, () => {
        logger.info(`Server is running on port ${config.port}`);
    });
}

startServer();