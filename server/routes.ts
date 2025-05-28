import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authController } from "./controllers/auth";
import { usersController } from "./controllers/users";
import { coursesController } from "./controllers/courses";
import { resourcesController } from "./controllers/resources";
import { contentController } from "./controllers/content";
import { authenticate } from "./middleware/auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", authController.register);
  app.post("/api/auth/login", authController.login);
  app.post("/api/auth/logout", authController.logout);
  app.get("/api/auth/me", authenticate(), authController.getCurrentUser);

  // Public content routes
  app.get("/api/news-events/public", contentController.getPublicNewsEvents);
  app.get("/api/faculty/public", contentController.getPublicFaculty);
  app.get("/api/faculty/featured", contentController.getFeaturedFaculty);
  app.get("/api/research/public", contentController.getPublicResearch);
  app.get("/api/research/featured", contentController.getFeaturedResearch);
  app.get("/api/courses/featured", contentController.getFeaturedCourses);
  app.get("/api/courses/public", contentController.getPublicCourses);
  app.get("/api/announcements/active", contentController.getActiveAnnouncements);

  // Student routes (requires student or admin role)
  app.get("/api/news-events/student", authenticate(["student", "admin"]), contentController.getStudentNewsEvents);
  app.get("/api/courses/student", authenticate(["student", "admin"]), coursesController.getStudentCourses);
  app.get("/api/courses/with-materials", authenticate(["student", "admin"]), coursesController.getCoursesWithMaterials);
  app.get("/api/resources/student", authenticate(["student", "admin"]), resourcesController.getStudentResources);
  app.get("/api/announcements/all", authenticate(["student", "admin"]), contentController.getAllAnnouncements);

  // Support ticket routes
  app.post("/api/support", contentController.createSupportTicket);

  // Admin routes (requires admin role)
  app.get("/api/admin/users", authenticate(["admin"]), usersController.getAllUsers);
  app.post("/api/admin/users", authenticate(["admin"]), usersController.createUser);
  app.patch("/api/admin/users/:id", authenticate(["admin"]), usersController.updateUser);
  app.patch("/api/admin/users/:id/verify", authenticate(["admin"]), usersController.verifyUser);
  app.delete("/api/admin/users/:id", authenticate(["admin"]), usersController.deleteUser);
  
  app.get("/api/admin/stats", authenticate(["admin"]), contentController.getAdminStats);
  app.get("/api/admin/support-tickets", authenticate(["admin"]), contentController.getSupportTickets);
  
  // Admin content management routes
  app.get("/api/admin/news-events", authenticate(["admin"]), contentController.getAllNewsEvents);
  app.post("/api/admin/news-events", authenticate(["admin"]), contentController.createNewsEvent);
  app.patch("/api/admin/news-events/:id", authenticate(["admin"]), contentController.updateNewsEvent);
  app.delete("/api/admin/news-events/:id", authenticate(["admin"]), contentController.deleteNewsEvent);
  
  app.get("/api/admin/faculty", authenticate(["admin"]), contentController.getAllFaculty);
  app.post("/api/admin/faculty", authenticate(["admin"]), contentController.createFacultyMember);
  app.patch("/api/admin/faculty/:id", authenticate(["admin"]), contentController.updateFacultyMember);
  app.delete("/api/admin/faculty/:id", authenticate(["admin"]), contentController.deleteFacultyMember);
  
  app.get("/api/admin/research", authenticate(["admin"]), contentController.getAllResearch);
  app.post("/api/admin/research", authenticate(["admin"]), contentController.createResearchProject);
  app.patch("/api/admin/research/:id", authenticate(["admin"]), contentController.updateResearchProject);
  app.delete("/api/admin/research/:id", authenticate(["admin"]), contentController.deleteResearchProject);
  
  app.get("/api/admin/courses", authenticate(["admin"]), coursesController.getAllCourses);
  app.post("/api/admin/courses", authenticate(["admin"]), coursesController.createCourse);
  app.patch("/api/admin/courses/:id", authenticate(["admin"]), coursesController.updateCourse);
  app.delete("/api/admin/courses/:id", authenticate(["admin"]), coursesController.deleteCourse);
  
  app.get("/api/admin/announcements", authenticate(["admin"]), contentController.getAllAnnouncements);
  app.post("/api/admin/announcements", authenticate(["admin"]), contentController.createAnnouncement);
  app.patch("/api/admin/announcements/:id", authenticate(["admin"]), contentController.updateAnnouncement);
  app.delete("/api/admin/announcements/:id", authenticate(["admin"]), contentController.deleteAnnouncement);

  const httpServer = createServer(app);

  return httpServer;
}
