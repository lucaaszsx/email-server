import type { PublicUser, User } from "../../types.js";
import { Logger } from "../../lib/logger/index.js";
import type { UserRow } from "../types.js";
import { db } from "../client.js";

class UserRepository {
    private logger = new Logger(__filename);

    async create(username: string, password: string): Promise<User | null> {
        this.logger.info('creating user \'%s\'', username);

        const [user] = await db<UserRow[]>`
            INSERT INTO users (
                username,
                password
            )
            VALUES (
                ${username},
                ${password}
            )
            RETURNING *;
        `;
        if (!user) throw new Error(`Failed to insert user '${username}': insertion did not returned a row`);

        return this.toUser(user);
        /*} catch (err) {
            if (err instanceof PostgresError && err.code === '23505') {
                this.logger.warn('failed to create user \'%s\': user already exists', username);
                return null;
            }
            throw err;
        }*/
    }

    async findByUsername(username: string): Promise<User | null> {
        const [user] = await db<UserRow[]>`SELECT * FROM users WHERE username = ${username}`;
        if (!user) return null;

        return this.toUser(user);
    }

    async findById(id: string): Promise<User | null> {
        const [user] = await db<UserRow[]>`SELECT * FROM users WHERE id = ${id}`;
        if (!user) return null;

        return this.toUser(user);
    }

    async deleteUser(id: string): Promise<boolean> {
        const result = await db`DELETE FROM users WHERE id = ${id}`;
        return result.count > 0;
    }

    toUser(row: UserRow): User {
        return {
            id: row.id,
            username: row.username,
            password: row.password,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        };
    }

    toPublicUser(row: UserRow): PublicUser {
        const { password, ...user } = this.toUser(row);
        return user;
    }
}

export const userRepository = new UserRepository();
