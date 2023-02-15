import { Error } from "../error/Error";
import jwt from "jsonwebtoken";
import { UserRepository } from "../models/UserRepository";

export const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) return res.status(Error.AUTH_ERROR.status).json(Error.AUTH_ERROR);

  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.SECRET_KEY,
    async (error, decoded) => {
      if (error) return res.status(Error.AUTH_ERROR.status).json(Error.AUTH_ERROR);
      const user = await UserRepository.findByNo(decoded.no);
      if (!user) return res.status(Error.AUTH_ERROR.status).json(Error.AUTH_ERROR);
      req.u_no = user.u_no;
      next();
    }
  );
};
