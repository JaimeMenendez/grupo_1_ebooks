function recuerdame(req, res,next) {
    if(req.cookies && req.cookies.userLogged){
        req.session.userLogged = req.cookies.userLogged;
    }
    next()
}

module.exports = recuerdame