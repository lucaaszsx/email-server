import 'dotenv/config';

import { Paths } from './constants.js';
import { join } from 'node:path';

function requireEnv(key: string, fallback?: string): string {
    const value = process.env[key];
    if (!value && typeof fallback !== 'string')
        throw new Error('Missing envionment key: ' + key);
    return value as string;
}

function parsePath(path: string) {
    return join(
        process.cwd(),
        process.env['NODE_ENV'] === 'prod'
            ? path.replace(`${Paths.source}/`, `${Paths.distribution}/`).slice(0, -3) + '.js'
            : path
    )
}

export const Env = {
    /** Node */
    node: requireEnv('NODE_ENV'),

    /** Server Options */
    port: parseInt(requireEnv('SERVER_PORT', '3000'), 10),

    /** Secrets */
    secrets: {
        webhook: requireEnv('WEBHOOK_SECRET'),
        admin: requireEnv('ADMIN_SECRET'),
        jwt: requireEnv('JWT_SECRET')
    },

    /** Paths */
    paths: {
        mail: parsePath(requireEnv('MAIL_PATH'))
    }
};