import express from "express"
import { PokemonController } from "../PokemonController"

export const pokemonRouter = express.Router()

const pokemonController = new PokemonController()

pokemonRouter.post("/create", pokemonController.createPokemon)
pokemonRouter.get("/", pokemonController.getAllPokemons)
pokemonRouter.get("/search", pokemonController.getPokemonByName)
