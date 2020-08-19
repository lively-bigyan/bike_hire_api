/* eslint-disable max-len */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  errorMessage, status,
} from '../helpers/status';


dotenv.config();

/**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */

const verifyToken = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    errorMessage.error = 'Token not provided';
    return res.status(status.bad).send(errorMessage);
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = {
      email: decoded.email,
      user_id: decoded.user_id,
      name: decoded.name,
      role: decoded.role,
      contact: decoded.contact,
      address: decoded.address,
      active: decoded.active,
      token: token,
    };
    if (active != true) {
      errorMessage.error = "User action revoked."
      return res.status(status.unauthorized).send(errorMessage);
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    errorMessage.error = 'Authentication Failed';
    return res.status(status.unauthorized).send(errorMessage);
  }
};

export default verifyToken;