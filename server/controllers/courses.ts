import { Request, Response } from 'express';
import { storage } from '../storage';
import { insertCourseSchema, insertCourseMaterialSchema } from '@shared/schema';
import { z } from 'zod';

export const coursesController = {
  // Courses
  getStudentCourses: async (_req: Request, res: Response) => {
    try {
      const courses = await storage.getAllCourses();
      return res.status(200).json({ courses });
    } catch (error) {
      console.error('Get student courses error:', error);
      return res.status(500).json({ 
        message: 'Failed to get courses', 
        error: (error as Error).message 
      });
    }
  },

  getAllCourses: async (_req: Request, res: Response) => {
    try {
      const courses = await storage.getAllCourses();
      return res.status(200).json({ courses });
    } catch (error) {
      console.error('Get all courses error:', error);
      return res.status(500).json({ 
        message: 'Failed to get courses', 
        error: (error as Error).message 
      });
    }
  },

  getCoursesWithMaterials: async (_req: Request, res: Response) => {
    try {
      const courses = await storage.getAllCourses();
      
      const coursesWithMaterials = await Promise.all(
        courses.map(async (course) => {
          const materials = await storage.getCourseMaterialsByCourse(course.id);
          return {
            ...course,
            materials,
          };
        })
      );
      
      return res.status(200).json({ courses: coursesWithMaterials });
    } catch (error) {
      console.error('Get courses with materials error:', error);
      return res.status(500).json({ 
        message: 'Failed to get courses with materials', 
        error: (error as Error).message 
      });
    }
  },

  createCourse: async (req: Request, res: Response) => {
    try {
      const parsedBody = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse({
        ...parsedBody,
        createdAt: new Date(),
      });
      
      return res.status(201).json({ 
        message: 'Course created successfully', 
        course 
      });
    } catch (error) {
      console.error('Create course error:', error);
      return res.status(400).json({ 
        message: 'Failed to create course', 
        error: (error as Error).message 
      });
    }
  },

  updateCourse: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const courseId = parseInt(id, 10);
      
      if (isNaN(courseId)) {
        return res.status(400).json({ message: 'Invalid course ID' });
      }

      const parsedBody = insertCourseSchema.partial().parse(req.body);
      const course = await storage.updateCourse(courseId, parsedBody);
      
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      
      return res.status(200).json({ 
        message: 'Course updated successfully', 
        course 
      });
    } catch (error) {
      console.error('Update course error:', error);
      return res.status(400).json({ 
        message: 'Failed to update course', 
        error: (error as Error).message 
      });
    }
  },

  deleteCourse: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const courseId = parseInt(id, 10);
      
      if (isNaN(courseId)) {
        return res.status(400).json({ message: 'Invalid course ID' });
      }

      // First check if course exists
      const course = await storage.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      
      // Get all materials for this course
      const materials = await storage.getCourseMaterialsByCourse(courseId);
      
      // Delete all materials for this course
      await Promise.all(
        materials.map(material => storage.deleteCourseMaterial(material.id))
      );
      
      // Delete the course
      const deleted = await storage.deleteCourse(courseId);
      
      if (!deleted) {
        return res.status(404).json({ message: 'Failed to delete course' });
      }
      
      return res.status(200).json({ 
        message: 'Course and associated materials deleted successfully'
      });
    } catch (error) {
      console.error('Delete course error:', error);
      return res.status(500).json({ 
        message: 'Failed to delete course', 
        error: (error as Error).message 
      });
    }
  },

  // Course Materials
  createCourseMaterial: async (req: Request, res: Response) => {
    try {
      const parsedBody = insertCourseMaterialSchema.parse(req.body);
      
      // Check if course exists
      const course = await storage.getCourse(parsedBody.courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      
      const material = await storage.createCourseMaterial({
        ...parsedBody,
        createdAt: new Date(),
      });
      
      return res.status(201).json({ 
        message: 'Course material created successfully', 
        material 
      });
    } catch (error) {
      console.error('Create course material error:', error);
      return res.status(400).json({ 
        message: 'Failed to create course material', 
        error: (error as Error).message 
      });
    }
  },
};