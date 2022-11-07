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

    async save(user: Users): Promise<void>{
        
        const index = this.items.findIndex(curUser => {
            return curUser.getId() == user.getId()
            
        })

        if(index < 0){
            throw new Error("user not found "+index)
        }

        this.items[index] = user
    }

    async listAll(): Promise<Users[]> {
        return this.items
    }

}
