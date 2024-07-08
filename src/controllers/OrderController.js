const Database = require("../database/connection");

class OrderController extends Database{
 
    //Criação do pedido
    async criar(request,response){
        try{
            const dados = request.body

            if(!dados.client_id || !dados.address || dados.products[0].amount || !dados.products){
                return response.status(400).json({
                    mensagem: "ID do cliente, endereço, quantidade e produto são obrigatórios."
                })               
            }

            let total = 0;

            //cálculo do total do pedido
            for(let i = 0; i < dados.products.length; i++){
                const item = dados.products[i];   
                const produtoAtual = await this.conexao.query(`
                    select price from products
                    where id = $1
                    `, [item.product_id])
                    total = total + (produtoAtual.rows[0].price * item.amount)                     
            }

            
        // insere o pedido 
        const meuPedido = await this.conexao.query(`
            Insert into orders (client_id, address, observations, total)
            values ($1,$2,$3,$4)
            returning *
            `, [dados.client_id, dados.address, dados.observations, total])

         // insere os items
         dados.products.forEach(async item => {
            const produtoAtual = await this.conexao.query(`
                Select price from products 
                where id = $1
                `, [item.product_id])

            this.conexao.query(`
                Insert into orders_items (order_id, product_id, amount, price)
                values ($1,$2,$3,$4)
                returning *
                `, [
                meuPedido.rows[0].id,
                item.product_id,
                item.amount,
                produtoAtual.rows[0].price
            ])
        })
      
        response.status(201).json({mensagem: 'Pedido criado com sucesso!'})
    
        }catch(error){
        response.status(500).json({ mensagem: "Não foi possível criar o pedido!"})
    
        }
  
    }
}
module.exports = new OrderController()