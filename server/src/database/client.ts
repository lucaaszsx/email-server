import postgres from 'postgres';
import { Env } from '../config/env.js';

export const db = postgres(Env.db.url);
