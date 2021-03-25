import express, { Express } from "express"
import cors from "cors"
import { AddressInfo } from "net";
import { pokemonRouter } from "./controller/router/pokemonRouter";

const app: Express = express()
app.use(express.json())
app.use(cors())

app.use("/pokemon", pokemonRouter)


const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server running on http://localhost:${address.port}`);
    } else {
       console.error(`Failed to run the server.`)
    }
})