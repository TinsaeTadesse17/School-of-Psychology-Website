import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// USER-RELATED SCHEMAS

// User roles
export const UserRole = {
  PUBLIC: "public",
  STUDENT: "student",
  ADMIN: "admin",
} as const;

export type UserRoleType = typeof UserRole[keyof typeof UserRole];

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: text("role").notNull().default(UserRole.PUBLIC),
  verified: boolean("verified").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  verified: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// CONTENT-RELATED SCHEMAS

// News and Events
export const newsEvents = pgTable("news_events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  type: text("type").notNull(), // "news" or "event"
  date: timestamp("date").notNull(),
  imageUrl: text("image_url"),
  isPublic: boolean("is_public").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNewsEventSchema = createInsertSchema(newsEvents).omit({
  id: true,
  createdAt: true,
});

export type InsertNewsEvent = z.infer<typeof insertNewsEventSchema>;
export type NewsEvent = typeof newsEvents.$inferSelect;

// Faculty Members
export const facultyMembers = pgTable("faculty_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  department: text("department").notNull(),
  specialization: text("specialization").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url"),
  email: text("email"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertFacultyMemberSchema = createInsertSchema(facultyMembers).omit({
  id: true,
  createdAt: true,
});

export type InsertFacultyMember = z.infer<typeof insertFacultyMemberSchema>;
export type FacultyMember = typeof facultyMembers.$inferSelect;

// Research Projects
export const researchProjects = pgTable("research_projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  principalInvestigator: text("principal_investigator").notNull(),
  researchers: text("researchers"),
  imageUrl: text("image_url"),
  isPublic: boolean("is_public").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertResearchProjectSchema = createInsertSchema(researchProjects).omit({
  id: true,
  createdAt: true,
});

export type InsertResearchProject = z.infer<typeof insertResearchProjectSchema>;
export type ResearchProject = typeof researchProjects.$inferSelect;

// Courses
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  code: text("code").notNull(),
  description: text("description").notNull(),
  instructor: text("instructor").notNull(),
  credits: integer("credits").notNull(),
  imageUrl: text("image_url"),
  syllabus: text("syllabus"),
  isPublic: boolean("is_public").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
});

export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;

// Course Materials
export const courseMaterials = pgTable("course_materials", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  fileUrl: text("file_url").notNull(),
  type: text("type").notNull(), // "lecture", "assignment", "reference"
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCourseMaterialSchema = createInsertSchema(courseMaterials).omit({
  id: true,
  createdAt: true,
});

export type InsertCourseMaterial = z.infer<typeof insertCourseMaterialSchema>;
export type CourseMaterial = typeof courseMaterials.$inferSelect;

// Support Tickets
export const supportTickets = pgTable("support_tickets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("open"), // "open", "in-progress", "resolved"
  createdAt: timestamp("created_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

export const insertSupportTicketSchema = createInsertSchema(supportTickets).omit({
  id: true, 
  status: true,
  createdAt: true,
  resolvedAt: true,
});

export type InsertSupportTicket = z.infer<typeof insertSupportTicketSchema>;
export type SupportTicket = typeof supportTickets.$inferSelect;

// Announcements
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  isPublic: boolean("is_public").notNull().default(true),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at"),
});

export const insertAnnouncementSchema = createInsertSchema(announcements).omit({
  id: true,
  createdAt: true,
});

export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;
export type Announcement = typeof announcements.$inferSelect;
