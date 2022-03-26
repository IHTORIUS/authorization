const Router = require('express')
const router = new Router
const controller = require('./authController')
const {check} = require("express-validator")
const authMiddleWare = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')
const boom = require('boom')

router.post('/registration', [
    check('username', "Имя пользователя не может пыть таким!").notEmpty(),
    check('password',"Количество символов пароля от 4 до 10").isLength({min:4,max:10})
], controller.registration)

router.post('/login', controller.login)
router.get('/users', roleMiddleware(['USER', 'ADMIN']), controller.getUsers)


router.use('/test',(req,res)=>{
    throw boom.badRequest("Пошел на хуй!");
})

router.use((err, req,res,next)=>{
    const status = err.output.statusCode || 404 
    console.log(err);
    res.status(status).json({message:err.message})
})

router.use((req,res)=>{
    res.status(404).json({message:"Страница не найдена"})
})

module.exports = router