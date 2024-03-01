const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json(err);
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).send({ message: "Invalid token." });
  }
};
const authorizeWorker = (req, res, next) => {
  if (req.user.isWorker) {
    return res
      .status(403)
      .json({ message: "Access denied. User is not an Hendicap." });
  }
  next();
};

module.exports = { authenticateToken, authorizeWorker };
