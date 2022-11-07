import { describe, expect, it, test } from "vitest";
import { CreateUser, CreateUserInput } from "@/application/usecases/users" 
import { DepositMoneyUseCase } from "@/application/usecases/money-manegement" 
import { InMemoryUsersRepository, InMemoryDepositRepositoryLog } from "@/tests/repositories"


type sutTypes = {
    depositRepo: InMemoryDepositRepositoryLog,
    createUserRepo: InMemoryUsersRepository ,
    createUser: CreateUser,
    sut: DepositMoneyUseCase
}


const makeSut = (): sutTypes => {
    const createUserRepo = new InMemoryUsersRepository()
    const createUser = new CreateUser(createUserRepo)
    
    const depositRepo = new InMemoryDepositRepositoryLog()
    const sut = new DepositMoneyUseCase(createUserRepo)


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

            createUserRepo.save(user)

            expect(user.getProps().balance).toBe(1)


        }else{
            throw new Error("user not found")
        }

       
    })


})
