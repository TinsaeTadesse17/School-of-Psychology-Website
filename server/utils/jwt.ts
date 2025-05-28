import jwt from 'jsonwebtoken';

// Use a secure environment variable for JWT_SECRET in production
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret_key_for_development';

export interface TokenPayload {
  id: number;
  email: string;
  role: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}