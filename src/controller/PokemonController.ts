import { Request, Response } from "express"
import { createPokemonInput } from "../business/entities/Pokemon";
import { PokemonBusiness } from "../business/PokemonBusiness";
import { PokemonDatabase } from "../data/PokemonDatabase";
import { IdGenerator } from "../services/IdGenerator"

const pokemonBusiness = new PokemonBusiness(
    new IdGenerator(), 
    new PokemonDatabase()
)

export class PokemonController {

    async createPokemon(req: Request, res: Response) {

        try {

            const input: createPokemonInput = {
                name: req.body.name,
                image: req.body.image,
                atack: req.body.atack,
                defense: req.body.defense,
                stat: req.body.stat,
                types: req.body.types
            }

            const pokeCreate = await pokemonBusiness.createPokemon(input)

            res.status(201).send({ message: "Pokemon created successfully!", pokeCreate})
            
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }

    async getAllPokemons(req: Request, res: Response) {

        try {

            const result = await pokemonBusiness.getAllPokemons()

            res.status(201).send({ message: "All pokemons", result })
            
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }

    async getPokemonByName(req: Request, res: Response) {

        try {

            const name = req.query.name as string

            const type = req.query.type as string
            
            const result = await pokemonBusiness.getPokemonByNameOrTypes(name, type)

            res.status(201).send({ message: "Selected music", result })
            
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }

    async getAllTypes(req: Request, res: Response) {

        try {

            const result = await pokemonBusiness.getAllTypes()

            res.status(201).send({ message: "All types", result })
            
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }
}    
