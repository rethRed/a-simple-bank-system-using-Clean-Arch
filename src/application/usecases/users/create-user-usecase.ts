import { IUsersRepository } from "@/application/repositories/users-repository";
import { Users } from "@/domain/entities/users";
import { hashPassword } from "@/application/utils/password-hash";

export type CreateUserInput = {
    username: string
    email: string
    password: string
}

export type CreateUserOutput = {
    id?: string
    username: string
    email: string
    password: string
    balance: number
}


export class CreateUser {

    constructor(
        private userRepository: IUsersRepository
    ){}

    async execute(props: CreateUserInput): Promise<CreateUserOutput>{

        const hashedPassword = await hashPassword(props.password)

        const user = Users.create({
            ...props,
            password: hashedPassword
        })

        await this.userRepository.insert(user)

        return user.getProps()
    }
}
