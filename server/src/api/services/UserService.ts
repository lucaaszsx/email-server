import { injectable, singleton } from "tsyringe";
import type { UserRepository } from "../database/index.js";

@singleton()
@injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    public async create() {}
}