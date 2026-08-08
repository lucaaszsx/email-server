import { Env } from '../config/env.js';
import pg from 'postgres';

export const db = pg(Env.db.url);
