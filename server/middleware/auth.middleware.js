import jwt from "jsonwebtoken";

// This function protects routes that require admin access.
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization denied. No token provided." });
  }
  
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info (like ID) to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Authorization denied. Token is invalid." });
  }
};