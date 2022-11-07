import { DepositMoney, Users } from "@/domain/entities"

export interface DepositRepositoryLog {
    insert(depositMoneyEntity: DepositMoney): Promise<DepositMoney>
}



export namespace DepositRepositoryLog{

    export type DepositMoneyOutput = {
        value: number,
        user: Users,
        createdAt: Date 
    }
}
