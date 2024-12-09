import jwt from "jsonwebtoken";

const isAuthentic = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  try {
    if (!authHeader) {
      return res.status(400).json("Unauthorized request");
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(400).json("melformed token");
    }
    const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedInfo) {
      return res.status(400).json("Unauthorized request");
    }
    req.user = decodedInfo.id;
    next();
  } catch (error) {
    return res.json({ error: error.message });
  }
};

export default isAuthentic;
