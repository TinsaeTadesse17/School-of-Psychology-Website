import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { storage } from '../storage';
import { generateToken } from '../utils/jwt';
import { insertUserSchema, UserRole } from '@shared/schema';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authController = {
  // Register a new user
  register: async (req: Request, res: Response) => {
    try {
      const parsedBody = insertUserSchema
        .extend({
          password: z.string().min(6),
          passwordConfirm: z.string().min(6),
        })
        .refine((data) => data.password === data.passwordConfirm, {
          message: "Passwords don't match",
          path: ['passwordConfirm'],
        })
        .parse(req.body);

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(parsedBody.email);
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(parsedBody.password, salt);

      // Create new user
      const newUser = await storage.createUser({
        email: parsedBody.email,
        password: hashedPassword,
        firstName: parsedBody.firstName,
        lastName: parsedBody.lastName,
        role: parsedBody.role || UserRole.STUDENT,
        verified: false,
        createdAt: new Date(),
      });

      return res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role,
        },
      });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(400).json({ 
        message: 'Registration failed', 
        error: (error as Error).message 
      });
    }
  },

  // Login user
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = loginSchema.parse(req.body);

      // Check if user exists
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check if user is verified
      if (!user.verified) {
        return res.status(403).json({ message: 'Account not verified' });
      }

      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      // Set token in HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(400).json({ 
        message: 'Login failed', 
        error: (error as Error).message 
      });
    }
  },

  // Logout user
  logout: (_req: Request, res: Response) => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
  },

  // Get current user
  getCurrentUser: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      const user = await storage.getUser(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Get current user error:', error);
      return res.status(500).json({ 
        message: 'Failed to get user information', 
        error: (error as Error).message 
      });
    }
  },
};