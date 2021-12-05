const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./src/db.json')
const middlewares = jsonServer.defaults({
    noCors: true
})
const fs = require('fs');


const PORT = process.env.PORT || 3001;
const db = JSON.parse(fs.readFileSync('./src/db.json')) // !!! TODO


server.use(middlewares)

// server.use(jsonServer.bodyParser)
// server.post('/register', (req, res, next) => {
//     if (req.body && req.body.email && db.users.filter(user => user.email === req.body.email).length > 0) {
//         return res.status(400).json({
//             message: 'Такой email уже зарегистрирован'
//         })
//     }

//     res.status(201).json({
//         message: 'Пользователь создан'
//     })

// })

// server.post('/login', (req, res, next) => {
//     if (req &&
//         req.body &&
//         db.users.filter(user => user.email === req.body.email)[0]?.password !== req.body?.password) {
//         return res.status(400).json({
//             message: 'Неверный пароль'
//         })
//     }

//     res.status(200)
//     next()

// })


server.use(router)
server.listen(PORT, () => {
    console.log('JSON Server is running')
})