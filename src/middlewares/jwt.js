const jwt = require('../helpers/jwt')

function tokenMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(401).json({Error:"Token not specified"})
  const data = jwt.verifyToken(token)
  req.user=data
  next()
}

module.exports=tokenMiddleware
