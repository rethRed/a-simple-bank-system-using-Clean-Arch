import { DepositMoney, Users } from "@/domain/entities"

export interface IDepositMoneyRepository {
    insert(depositMoneyEntity: DepositMoney): Promise<DepositMoney>
}



export namespace IDepositMoneyRepository{

    export type DepositMoneyOutput = {
        value: number,
        user: Users,
        createdAt: Date 
    }
}
