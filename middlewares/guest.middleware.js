function guestMiddleware(req, res,next) {
    if(req.session.userLogged){
        res.redirect('/users/')
    }
    next()
}

module.exports = guestMiddleware