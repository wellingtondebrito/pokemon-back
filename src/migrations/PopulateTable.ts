import BaseDatabase from "../data/BaseDatabase"
import { MySqlSetup} from "./createTable"

export class PopulateTable extends MySqlSetup {

    static populateTypes = async () => {
        try {

            await BaseDatabase.connection.raw(`
              INSERT INTO ${BaseDatabase.TYPE_TABLE}(type)
               VALUES 
               ("BUG"),
               ("DARK"),
               ("DRAGON"),
               ("ELETRIC"),
               ("FAIRY"),
               ("FIGHTING"),
               ("FIRE"),
               ("FLYING"),
               ("GHOST"), 
               ("GRASS"), 
               ("GROUND"), 
               ("ICE"), 
               ("NORMAL"), 
               ("POISON"), 
               ("PSYCHIC"), 
               ("ROCK"), 
               ("STEEL"), 
               ("WATER");
            `)

            console.log("Populate table completed!")

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)

        } finally {
            BaseDatabase.connection.destroy()
        }
    }
}

PopulateTable.populateTypes()