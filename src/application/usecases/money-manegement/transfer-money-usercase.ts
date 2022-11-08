import { Users } from "@/domain/entities/users";
import { IUsersRepository } from "@/application/repositories";

export type TransferMoneyInput = {
    from: Users,
    to: Users,
    value: number
}

export class TransferMoneyUseCase {

    constructor(
        private usersRepository: IUsersRepository
    ){}

    async execute({from, to, value}: TransferMoneyInput): Promise<void>{
        
        try{
            from.withdrawMoney(value)
        }catch(err){
            throw new Error("can't more money than one has ")
        }
        to.depositMoney(value)

        this.usersRepository.save(from)
        this.usersRepository.save(to)
    }
}