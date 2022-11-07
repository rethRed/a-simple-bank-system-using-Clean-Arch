import { describe, expect, it, test } from "vitest";
import { CreateUser, CreateUserInput, CreateUserOutput } from "@/application/usecases/users" 
import { InMemoryUsersRepository } from "@/tests/repositories"


type sutTypes = {
    usersRepository: InMemoryUsersRepository
    sut: CreateUser
}

const mockCreateUserData = (): CreateUserInput => {
    return {
        email: "batata@gmail.com",
        password: "12345678",
        username: "potato",
    }
} 

const makeSut = (): sutTypes => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new CreateUser(usersRepository)

    return {
        sut,
        usersRepository,
    }
}


describe("test create-user ", () => {

    test("return the correct informations of the created user", async () => {
        const { sut } = makeSut()

        const userData = mockCreateUserData()

        const createdUser = await sut.execute(userData)
        
        expect(createdUser).toBeTruthy()
        expect(createdUser.password).not.toEqual(userData)
        expect(createdUser.id).toBeDefined()
    })

})
