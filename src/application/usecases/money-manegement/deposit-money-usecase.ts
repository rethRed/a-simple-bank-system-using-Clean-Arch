
import { Users } from "@/domain/entities/users";
import { IDepositMoneyRepository } from "@/application/repositories/deposit-money-repository";
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
        private depositRepository: IDepositMoneyRepository
    ){}

    async execute(props: DepositMoneyInput): Promise<DepositMoneyOutput>{
        
        const deposit = DepositMoney.deposit({
            ...props
        })

        await this.depositRepository.insert(deposit)

        return deposit.getProps()
    }
}
