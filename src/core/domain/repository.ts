export class InMemoryRepository{

    private currentId: number = 0

    protected nextId(){
        this.currentId++
        return this.currentId
    }

    protected getCurrentId(){
        return this.currentId
    }

}