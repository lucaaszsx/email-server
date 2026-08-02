import { Paths } from '../../config/constants.js';
import path from 'node:path';
import chalk from 'chalk';

export interface LoggerInterface {
    debug(message: string, ...args: unknown[]): void;
    info(message: string, ...args: unknown[]): void;
    warn(message: string, ...args: unknown[]): void;
    error(message: string, ...args: unknown[]): void;
}

export enum LoggerLevels {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error'
}

const LEVEL_COLOR: Record<LoggerLevels, (text: string) => string> = {
    [LoggerLevels.DEBUG]: chalk.gray,
    [LoggerLevels.INFO]: chalk.cyan,
    [LoggerLevels.WARN]: chalk.yellow,
    [LoggerLevels.ERROR]: chalk.red
};

export class Logger implements LoggerInterface {
    private static DEFAULT_SCOPE = 'app';

    private static parsePathToScope(filepath: string): string {
        if (filepath.indexOf(path.sep) >= 0)
            filepath = filepath
                .replace(process.cwd(), '')
                .replace(`${path.sep}${Paths.source}${path.sep}`, '')
                .replace(`${path.sep}${Paths.distribution}${path.sep}`, '')
                .replace('.ts', '')
                .replace('.js', '')
                .replace(new RegExp(path.sep, 'g'), ':');

        return filepath;
    }

    private scope: string;

    constructor(scope?: string) {
        this.scope = Logger.parsePathToScope(scope ?? Logger.DEFAULT_SCOPE);
    }

    public debug(message: string, ...args: unknown[]): void {
        this.log(LoggerLevels.DEBUG, message, args);
    }

    public info(message: string, ...args: unknown[]): void {
        this.log(LoggerLevels.INFO, message, args);
    }

    public warn(message: string, ...args: unknown[]): void {
        this.log(LoggerLevels.WARN, message, args);
    }

    public error(message: string, ...args: unknown[]): void {
        this.log(LoggerLevels.ERROR, message, args);
    }

    private log(level: LoggerLevels, message: string, args: unknown[]): void {
        const color = LEVEL_COLOR[level];
        const timestamp = chalk.dim(new Date().toISOString());
        const tag = color(`[${level.toUpperCase()}]`);
        const scope = chalk.dim(`[${this.scope}]`);

        console[level](`${timestamp} ${tag} ${scope} ${message}`, ...args);
    }
}
