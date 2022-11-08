import { IUsersRepository } from "@/application/repositories/users-repository";
import { Users } from "@/domain/entities/users";

export type ListAllUsersOutput = {
    id?: string
    username: string
    email: string
    password: string
    balance: number
}

export class ListAllUsersUserCase {

    constructor(
        private userRepository: IUsersRepository
    ){}

    async execute(): Promise<ListAllUsersOutput[]>{

        const users = await this.userRepository.listAll()
        return users.map(user => user.getProps() )
    }
}
