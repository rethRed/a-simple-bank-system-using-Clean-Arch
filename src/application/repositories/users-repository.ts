import { Users } from "@/domain/entities/users";

export interface IUsersRepository {
    insert(user: Users): Promise<Users>
    findById(id: any): Promise<Users | null>
}

