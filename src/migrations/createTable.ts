import BaseDatabase from "../data/BaseDatabase"

export class MySqlSetup extends BaseDatabase {

   static createTables = async () => {
      try {

         await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${BaseDatabase.POKEMON_TABLE} (
               id VARCHAR(255) PRIMARY KEY,
               name VARCHAR(255) NOT NULL,
               image VARCHAR(255) NOT NULL,
               atack VARCHAR(255) NOT NULL,
               defense VARCHAR(255) NOT NULL,
               stat VARCHAR(255) NOT NULL 
            );
           `)

         await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${BaseDatabase.TYPE_TABLE} (
               type ENUM("BUG","DARK", "DRAGON", "ELETRIC", "FAIRY", "FIGHTING", "FIRE", "FLYING", "GHOST", "GRASS", "GROUND", "ICE", "NORMAL", "POISON", "PSYCHIC", "ROCK", "STEEL", "WATER") PRIMARY KEY 
            ); 
           `)

         await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${BaseDatabase.POKEMON_TYPE_TABLE} (
               type_id ENUM("BUG","DARK", "DRAGON", "ELETRIC", "FAIRY", "FIGHTING", "FIRE", "FLYING", "GHOST", "GRASS", "GROUND", "ICE", "NORMAL", "POISON", "PSYCHIC", "ROCK", "STEEL", "WATER") NOT NULL,
               pokemon_id VARCHAR(255) NOT NULL,
               FOREIGN KEY(type_id) REFERENCES ${BaseDatabase.TYPE_TABLE}(type),
               FOREIGN KEY(pokemon_id) REFERENCES ${BaseDatabase.POKEMON_TABLE}(id) ON DELETE CASCADE
            ); 
           `)

         console.log("MySql setup completed!")

      } catch (error) {
         console.log(error)

      } finally {
         BaseDatabase.connection.destroy()
      }
   }
}

MySqlSetup.createTables()