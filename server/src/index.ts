import 'reflect-metadata';

import { ErrorHandlerMiddleware, NotFoundMiddleware } from './middlewares/index.js';
import { Logger } from './lib/logger/index.js';
import { Env } from './config/env.js';
import { container } from 'tsyringe';
import express from 'express';

async function bootstrap(): Promise<void> {
    const logger = new Logger();
    const app = express();
    app.use(express.json());

    app.listen(Env.port, () => {
        logger.info('Server listening on port %d', Env.port);

        app.use(container.resolve(NotFoundMiddleware).handler);
        app.use(container.resolve(ErrorHandlerMiddleware).handler);
    });
}

void bootstrap();