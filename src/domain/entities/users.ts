import { Entity } from "@/core/domain/entity"


export type UserProps = {
    id?: string
    username: string
    email: string
    password: string
    balance: number
}

export type userPropsCreate = {
    username: string
    email: string
    password: string
}

export class Users extends Entity<UserProps>{

    constructor(props: UserProps){
        super(props)
    }

    static create(props: userPropsCreate){

        const newUser = new Users({
            ...props,
            balance: 0
        })

        return newUser
    }

    public depositMoney(value: number){
        this.props.balance += value
    }

    public withdrawMoney(value: number){

        const currentBalance = this.props.balance

        if(value > currentBalance){
            throw new Error("You can't withdraw more money than you have. ")
        }
        
        this.props.balance -= value
    }



}