import { describe, expect, it, test } from "vitest";
import { CreateUser, CreateUserInput } from "@/application/usecases/users" 
import { DepositMoneyUseCase } from "@/application/usecases/money-manegement" 
import { InMemoryUsersRepository, InMemoryDepositRepository } from "@/tests/repositories"


type sutTypes = {
    depositRepo: InMemoryDepositRepository,
    createUserRepo: InMemoryUsersRepository ,
    createUser: CreateUser,
    sut: DepositMoneyUseCase
}


const makeSut = (): sutTypes => {
    const createUserRepo = new InMemoryUsersRepository()
    const createUser = new CreateUser(createUserRepo)

    const depositRepo = new InMemoryDepositRepository()
    const sut = new DepositMoneyUseCase(depositRepo)


    return {
        sut,
        createUser,
        depositRepo,
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

    it("should credit money to the user", async () => {

        const { sut, createUser, createUserRepo } = makeSut()

        const createdUser = await createUser.execute(mockCreateUserData())
        const user = await createUserRepo.findById(createdUser.id)

        if(user){
            
            const deposit = await sut.execute({
                value: 1,
                user: user
            })

            expect(user.getProps().balance).toBe(1)
            expect(deposit.value).toBe(1)

        }else{
            throw new Error("user not found")
        }

       
    })


})
