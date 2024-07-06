const Database = require("../database/connection");

class ProductController extends Database{

    async cadastrar(request, response){
        try{
            const dados = request.body

       console.log(dados)

            if(!dados.name || !dados.category_id){
                return response.status(400).json({
                    mensagem: "O nome e a categoria do produto são obrigatórios",
                })
        }
        const check_product = await this.conexao.query(`
            select * from products where amount = $1 
            `, [dados.amount])
            
                if(check_product.rowCount != 0){
                    return response.status(400).json({
                        message: "Quantidade já cadastrada!"
                    })
                }
                const products = await this.conexao.query(`
                    insert into products(name, amount, color, voltage, description, category_id, price)
                    values($1, $2, $3, $4, $5, $6, $7) returning *
                    `, [dados.name, dados.amount, dados.color, dados.voltage, dados.description, dados.category_id, dados.price])
                 
                    response.status(201).json(products.rows[0])
            }catch(error){
                response.status(500).json({ mensagem: "Não foi possível cadastrar o produto!"})
            }
        }
    }
        module.exports = new ProductController()