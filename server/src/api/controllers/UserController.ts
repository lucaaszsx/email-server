import type { UserService } from '../services/index.js';
import type { Request, Response } from 'express';
import { injectable } from "tsyringe";
import z from 'zod';

const createUserSchema = z.object({
    username: z.string().min(5).max(70),
    password: z.string().min(7).max(256)
});

@injectable()
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}
    
    createUser = async (req: Request, res: Response) => {
        
    }

    getUser = async (req: Request, res: Response) => { }

    getUsers = async (req: Request, res: Response) => { }

    deleteUser = async (req: Request, res: Response) => { }
}
