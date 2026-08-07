import { Logger } from "../lib/logger/index.js";

export function InjectLogger(filename: string) {
    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get() {
                return new Logger(filename);
            },
            enumerable: true,
            configurable: true
        });
    };
}
