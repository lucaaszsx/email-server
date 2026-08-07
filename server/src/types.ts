export interface User {
    id: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export type PublicUser = Omit<User, 'password'>