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
               stat VARCHAR(255) NOT NULL,
               type1 VARCHAR(255) NOT NULL,
               type2 VARCHAR(255) NULL
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