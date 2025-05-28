import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { storage } from '../storage';
import { insertUserSchema, UserRole } from '@shared/schema';
import { z } from 'zod';

const updateUserSchema = insertUserSchema.partial().extend({
  id: z.number().optional(),
});

export const usersController = {
  // Get all users
  getAllUsers: async (_req: Request, res: Response) => {
    try {
      const users = await storage.getAllUsers();
      const sanitizedUsers = users.map(user => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        verified: user.verified,
        createdAt: user.createdAt,
      }));
      
      return res.status(200).json({ users: sanitizedUsers });
    } catch (error) {
      console.error('Get all users error:', error);
      return res.status(500).json({ 
        message: 'Failed to get users', 
        error: (error as Error).message 
      });
    }
  },

  // Create a new user
  createUser: async (req: Request, res: Response) => {
    try {
      const parsedBody = insertUserSchema
        .extend({
          password: z.string().min(6),
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
        verified: true, // Admin-created users are automatically verified
        createdAt: new Date(),
      });

      return res.status(201).json({
        message: 'User created successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role,
          verified: newUser.verified,
        },
      });
    } catch (error) {
      console.error('Create user error:', error);
      return res.status(400).json({ 
        message: 'Failed to create user', 
        error: (error as Error).message 
      });
    }
  },

  // Update user
  updateUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = parseInt(id, 10);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const parsedBody = updateUserSchema.parse(req.body);

      // Check if user exists
      const existingUser = await storage.getUser(userId);
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // If password is being updated, hash it
      let updateData: any = { ...parsedBody };
      if (parsedBody.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(parsedBody.password, salt);
      }

      // Update user
      const updatedUser = await storage.updateUser(userId, updateData);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({
        message: 'User updated successfully',
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          role: updatedUser.role,
          verified: updatedUser.verified,
        },
      });
    } catch (error) {
      console.error('Update user error:', error);
      return res.status(400).json({ 
        message: 'Failed to update user', 
        error: (error as Error).message 
      });
    }
  },

  // Verify user
  verifyUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = parseInt(id, 10);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      // Check if user exists
      const existingUser = await storage.getUser(userId);
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update user verification status
      const updatedUser = await storage.updateUser(userId, { verified: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({
        message: 'User verified successfully',
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          role: updatedUser.role,
          verified: updatedUser.verified,
        },
      });
    } catch (error) {
      console.error('Verify user error:', error);
      return res.status(500).json({ 
        message: 'Failed to verify user', 
        error: (error as Error).message 
      });
    }
  },

  // Delete user
  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = parseInt(id, 10);
      
      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      // Check if user exists
      const existingUser = await storage.getUser(userId);
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Delete user
      const deleted = await storage.deleteUser(userId);
      if (!deleted) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({
        message: 'User deleted successfully',
      });
    } catch (error) {
      console.error('Delete user error:', error);
      return res.status(500).json({ 
        message: 'Failed to delete user', 
        error: (error as Error).message 
      });
    }
  },
};