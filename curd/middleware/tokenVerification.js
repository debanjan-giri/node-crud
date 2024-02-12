import jwt from "jsonwebtoken";

// token verification middleware
const tokenVerification = async (req, res, next) => {
  try {
    // getting user token
    const clientToken =
      req.headers["authorization"] || req.query.token || req.cookies.token;

    // Check if token exists
    if (!clientToken) {
      throw new Error("Access denied. Token not provided.");
    }

    jwt.verify(clientToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new Error("Failed to authenticate token");
      }

      // pass this token to next middleware through req obj
      // access data through => decodedToken,{tokenId : username}
      req.decodedToken = decoded;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export default tokenVerification;
