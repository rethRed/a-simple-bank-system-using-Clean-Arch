
import { Users } from "@/domain/entities/users";
import { IUsersRepository } from "@/application/repositories";
import { DepositMoney } from "@/domain/entities";

export type DepositMoneyInput = {
    value: number,
    user: Users ,
}

export type DepositMoneyOutput = {
    id?: string
    value: number,
    user: Users,
    createdAt: Date 
}


export class DepositMoneyUseCase {

    constructor(
        private usersRepository: IUsersRepository
    ){}

    async execute({user, value}: DepositMoneyInput): Promise<void>{
        user.depositMoney(value)
        this.usersRepository.save(user)
    }
}
