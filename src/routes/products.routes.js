const {Router} = require('express')
const ProductController = require('../controllers/ProductController')

const productsRoutes = new Router()

productsRoutes.post('/', ProductController.cadastrar.bind(ProductController))

module.exports = productsRoutes