import { Logger } from "../lib/logger/index.js";
import { fileURLToPath } from "node:url";

export function InjectLogger(importMeta: string) {
    const filename = fileURLToPath(importMeta);

    return function (target: any, propertyKey: string) {
        const sym = Symbol(propertyKey);
        Object.defineProperty(target, propertyKey, {
            get() {
                if (!this[sym]) this[sym] = new Logger(filename);
                return this[sym];
            },
            enumerable: true,
            configurable: true
        });
    };
}
