import { Entity } from "@/core/domain/entity"
import { Users } from "./users"

export type DepositMoneyProps = {
    id?: string
    value: number,
    user: Users,
    createdAt: Date 
}

export type DepositMoneyInput = {
    value: number,
    user: Users
}


export class DepositMoney extends Entity<DepositMoneyProps>{

    constructor(props: DepositMoneyProps){
        super(props)
    }

    static deposit({value, user} : DepositMoneyInput): DepositMoney{

        const newDeposit = new DepositMoney({
            value,
            user,
            createdAt: new Date()
        })
        
        user.depositMoney(value)

        return newDeposit
    }

}