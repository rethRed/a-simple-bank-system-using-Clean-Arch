import { DepositRepositoryLog } from "@/application/repositories";
import { InMemoryRepository } from "@/core/domain/repository";
import { DepositMoney } from "@/domain/entities";

export class InMemoryDepositRepositoryLog extends InMemoryRepository implements DepositRepositoryLog {

    public items: DepositMoney[] = []

    async insert(deposit: DepositMoney): Promise<DepositMoney>{
        const id = this.nextId().toString()
        deposit.setId(id)

        this.items.push(deposit)

        return deposit
    }



}