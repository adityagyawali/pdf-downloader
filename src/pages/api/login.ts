import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Mock user database - Replace with your actual database
const MOCK_USER = {
  email: 'test@example.com',
  password: 'password123',
  id: '1',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Replace with actual database authentication
  if (email === MOCK_USER.email && password === MOCK_USER.password) {
    const token = jwt.sign({ userId: MOCK_USER.id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      token,
      user: {
        id: MOCK_USER.id,
        email: MOCK_USER.email,
      },
    });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
}