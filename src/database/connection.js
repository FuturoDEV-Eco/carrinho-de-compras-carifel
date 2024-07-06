const { Pool } = require('pg');

class Database {
    constructor() {
        this.conexao = new Pool({
            user: 'postgres',     
            host: 'localhost',        
            database: 'Carrinho_Compras',  
            password: 'Cheiro_11',     
            port: 5432,                
        });
    }
}
module.exports = Database