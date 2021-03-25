/******************** IMPORTS ********************/ 
import dotenv from "dotenv"
import knex from "knex"
import Knex from "knex"


/******************** CONFIG ********************/ 
dotenv.config()


export default class BaseDatabase {

    protected static POKEMON_TABLE = "pokemons"
    protected static TYPE_TABLE = "types"
    protected static POKEMON_TYPE_TABLE = "pokemons_types"
  
    protected static connection: Knex = knex({
       client: "mysql",
       connection: {
          host: process.env.DB_HOST,
          port: 3306,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
       },
    });
 
    public static async destroyConnection(): Promise<void> {
       await BaseDatabase.connection.destroy();
    }
}