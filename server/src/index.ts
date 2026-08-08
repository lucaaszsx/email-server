import 'reflect-metadata';

import { ErrorHandlerMiddleware, NotFoundMiddleware } from './api/middlewares/index.js';
import { Logger } from './lib/logger/index.js';
import { db } from './database/index.js';
import { Env } from './config/env.js';
import { container } from 'tsyringe';
import express from 'express';

async function bootstrap(): Promise<void> {
    const logger = new Logger();

    // Check database connection
    try {
        await db`SELECT 1`;
        logger.info('Database connection established');
    } catch (err) {
        logger.error('Failed to connect to database: %s', err);
        process.exit(1);
    }

    // Server setup
    const app = express();
    app.use(express.json());

    // Global middlewares
    app.use(container.resolve(NotFoundMiddleware).handler);
    app.use(container.resolve(ErrorHandlerMiddleware).handler);

    app.listen(Env.port, () => {
        logger.info('Server listening on port %d', Env.port);
    });
}

void bootstrap();