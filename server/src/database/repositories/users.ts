import type { PublicUser, User } from "../../types.js";
import { Logger } from "../../lib/logger/index.js";
import { injectable, singleton } from "tsyringe";
import type { UserRow } from "../types.js";
import { db } from "../client.js";

@singleton()
@injectable()
export class UserRepository {
    private logger = new Logger(__filename);

    public async create(username: string, password: string): Promise<PublicUser | null> {
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

        return this.toPublicUser(user);
        /*} catch (err) {
            if (err instanceof PostgresError && err.code === '23505') {
                this.logger.warn('failed to create user \'%s\': user already exists', username);
                return null;
            }
            throw err;
        }*/
    }

    public async findByUsername(username: string): Promise<PublicUser | null> {
        const [user] = await db<UserRow[]>`SELECT * FROM users WHERE username = ${username}`;
        return user ? this.toPublicUser(user) : null;
    }

    public async findById(id: string): Promise<PublicUser | null> {
        const [user] = await db<UserRow[]>`SELECT * FROM users WHERE id = ${id}`;
        return user ? this.toPublicUser(user) : null;
    }

    public async findWithPassword(username: string): Promise<User | null> {
        const [user] = await db<UserRow[]>`SELECT * FROM users WHERE username = ${username}`;
        return user ? this.toUser(user) : null;
    }

    public async deleteUser(id: string): Promise<boolean> {
        const result = await db`DELETE FROM users WHERE id = ${id}`;
        return result.count > 0;
    }

    private toUser(row: UserRow): User {
        return {
            id: row.id,
            username: row.username,
            password: row.password,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        };
    }

    private toPublicUser(row: UserRow): PublicUser {
        const { password, ...user } = this.toUser(row);
        return user;
    }
}
