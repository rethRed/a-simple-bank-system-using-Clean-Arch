
import { Users } from "@/domain/entities/users";
import { IUsersRepository } from "@/application/repositories";

export type WithDrawMoneyInput = {
    value: number,
    user: Users ,
}

export class WithDrawMoneyUseCase {

    constructor(
        private usersRepository: IUsersRepository
    ){}

    async execute({user, value}: WithDrawMoneyInput): Promise<void>{
        user.withdrawMoney(value)
        this.usersRepository.save(user)
    }
}
