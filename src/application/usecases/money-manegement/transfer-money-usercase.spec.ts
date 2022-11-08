import { InMemoryUsersRepository } from "@/tests/repositories"
import { describe, expect, it } from "vitest"
import { CreateUser, CreateUserInput } from "../users"
import { DepositMoneyUseCase } from "./deposit-money-usecase"
import { TransferMoneyUseCase } from "./transfer-money-usercase"


type sutTypes = {
    createUserRepo: InMemoryUsersRepository ,
    createUser: CreateUser,
    deposit: DepositMoneyUseCase,
    sut: TransferMoneyUseCase,
}


const makeSut = (): sutTypes => {
    const createUserRepo = new InMemoryUsersRepository()

    const deposit = new DepositMoneyUseCase(createUserRepo)
    const createUser = new CreateUser(createUserRepo)
    const sut = new TransferMoneyUseCase(createUserRepo)


    return {
        sut,
        createUser,
        createUserRepo,
        deposit
    }
}

const mockCreateUserData = (): CreateUserInput => {
    return {
        email: "batata@gmail.com",
        password: "12345678",
        username: "potato",
    }
} 

describe("test transfer money", () =>{

    it("should transfer", async () => {
        const { sut, deposit, createUser, createUserRepo } = makeSut()

        const createdUserFrom = await createUser.execute(mockCreateUserData())
        const createdUserTo = await createUser.execute(mockCreateUserData())

        
        const from = await createUserRepo.findById(createdUserFrom.id)
        const to = await createUserRepo.findById(createdUserTo.id)
        
        
        if(from && to ){
            
            deposit.execute({user: from, value: 50})
            
            sut.execute({
                from,
                to,
                value: 10
            })
            
            expect(from.getProps().balance).toBe(40)
            expect(to.getProps().balance).toBe(10)
            

        }else {
            throw new Error("user not found")
        }
    })

})
