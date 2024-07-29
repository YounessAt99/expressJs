const jwt = require("jsonwebtoken");
// midlwer bach nchado mn token payloud lifih data wnqarno biha

function verify(req, res, next) {
  const token = req.headers.token;

  if (token) {
    const decode = jwt.verify(token, process.env.JWT_CLE);
    req.id = decode.id;
    next();
  } else {
    res.status(401).json({ message: "no token" });
  }
}

function verifyIsAdmin(req, res, next) {
  const token = req.headers.token;

  if (token) {
    const decode = jwt.verify(token, process.env.JWT_CLE);
    req.isAdmin = decode.isadmin;
    next();
  } else {
    res.status(401).json({ message: "no token" });

  }
}

module.exports ={verify,verifyIsAdmin} ;
