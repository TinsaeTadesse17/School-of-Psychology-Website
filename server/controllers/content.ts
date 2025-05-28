import { Request, Response } from 'express';
import { storage } from '../storage';
import { insertNewsEventSchema, insertFacultyMemberSchema, insertResearchProjectSchema, insertAnnouncementSchema, insertSupportTicketSchema } from '@shared/schema';
import { z } from 'zod';

export const contentController = {
  // News & Events
  getPublicNewsEvents: async (_req: Request, res: Response) => {
    try {
      const newsEvents = await storage.getPublicNewsEvents();
      return res.status(200).json({ newsEvents });
    } catch (error) {
      console.error('Get public news events error:', error);
      return res.status(500).json({ 
        message: 'Failed to get news events', 
        error: (error as Error).message 
      });
    }
  },

  getStudentNewsEvents: async (_req: Request, res: Response) => {
    try {
      const newsEvents = await storage.getAllNewsEvents();
      return res.status(200).json({ newsEvents });
    } catch (error) {
      console.error('Get student news events error:', error);
      return res.status(500).json({ 
        message: 'Failed to get news events', 
        error: (error as Error).message 
      });
    }
  },

  getAllNewsEvents: async (_req: Request, res: Response) => {
    try {
      const newsEvents = await storage.getAllNewsEvents();
      return res.status(200).json({ newsEvents });
    } catch (error) {
      console.error('Get all news events error:', error);
      return res.status(500).json({ 
        message: 'Failed to get news events', 
        error: (error as Error).message 
      });
    }
  },

  createNewsEvent: async (req: Request, res: Response) => {
    try {
      const parsedBody = insertNewsEventSchema.parse(req.body);
      const newsEvent = await storage.createNewsEvent({
        ...parsedBody,
        createdAt: new Date(),
      });
      
      return res.status(201).json({ 
        message: 'News event created successfully', 
        newsEvent 
      });
    } catch (error) {
      console.error('Create news event error:', error);
      return res.status(400).json({ 
        message: 'Failed to create news event', 
        error: (error as Error).message 
      });
    }
  },

  updateNewsEvent: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const newsEventId = parseInt(id, 10);
      
      if (isNaN(newsEventId)) {
        return res.status(400).json({ message: 'Invalid news event ID' });
      }

      const parsedBody = insertNewsEventSchema.partial().parse(req.body);
      const newsEvent = await storage.updateNewsEvent(newsEventId, parsedBody);
      
      if (!newsEvent) {
        return res.status(404).json({ message: 'News event not found' });
      }
      
      return res.status(200).json({ 
        message: 'News event updated successfully', 
        newsEvent 
      });
    } catch (error) {
      console.error('Update news event error:', error);
      return res.status(400).json({ 
        message: 'Failed to update news event', 
        error: (error as Error).message 
      });
    }
  },

  deleteNewsEvent: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const newsEventId = parseInt(id, 10);
      
      if (isNaN(newsEventId)) {
        return res.status(400).json({ message: 'Invalid news event ID' });
      }

      const deleted = await storage.deleteNewsEvent(newsEventId);
      
      if (!deleted) {
        return res.status(404).json({ message: 'News event not found' });
      }
      
      return res.status(200).json({ 
        message: 'News event deleted successfully'
      });
    } catch (error) {
      console.error('Delete news event error:', error);
      return res.status(500).json({ 
        message: 'Failed to delete news event', 
        error: (error as Error).message 
      });
    }
  },

  // Faculty
  getPublicFaculty: async (_req: Request, res: Response) => {
    try {
      const faculty = await storage.getPublicFacultyMembers();
      return res.status(200).json({ faculty });
    } catch (error) {
      console.error('Get public faculty error:', error);
      return res.status(500).json({ 
        message: 'Failed to get faculty', 
        error: (error as Error).message 
      });
    }
  },

  getFeaturedFaculty: async (_req: Request, res: Response) => {
    try {
      const faculty = await storage.getPublicFacultyMembers();
      // For now, just return the first 3 faculty members as featured
      const featuredFaculty = faculty.slice(0, 3);
      return res.status(200).json({ faculty: featuredFaculty });
    } catch (error) {
      console.error('Get featured faculty error:', error);
      return res.status(500).json({ 
        message: 'Failed to get featured faculty', 
        error: (error as Error).message 
      });
    }
  },

  getAllFaculty: async (_req: Request, res: Response) => {
    try {
      const faculty = await storage.getAllFacultyMembers();
      return res.status(200).json({ faculty });
    } catch (error) {
      console.error('Get all faculty error:', error);
      return res.status(500).json({ 
        message: 'Failed to get faculty', 
        error: (error as Error).message 
      });
    }
  },

  createFacultyMember: async (req: Request, res: Response) => {
    try {
      const parsedBody = insertFacultyMemberSchema.parse(req.body);
      const faculty = await storage.createFacultyMember({
        ...parsedBody,
        createdAt: new Date(),
      });
      
      return res.status(201).json({ 
        message: 'Faculty member created successfully', 
        faculty 
      });
    } catch (error) {
      console.error('Create faculty member error:', error);
      return res.status(400).json({ 
        message: 'Failed to create faculty member', 
        error: (error as Error).message 
      });
    }
  },

  updateFacultyMember: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const facultyId = parseInt(id, 10);
      
      if (isNaN(facultyId)) {
        return res.status(400).json({ message: 'Invalid faculty ID' });
      }

      const parsedBody = insertFacultyMemberSchema.partial().parse(req.body);
      const faculty = await storage.updateFacultyMember(facultyId, parsedBody);
      
      if (!faculty) {
        return res.status(404).json({ message: 'Faculty member not found' });
      }
      
      return res.status(200).json({ 
        message: 'Faculty member updated successfully', 
        faculty 
      });
    } catch (error) {
      console.error('Update faculty member error:', error);
      return res.status(400).json({ 
        message: 'Failed to update faculty member', 
        error: (error as Error).message 
      });
    }
  },

  deleteFacultyMember: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const facultyId = parseInt(id, 10);
      
      if (isNaN(facultyId)) {
        return res.status(400).json({ message: 'Invalid faculty ID' });
      }

      const deleted = await storage.deleteFacultyMember(facultyId);
      
      if (!deleted) {
        return res.status(404).json({ message: 'Faculty member not found' });
      }
      
      return res.status(200).json({ 
        message: 'Faculty member deleted successfully'
      });
    } catch (error) {
      console.error('Delete faculty member error:', error);
      return res.status(500).json({ 
        message: 'Failed to delete faculty member', 
        error: (error as Error).message 
      });
    }
  },

  // Research
  getPublicResearch: async (_req: Request, res: Response) => {
    try {
      const research = await storage.getPublicResearchProjects();
      return res.status(200).json({ research });
    } catch (error) {
      console.error('Get public research error:', error);
      return res.status(500).json({ 
        message: 'Failed to get research projects', 
        error: (error as Error).message 
      });
    }
  },

  getFeaturedResearch: async (_req: Request, res: Response) => {
    try {
      const research = await storage.getPublicResearchProjects();
      // For now, just return the first 2 research projects as featured
      const featuredResearch = research.slice(0, 2);
      return res.status(200).json({ research: featuredResearch });
    } catch (error) {
      console.error('Get featured research error:', error);
      return res.status(500).json({ 
        message: 'Failed to get featured research', 
        error: (error as Error).message 
      });
    }
  },

  getAllResearch: async (_req: Request, res: Response) => {
    try {
      const research = await storage.getAllResearchProjects();
      return res.status(200).json({ research });
    } catch (error) {
      console.error('Get all research error:', error);
      return res.status(500).json({ 
        message: 'Failed to get research projects', 
        error: (error as Error).message 
      });
    }
  },

  createResearchProject: async (req: Request, res: Response) => {
    try {
      const parsedBody = insertResearchProjectSchema.parse(req.body);
      const research = await storage.createResearchProject({
        ...parsedBody,
        createdAt: new Date(),
      });
      
      return res.status(201).json({ 
        message: 'Research project created successfully', 
        research 
      });
    } catch (error) {
      console.error('Create research project error:', error);
      return res.status(400).json({ 
        message: 'Failed to create research project', 
        error: (error as Error).message 
      });
    }
  },

  updateResearchProject: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const researchId = parseInt(id, 10);
      
      if (isNaN(researchId)) {
        return res.status(400).json({ message: 'Invalid research project ID' });
      }

      const parsedBody = insertResearchProjectSchema.partial().parse(req.body);
      const research = await storage.updateResearchProject(researchId, parsedBody);
      
      if (!research) {
        return res.status(404).json({ message: 'Research project not found' });
      }
      
      return res.status(200).json({ 
        message: 'Research project updated successfully', 
        research 
      });
    } catch (error) {
      console.error('Update research project error:', error);
      return res.status(400).json({ 
        message: 'Failed to update research project', 
        error: (error as Error).message 
      });
    }
  },

  deleteResearchProject: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const researchId = parseInt(id, 10);
      
      if (isNaN(researchId)) {
        return res.status(400).json({ message: 'Invalid research project ID' });
      }

      const deleted = await storage.deleteResearchProject(researchId);
      
      if (!deleted) {
        return res.status(404).json({ message: 'Research project not found' });
      }
      
      return res.status(200).json({ 
        message: 'Research project deleted successfully'
      });
    } catch (error) {
      console.error('Delete research project error:', error);
      return res.status(500).json({ 
        message: 'Failed to delete research project', 
        error: (error as Error).message 
      });
    }
  },

  // Announcements
  getActiveAnnouncements: async (_req: Request, res: Response) => {
    try {
      const announcements = await storage.getPublicActiveAnnouncements();
      return res.status(200).json({ announcements });
    } catch (error) {
      console.error('Get active announcements error:', error);
      return res.status(500).json({ 
        message: 'Failed to get announcements', 
        error: (error as Error).message 
      });
    }
  },

  getAllAnnouncements: async (_req: Request, res: Response) => {
    try {
      const announcements = await storage.getAllAnnouncements();
      return res.status(200).json({ announcements });
    } catch (error) {
      console.error('Get all announcements error:', error);
      return res.status(500).json({ 
        message: 'Failed to get announcements', 
        error: (error as Error).message 
      });
    }
  },

  createAnnouncement: async (req: Request, res: Response) => {
    try {
      const parsedBody = insertAnnouncementSchema.parse(req.body);
      const announcement = await storage.createAnnouncement({
        ...parsedBody,
        createdAt: new Date(),
      });
      
      return res.status(201).json({ 
        message: 'Announcement created successfully', 
        announcement 
      });
    } catch (error) {
      console.error('Create announcement error:', error);
      return res.status(400).json({ 
        message: 'Failed to create announcement', 
        error: (error as Error).message 
      });
    }
  },

  updateAnnouncement: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const announcementId = parseInt(id, 10);
      
      if (isNaN(announcementId)) {
        return res.status(400).json({ message: 'Invalid announcement ID' });
      }

      const parsedBody = insertAnnouncementSchema.partial().parse(req.body);
      const announcement = await storage.updateAnnouncement(announcementId, parsedBody);
      
      if (!announcement) {
        return res.status(404).json({ message: 'Announcement not found' });
      }
      
      return res.status(200).json({ 
        message: 'Announcement updated successfully', 
        announcement 
      });
    } catch (error) {
      console.error('Update announcement error:', error);
      return res.status(400).json({ 
        message: 'Failed to update announcement', 
        error: (error as Error).message 
      });
    }
  },

  deleteAnnouncement: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const announcementId = parseInt(id, 10);
      
      if (isNaN(announcementId)) {
        return res.status(400).json({ message: 'Invalid announcement ID' });
      }

      const deleted = await storage.deleteAnnouncement(announcementId);
      
      if (!deleted) {
        return res.status(404).json({ message: 'Announcement not found' });
      }
      
      return res.status(200).json({ 
        message: 'Announcement deleted successfully'
      });
    } catch (error) {
      console.error('Delete announcement error:', error);
      return res.status(500).json({ 
        message: 'Failed to delete announcement', 
        error: (error as Error).message 
      });
    }
  },

  // Support Tickets
  createSupportTicket: async (req: Request, res: Response) => {
    try {
      const parsedBody = insertSupportTicketSchema.parse(req.body);
      const supportTicket = await storage.createSupportTicket({
        ...parsedBody,
        status: 'open',
        createdAt: new Date(),
        resolvedAt: null,
      });
      
      return res.status(201).json({ 
        message: 'Support ticket created successfully', 
        supportTicket 
      });
    } catch (error) {
      console.error('Create support ticket error:', error);
      return res.status(400).json({ 
        message: 'Failed to create support ticket', 
        error: (error as Error).message 
      });
    }
  },

  getSupportTickets: async (_req: Request, res: Response) => {
    try {
      const supportTickets = await storage.getAllSupportTickets();
      return res.status(200).json({ supportTickets });
    } catch (error) {
      console.error('Get support tickets error:', error);
      return res.status(500).json({ 
        message: 'Failed to get support tickets', 
        error: (error as Error).message 
      });
    }
  },

  // Admin Stats
  getAdminStats: async (_req: Request, res: Response) => {
    try {
      const stats = await storage.getAdminStats();
      return res.status(200).json({ stats });
    } catch (error) {
      console.error('Get admin stats error:', error);
      return res.status(500).json({ 
        message: 'Failed to get admin statistics', 
        error: (error as Error).message 
      });
    }
  },

  // Featured Courses
  getFeaturedCourses: async (_req: Request, res: Response) => {
    try {
      const courses = await storage.getPublicCourses();
      // For now, just return the first 3 courses as featured
      const featuredCourses = courses.slice(0, 3);
      return res.status(200).json({ courses: featuredCourses });
    } catch (error) {
      console.error('Get featured courses error:', error);
      return res.status(500).json({ 
        message: 'Failed to get featured courses', 
        error: (error as Error).message 
      });
    }
  },

  getPublicCourses: async (_req: Request, res: Response) => {
    try {
      const courses = await storage.getPublicCourses();
      return res.status(200).json({ courses });
    } catch (error) {
      console.error('Get public courses error:', error);
      return res.status(500).json({ 
        message: 'Failed to get courses', 
        error: (error as Error).message 
      });
    }
  },
};