import express from 'express';
import expressLoader from './express.js';
import logger from './logger.js';

export default async ({ expressApp }: { expressApp: express.Application }) => {
    logger.info('Loading Express.');

    await expressLoader({ app: expressApp });
    logger.info('Express loaded.');
}

export { default as logger } from './logger.js';
