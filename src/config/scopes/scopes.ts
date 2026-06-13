import scopes from './scopes.json' with { type: "json" };
import logger from '../../loaders/logger.js';

 export function getScopes() {
    logger.debug('EVE Scopes loaded successfully');
    return scopes.join(' ');
 }