const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', (req, res, next) => {
    res.render('index')
})

router.get('/signup', (req, res, next) => {
    res.render('signup')
})

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}))

router.get('/signin', (req, res, next) => {
    res.render('signin')
})

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}))

router.get('/logout', (req, res, next) => {
    req.logout()
    res.redirect('/')
})
//Protegemos todas las rutas que van por debajo con el método "isAuthenticated" 
router.use((req, res, next) => {
    isAuthenticated(req, res, next)
    next()
})
//También podemos poner "isAuthenticated" directamente en la ruta
router.get('/profile', isAuthenticated, (req, res ,next) => {
    res.render('profile')
})

router.get('/dashboard', (req, res, next) => {
    res.send('dashboard')
})

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}


module.exports = router