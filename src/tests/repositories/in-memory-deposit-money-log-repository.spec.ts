import { describe, expect, it, test } from "vitest";
import { CreateUser, CreateUserInput } from "@/application/usecases/users" 
import { DepositMoneyUseCase } from "@/application/usecases/money-manegement" 
import { InMemoryUsersRepository, InMemoryDepositRepositoryLog } from "@/tests/repositories"


type sutTypes = {
    sut: InMemoryDepositRepositoryLog,
    createUserRepo: InMemoryUsersRepository ,
    createUser: CreateUser,
    createDeposit: DepositMoneyUseCase
}


const makeSut = (): sutTypes => {
    const createUserRepo = new InMemoryUsersRepository()
    const createUser = new CreateUser(createUserRepo)

    const sut = new InMemoryDepositRepositoryLog()
    const createDeposit = new DepositMoneyUseCase(createUserRepo)


    return {
        sut,
        createUser,
        createDeposit,
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

describe("test deposit-repository ", () => {

    // it("should insert a deposit", async () => {

    //     const { sut, createDeposit, createUser, createUserRepo } = makeSut()

    //     const createdUser = await createUser.execute(mockCreateUserData())
    //     const user = await createUserRepo.findById(createdUser.id)

    //     if(user){
            
    //         const deposit = await createDeposit.execute({
    //             value: 1,
    //             user: user
    //         })
    //     }

    //     expect(sut.items).toHaveLength(1)
    // })

    test("the indexing should be following a sequence", async () => {

        const { sut, createDeposit, createUser, createUserRepo } = makeSut()

        const createdUser = await createUser.execute(mockCreateUserData())
        const user = await createUserRepo.findById(createdUser.id)

        if(user){
            
            var deposit1 = await createDeposit.execute({
                value: 1,
                user: user
            })
    
            var deposit2 = await createDeposit.execute({
                value: 3,
                user: user
            })

            

        }else {
            throw new Error("user not found")
        }

    })


})

