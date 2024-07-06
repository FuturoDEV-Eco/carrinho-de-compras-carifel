const {Router} = require('express')
const ClientController = require('../controllers/ClientController')

const clientsRoutes = new Router()


clientsRoutes.post('/', ClientController.cadastrar.bind(ClientController))

module.exports = clientsRoutes

