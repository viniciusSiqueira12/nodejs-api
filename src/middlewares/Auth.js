const jwt = require('jsonwebtoken'); 

const auth = (req, res, next) => {
 
    let token = req.headers['x-access-token'] || req.headers['authorization'];
  
    if(!token) 
        return res.status(401).json({Mensagem : 'Autorização negada, por favor, informe o Token!'});

    if (token.toString().startsWith('Bearer ')) {
        token = token.slice(7, token.toString().length);
    } 

    if(token) {
        jwt.verify(token, '@nodeapi', (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    Mensagem: 'Token Inválido!'
                });
            }
            else {
                res.locals.auth_data = decoded;
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.json({
            success: false,
            Mensagem: 'Por favor, informe o token para continuar'
        })
    }
}

module.exports = auth;