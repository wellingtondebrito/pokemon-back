import { Pokemon, type } from "../business/entities/Pokemon";
import BaseDatabase from "./BaseDatabase";


export class TypeDatabase extends BaseDatabase {

    async getType (result: any) {

        const typePokemon: Pokemon[] = []

            for (let pokeType of result) {

                const categories: type[] = []; 

                const resultTypes = await BaseDatabase.connection.raw(`
                    SELECT type_id
                    FROM ${BaseDatabase.POKEMON_TABLE}
                    JOIN ${BaseDatabase.POKEMON_TYPE_TABLE}
                    ON ${BaseDatabase.POKEMON_TABLE}.id = ${BaseDatabase.POKEMON_TYPE_TABLE}.pokemon_id 
                    WHERE ${BaseDatabase.POKEMON_TABLE}.id = "${pokeType.id}"            
                `)
                for (let typ of resultTypes[0]) {
                    categories.push(typ.type_id)
                }
                typePokemon.push({
                    id: pokeType.id,
                    name: pokeType.name,
                    image: pokeType.image,
                    atack: pokeType.atack,
                    defense: pokeType.defense,
                    stat: pokeType.stat,
                    types: categories
                });
            }
            return typePokemon
    }
}