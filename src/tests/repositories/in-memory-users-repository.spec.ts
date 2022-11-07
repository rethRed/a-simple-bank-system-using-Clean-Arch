import { describe, expect, it } from "vitest";
import { CreateUser, CreateUserInput } from "@/application/usecases/users" 
import { InMemoryUsersRepository } from "@/tests/repositories"


type sutTypes = {
    sut: InMemoryUsersRepository
    createUser: CreateUser
}

const mockCreateUserData = (): CreateUserInput => {
    return {
        email: "batata@gmail.com",
        password: "12345678",
        username: "potato",
    }
} 

const makeSut = (): sutTypes => {
    const sut = new InMemoryUsersRepository()
    const createUser = new CreateUser(sut)

    return {
        sut,
        createUser,
    }
}

describe("test users-repository ", () => {

    it("should insert a user", async () => {

        const { sut, createUser } = makeSut()
        await createUser.execute(mockCreateUserData())

        expect(sut.items).toHaveLength(1)
    })

    it("should be able to index multiple users in sequence", async () => {

        const { createUser } = makeSut()
        const user_1 = await createUser.execute(mockCreateUserData())
        const user_2 = await createUser.execute(mockCreateUserData())

        expect(user_1.id).toBe("1")
        expect(user_2.id).toBe("2")
    })

    it("should find the id by id", async () => {

        const { createUser, sut } = makeSut()
        const user_1 = await createUser.execute(mockCreateUserData())

        const foundUser = await sut.findById(user_1.id)

        expect(foundUser).toBeTruthy()

    })

})

