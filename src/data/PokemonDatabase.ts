import { Pokemon } from "../business/entities/Pokemon";
import BaseDatabase from "./BaseDatabase";
import { TypeDatabase } from "./TypeDatabase";

const getType = new TypeDatabase()

export class PokemonDatabase extends BaseDatabase {

    async createPokemon(poke: Pokemon): Promise<void> {
        try {
            await BaseDatabase.connection
                .insert({
                    id: poke.id,
                    name: poke.name,
                    image: poke.image,
                    atack: poke.atack,
                    defense: poke.defense,
                    stat: poke.stat,
                })
                .into(BaseDatabase.POKEMON_TABLE)

            for (let typePokemon of poke.types) {
                await BaseDatabase.connection
                    .insert({
                        type_id: typePokemon,
                        pokemon_id: poke.id
                    })
                    .into(BaseDatabase.POKEMON_TYPE_TABLE)
            }

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async getAllPokemon(): Promise<Pokemon[]> {
        try {
           
            const result = await BaseDatabase.connection
                .select("*")
                .from(BaseDatabase.POKEMON_TABLE)
  
                const resultFinal = getType.getType(result)

                return resultFinal

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async getPokemonByProperty (key: string, value: string): Promise<Pokemon[]> {

        try {
            const result = await BaseDatabase.connection
            .select("*")
            .from(BaseDatabase.POKEMON_TABLE)
            .where(key, "like" ,`%${value}%`)
           
            const resultFinal = getType.getType(result)

            return resultFinal
                      
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    async getPokemonByType (typePok: string): Promise<Pokemon[]> {

        try {
            const result = await BaseDatabase.connection.raw(`
            SELECT type_id, name, image, atack, defense, stat 
            FROM ${BaseDatabase.POKEMON_TABLE}
            JOIN ${BaseDatabase.POKEMON_TYPE_TABLE}
            ON ${BaseDatabase.POKEMON_TABLE}.id = ${BaseDatabase.POKEMON_TYPE_TABLE}.pokemon_id 
            WHERE ${BaseDatabase.POKEMON_TYPE_TABLE}.type_id LIKE "%${typePok}%"            
        `)

        return result[0]
                      
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

     async getAllTypes(): Promise<String[]> {
        try {
           
            const result = await BaseDatabase.connection
                .select("*")
                .from(BaseDatabase.TYPE_TABLE)
                
                return result

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}