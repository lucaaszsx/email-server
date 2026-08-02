import { Env } from './config/env.js';
import express from 'express';
import { Logger } from './lib/logger/index.js';

async function bootstrap(): Promise<void> {
    const logger = new Logger();
    const app = express();
    app.use(express.json());

    app.listen(Env.port, () => {
        logger.info('Server listening on port %d', Env.port);

        
    });
}

void bootstrap();