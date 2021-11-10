const express = require('express')
const engine = require('ejs-mate')
const path = require('path')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')

//INITIALIZATIONS
const app = express()
require('./db/database')
require('./passport/local-auth')

//SETTINGS
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 3000)

//MIDDLEWARES
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: 'mySecretSession',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage')
    app.locals.signinMessage = req.flash('signinMessage')
    app.locals.user = req.user
    console.log(app.locals);
    
    next()
})

//ROUTES
app.use('/', require('./routes/routes'))

//STARTING SERVER
app.listen(app.get('port'), () => {
    console.log('Server is running on port ', app.get('port'))   
})