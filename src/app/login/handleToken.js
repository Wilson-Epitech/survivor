import { SignJWT, jwtVerify } from 'jose'

const encodedKey = new TextEncoder().encode(process.env.SECRET_KEY);

export async function generateToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload;
  } catch (error) {
    console.error('Failed to verify session:', error);
  }
}
