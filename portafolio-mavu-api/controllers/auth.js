const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const config = require('../config/dev')

//Auth middleware
exports.checkJwt = jwt({
    secret:jwks.expressJwtSecret({
        cache:true,
        rateLimit:true,
        jwksRequestsPerMinute:10,
        jwksUri:'https://mavuportfolio.us.auth0.com/.well-known/jwks.json'
    }),
    audience:'https://mavuportfolio.us.auth0.com/api/v2/',
    issuer:'https://mavuportfolio.us.auth0.com/',
    algorithms:['RS256']
});


exports.checkRole = role => (req, res, next) => {
    const user = req.user;
    if (user && user[config.AUTH0_NAMESPACE + '/roles'].includes(role)) {
      next();
    } else {
      return res.status(401).send('You are not authorized to access this resource!')
    }
  }