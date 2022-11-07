import { IDepositMoneyRepository } from "@/application/repositories";
import { InMemoryRepository } from "@/core/domain/repository";
import { DepositMoney } from "@/domain/entities";

export class InMemoryDepositRepository extends InMemoryRepository implements IDepositMoneyRepository {

    public items: DepositMoney[] = []

    async insert(deposit: DepositMoney): Promise<DepositMoney>{
        const id = this.nextId().toString()
        deposit.setId(id)

        this.items.push(deposit)

        return deposit
    }



}