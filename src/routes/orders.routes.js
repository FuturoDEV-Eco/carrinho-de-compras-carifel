const { Router} = require('express')
const OrderController = require('../controllers/OrderController')


const ordersRoutes = new Router()

ordersRoutes.post('/', OrderController.criar.bind(OrderController))

module.exports = ordersRoutes