const { Pool } = require('pg');

class Database {
    constructor() {
        this.database = new Pool({
            user: 'postgres',     
            host: 'localhost',        
            database: 'Carrinho_Compras',  
            password: 'Cheiro_11',     
            port: 5432,                
        });
    }
}
module.exports = Database