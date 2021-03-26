import { PokemonDatabase } from "../data/PokemonDatabase"
import { IdGenerator } from "../services/IdGenerator"
import { createPokemonInput, Pokemon } from "./entities/Pokemon"
import { CustomError } from "./error/CustomError"

export class PokemonBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private pokemonDatabase: PokemonDatabase
    ) {}

    async createPokemon (input: createPokemonInput) {
        
        try {
            const { name, image, atack, defense, stat, types } = input
            
            if(!name || !image || !atack || !defense || !stat || !types) {
                throw new CustomError(405, "Please fill in all fields")
            }
            
            const pokes = await this.pokemonDatabase.getAllPokemon()
           
            const pokesAlreadyExist = pokes && pokes.find(poke => poke.name === name)

            if(pokesAlreadyExist) {
                throw new CustomError(422, "Pokemon already registered")
            }   

            const id: string = this.idGenerator.generate()

            const pokeCreate = new Pokemon(
                id, 
                name,
                image,
                atack,
                defense,
                stat,
                types
            )

            await this.pokemonDatabase.createPokemon(pokeCreate)

            return pokeCreate

        } catch (error) {
            throw new CustomError(error.statusCode || 400, error.message)
        }
    }

    async getAllPokemons () {

        try {
            
            const result = await this.pokemonDatabase.getAllPokemon()

            return result 

        } catch (error) {
            throw new CustomError(error.statusCode || 400, error.message)
        }
    }

    async getPokemonByNameOrTypes (name: string, type: string) {

        try {
                       
            if(!name && !type){
                throw new CustomError(406, "Please inform 'name' or type")
            }

            let result
            
            if (name) {
               result = await this.pokemonDatabase.getPokemonByProperty("name", name)
            } else if(type){
                result = await this.pokemonDatabase.getPokemonByType(type)
            }
            
            if(!result){
                throw new CustomError(404, "Name or type not found")
            }

            return result

        } catch (error) {
                throw new CustomError(error.statusCode || 400, error.message)
        }
    }

    async getAllTypes () {

        try {
            
            const result = await this.pokemonDatabase.getAllTypes()

            return  result 

        } catch (error) {
            throw new CustomError(error.statusCode || 400, error.message)
        }
    }
}
