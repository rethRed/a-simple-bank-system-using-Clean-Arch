

export abstract class Entity<T> {
    protected id?: string

    constructor(
        public props: T
    ){}

    public setId(newId: string){
        this.id = newId
    }

    public getId(): string | undefined{
        return this.id
    }

    public getProps(): T{
        return {
            ...this.props,
            id: this.id
        }
    }
}