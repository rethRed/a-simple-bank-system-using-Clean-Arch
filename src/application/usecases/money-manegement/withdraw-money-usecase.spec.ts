import { describe, expect, it, test } from "vitest";
import { CreateUser, CreateUserInput } from "@/application/usecases/users" 
import { WithDrawMoneyUseCase, DepositMoneyUseCase } from "@/application/usecases/money-manegement" 
import { InMemoryUsersRepository, InMemoryDepositRepositoryLog } from "@/tests/repositories"


type sutTypes = {

    createUserRepo: InMemoryUsersRepository ,
    createUser: CreateUser,
    sut: WithDrawMoneyUseCase
}


const makeSut = (): sutTypes => {
    const createUserRepo = new InMemoryUsersRepository()
    const createUser = new CreateUser(createUserRepo)
    
    const sut = new WithDrawMoneyUseCase(createUserRepo)


    return {
        sut,
        createUser,
        createUserRepo
    }
}

const mockCreateUserData = (): CreateUserInput => {
    return {
        email: "batata@gmail.com",
        password: "12345678",
        username: "potato",
    }
} 

describe("test deposit-usecase", () => {

    it("should throw an error when withdraw more money than the user has", async () => {

        const { sut, createUser, createUserRepo } = makeSut()

        const createdUser = await createUser.execute(mockCreateUserData())
        const user = await createUserRepo.findById(createdUser.id)

        if(user){
            
            const promise = sut.execute({
                value: 1,
                user: user
            })

            expect(promise).rejects.toThrow()


        }else{
            throw new Error("user not found")
        }

    })

    it("should remove 5 from the balance", async () => {

        const { sut, createUser, createUserRepo } = makeSut()

        const depositMoney = new DepositMoneyUseCase(createUserRepo)

        const createdUser = await createUser.execute(mockCreateUserData())
        const user = await createUserRepo.findById(createdUser.id)

        if(user){

            await depositMoney.execute({
                user,
                value: 10
            })
            
            await sut.execute({
                value: 5,
                user: user
            })

            expect(user.getProps().balance).toBe(5)


        }else{
            throw new Error("user not found")
        }

    })


})
