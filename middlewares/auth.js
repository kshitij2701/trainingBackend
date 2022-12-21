import jwt from "jsonwebtoken";

const secret = "test";

const auth = async (req, res, next) => {
  try {
    // "Bearer bjbjhbjhsdbckjshidcs9dc8sdc9ds"
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      let decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;