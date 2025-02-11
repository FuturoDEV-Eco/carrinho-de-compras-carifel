const Database = require("../database/connection");

class ClientController extends Database{

    async cadastrar(request,response){
        try{
            const dados = request.body

            if(!dados.name || !dados.email || !dados.cpf || !dados.contact){
                return response.status(400).json({
                    mensagem: "Nome, CPF, E-mail e Contato são obrigatórios",
                })
                
            }
            const check_client = await this.conexao.query(`
                select * from clients where cpf = $1 or email = $2
                `, [dados.cpf, dados.email])
            
                if(check_client.rowCount != 0){
                    return response.status(400).json({
                        message: "CPF ou Email já cadastrados!"
                    })
                }
           

            const clients = await this.conexao.query(`
                insert into clients(name, email, cpf, contact)
                values($1, $2, $3, $4) returning *
                `, [dados.name, dados.email, dados.cpf, dados.contact])
               
                response.status(201).json(clients.rows[0])
        }catch(error){
            response.status(500).json({ mensagem: "Não foi possível cadastrar o cliente!"})
        }
    }
}
    module.exports = new ClientController()