import { IUsersRepository } from "@/application/repositories";
import { InMemoryRepository } from "@/core/domain/repository";
import { Users } from "@/domain/entities";



export class InMemoryUsersRepository extends InMemoryRepository implements IUsersRepository {

    public items: Users[] = []

    async insert(user: Users): Promise<Users>{
        const id = this.nextId().toString()
        user.setId(id)
        this.items.push(user)

        return user
    }

    async findById(id: any): Promise<Users | null> {
        const user = this.items.find(user => {
            if(user.getId() == id){
                return user
            }
        })

        return user ? user : null

    }


}
