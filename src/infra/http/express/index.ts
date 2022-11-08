import { DepositMoneyUseCase, TransferMoneyUseCase, WithDrawMoneyUseCase } from "@/application/usecases/money-manegement"
import { CreateUser } from "@/application/usecases/users"
import { ListAllUsersUserCase } from "@/application/usecases/users"
import { InMemoryUsersRepository } from "@/tests/repositories"
import express, { Express, json, Request, Response } from "express"

const PORT: number = 5000

const app: Express = express()
app.use(express.json())

const  userRepo = new InMemoryUsersRepository()

app.post("/create", async (req: Request, res: Response) => {

    const { username, email, password } = req.body

    if(!username || !email || !password){
        return res.json({msg: "required inputs not provided"})
    }

    const createUser = new CreateUser(userRepo)

    const newUser = await createUser.execute({
        username,
        email,
        password
    })


    return res.status(201).json({newUser: newUser})

})


app.post("/deposit", async (req: Request, res: Response) => {
    const { id, value } = req.body

    if(!id|| !value ){
        return res.json({msg: "required inputs not provided"})
    }

    if(typeof value != "number"){
        return res.status(400).json({msg:"value must be a number"})
    }

    const user =  await userRepo.findById(id)

    if(!user){
        return res.json({msg: `user of id ${id} not found`})
    }

    const deposit = new DepositMoneyUseCase(userRepo)

    await deposit.execute({
        user,
        value
    })

    return res.json({
        msg: `deposit of value ${value} was credit to the user ${user.getProps().username}`
    })
})


app.post("/withdraw", async (req: Request, res: Response) => {
    const { id, value } = req.body

    if(!id|| !value ){
        return res.json({msg: "required inputs not provided"})
    }

    if(typeof value != "number"){
        return res.status(400).json({msg:"value must be a number"})
    }

    const user =  await userRepo.findById(id)

    if(!user){
        return res.json({msg: `user of id ${id} not found`})
    }

    const deposit = new WithDrawMoneyUseCase(userRepo)

    await deposit.execute({
        user,
        value
    })

    return res.json({
        msg: `Value of ${value} was debited from user ${user.getProps().username}`
    })
})

app.post("/transfer", async (req: Request, res: Response) => {
    const { from, to, value } = req.body

    if(!from|| !to || !value ){
        return res.json({msg: "required inputs not provided"})
    }

    if(typeof value != "number"){
        return res.status(400).json({msg:"value must be a number"})
    }
    
    const fromUser =  await userRepo.findById(from)
    if(!fromUser){
        return res.json({msg: `user of id ${from} not found`})
    }

    const toUser = await userRepo.findById(to)
    if(!toUser){
        return res.json({msg: `user of id ${to} not found`})
    }

    const transfer = new TransferMoneyUseCase(userRepo)

    try{
        await transfer.execute({
            from: fromUser,
            to: toUser,
            value
        })

    }catch(err: any){
        console.log(err)
        return res.json({error: err.message})
    }

    return res.json({
        msg: `Value of ${value} was transferred from user ${fromUser.getProps().username} to user ${toUser.getProps().username}`
    })
})

app.get("/all", async (req: Request, res: Response) => {
    const allUsers = new ListAllUsersUserCase(userRepo)

    const listedUsers = await allUsers.execute()

    return res.json({
        users: listedUsers
    })
})



app.listen(PORT, () => console.log(`server is running on port ${PORT}`))