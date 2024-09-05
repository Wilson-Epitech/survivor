import jwt from 'jsonwebtoken';

export async function generateToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY);
}

export async function verifyToken(token) {
    try {
      return jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      return null;
    }
}
