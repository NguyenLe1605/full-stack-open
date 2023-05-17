const jwt = require("jsonwebtoken");
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted id" });
  }

  if (error.name === "JsonWebTokenError") {
    if (error.message === "jwt must be provided") {
      return response.status(401).json({ error: error.message });
    }
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  request.user = decodedToken;
  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
};
